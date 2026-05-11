import { defineStore } from "pinia"
import { DB } from "../db"
export const barangKeluarStore = defineStore('barang_keluar',{
    state : ()=>{
        return {
            data_barang_masuk : [],
            single_data_barang_masuk : [],
            data_barang : [],
            data_transaksi_detail_barang: [],
            loading: false
        }
    },
    actions : {
        async getDataTransaksiMasuk(search_code,date,order_by,is_desc,page,take){
            this.loading = true
            let search = (search_code) ? `AND(('TR-OUT-'|| tb_header_transaction_out.id) like '%${search_code}%')` : '';

            let date_ = (date) ? `AND(tb_header_transaction_out.date LIKE '%${date}%')` : '';

            let order_by_query = (order_by) ? order_by : `tb_header_transaction_out.id`

            let is_desc_query = (is_desc) ? "DESC" : "ASC"

            let page_now = (page) ? Number(page) : 1

            let take_data = (take) ? Number(take) : 10

            let total_page = await(await DB()).select(`SELECT count(id) as total_data FROM tb_header_transaction_out WHERE 1=1 ${search} ${date_}`)
            total_page = total_page[0].total_data
            

            let raw_sql = `SELECT tb_header_transaction_out.*, 
                ('TR-OUT-'|| tb_header_transaction_out.id) as code_transaksi,
                count(tb_detail_transaction_out.product_id) as jenis_produk,  
                sum(tb_detail_transaction_out.qty) as sum_total_qty,
                sum(tb_detail_transaction_out.qty * tb_detail_transaction_out.price ) as total_price
                FROM tb_header_transaction_out
                INNER JOIN tb_detail_transaction_out on tb_detail_transaction_out.transaction_out_id = tb_header_transaction_out.id 
                INNER JOIN tb_product on tb_product.id = tb_detail_transaction_out.product_id 
                where 1=1 ${search} ${date_}
                GROUP BY tb_header_transaction_out.id
                ORDER BY ${order_by_query} ${is_desc_query}
                LIMIT ${take_data} OFFSET (${page_now} - 1) * ${take_data}`

                console.log(raw_sql);
                
            let exec_0 = await (await DB()).select(raw_sql)

            this.data_barang_masuk = {
                total_data : total_page,
                take : take_data,
                page_now : page_now,
                total_page : Number(Math.ceil(total_page / take_data)),
                data : exec_0
            }
            this.loading = false
        },
        async getSingelBarangKeluar(id){
            
            let header_ = await(await DB()).select(`SELECT tb_header_transaction_out.*,
                ('TR-OUT-' || tb_header_transaction_out.id) as code_transaction,
                COUNT(tb_detail_transaction_out.product_id) as total_jenis_barang,
                SUM(tb_detail_transaction_out.qty) as sum_qty_detail,
                SUM(tb_detail_transaction_out.qty * tb_detail_transaction_out.price) as total_harga
                FROM tb_header_transaction_out 
                INNER JOIN tb_detail_transaction_out on tb_detail_transaction_out.transaction_out_id = tb_header_transaction_out.id 
                WHERE tb_header_transaction_out.id = ${id}`)

            let detail_ = await(await DB()).select(`select *,
                'B-' || tb_product.id  AS code_barang,
                (tb_detail_transaction_out.qty * tb_detail_transaction_out.price) as sub_total ,
                tb_detail_transaction_out.price as price_transaction
                from tb_detail_transaction_out 
                inner join tb_product on tb_product.id = tb_detail_transaction_out.product_id 
                where tb_detail_transaction_out.transaction_out_id = ${id}`) 

                this.single_data_barang_masuk = {
                data_transaksi_keluar : header_[0],
                data_detail_barang : detail_,
            }

        },
        async getDataBarang(input_barang){
            let input_tp = (input_barang) ? `AND(
            tb_product.name LIKE  '%${input_barang}%' 
            OR tb_product.sku LIKE '%${input_barang}%' 
            OR ('B-' || tb_product.id) LIKE '%${input_barang}%' 
            OR description LIKE '%${input_barang}%' )` : ''

            let raw_query = `SELECT *,('B-' || tb_product.id) as code_barang FROM tb_product WHERE 1=1 ${input_tp}  ORDER BY name DESC LIMIT 10`

            this.data_barang = await(await DB()).select(raw_query)
        },
        async addDetailTransakiBarangKeluar(item_single_data_barang,qty,harga){
            
            this.data_transaksi_detail_barang.push({
                id_barang : item_single_data_barang.id,
                kode_barang : item_single_data_barang.code_barang,
                nama_barang : item_single_data_barang.name,
                sku : item_single_data_barang.sku,
                qty : qty,
                harga : harga
            })
            this.data_transaksi_detail_barang.reverse()
        },async removeDetailTransakiBarangKeluar(index){
            this.data_transaksi_detail_barang.splice(index,1)
        },
        async clearDetailTransakiBarangKeluar(){
            this.data_transaksi_detail_barang = []
        },async saveTransaksiKeluar(date,desc){
             
             let insert_header = await(await DB()).execute(`INSERT INTO tb_header_transaction_out (date,description) VALUES('${date}','${desc}')`)
             if(insert_header.rowsAffected > 0 ){
                let get_single_header = await(await DB()).select(`SELECT * FROM tb_header_transaction_out WHERE id = ${insert_header.lastInsertId}`)
                get_single_header = get_single_header[0]

                this.data_transaksi_detail_barang.forEach(async(item)=>{
                    // insert detail 
                        let exec_0 = await(await DB()).execute(`INSERT INTO tb_detail_transaction_out 
                            (transaction_out_id,product_id,qty,price) 
                            VALUES(${get_single_header.id} , ${item.id_barang} , ${item.qty} , ${item.harga})`)
                        let exec_1 = await(await DB()).execute(`UPDATE tb_product SET stock = stock - ${item.qty} WHERE id = ${item.id_barang}`)
                })
                return true
            }else{
                return false
            }
        },async deleteTransaksiKeluar(id){
            
                let exec_get_detail = await (await DB()).select(`SELECT * FROM tb_detail_transaction_out
                INNER JOIN tb_product on tb_product.id = tb_detail_transaction_out.product_id
                WHERE tb_detail_transaction_out.transaction_out_id = ${id}`).then(result=>{                        
                    result.forEach(async(x)=>{
                        await(await DB()).execute(`UPDATE tb_product SET stock = stock + ${x.qty} WHERE id = ${x.product_id}`)
                    }) 
                })

                let exec_del_0 = await (await DB()).execute(`DELETE FROM tb_detail_transaction_out WHERE tb_detail_transaction_out.transaction_out_id = ${id}`)
                let exec_del_1 = await (await DB()).execute(`DELETE FROM tb_header_transaction_out WHERE id = ${id}`)

                if(exec_del_0.rowsAffected > 0 && exec_del_1.rowsAffected > 0){
                    return true
                }else{
                    return false
                }
                
        }
    },persist: true
})
