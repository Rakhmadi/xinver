import { defineStore } from "pinia";
import { DB } from "../db";

export const barangMasukStore = defineStore('barang_masuk',{
    state:()=>{
        return {
            data_barang_masuk : [],
            data_suplier : [],
            data_single_barang_masuk : [],
            loading : false,
            data_suplier : [],
            data_barang : [],
            data_transaksi_detail_barang : []
        }
    },
    actions : {
        async getDataBarangMasuk(search_code,date,order_by,is_desc,page,take){
            this.loading = true
            let search = (search_code) ? `AND (('TR-IN-' || tb_header_transaction_in.id) LIKE '%${search_code}%')` : ""
            let search_supplier = (search_code) ? `OR (tb_supplier.name LIKE '%${search_code}%')` : ''
            console.log(search);
            
            let date_tr = (date) ? `AND (tb_header_transaction_in.date LIKE '%${date}%' )` : ""

            let order_by_qry = (order_by) ? order_by : `tb_header_transaction_in.id`

            let short_is_desc = (is_desc) ? 'DESC' : 'ASC'
            
            let page_now = (page) ? Number(page) : 1

            let take_data = (take) ? Number(take) : 10

            let total_page =  await (await DB()).select(`SELECT COUNT(id) AS total_data FROM tb_header_transaction_in where 1=1 ${search} ${date_tr}`)

            let raw_query = `select 
            ('TR-IN-' || tb_header_transaction_in.id) as code_transaction,
            tb_header_transaction_in.*,
            tb_supplier.name,
            sum(tb_detail_transaction_in.qty) as sum_qty_detail,
            COUNT(tb_detail_transaction_in.product_id ) as product_count,
            SUM(tb_detail_transaction_in.qty * tb_detail_transaction_in.price) as all_total_price
           
            from tb_header_transaction_in 
            
            inner join tb_supplier on tb_supplier.id = tb_header_transaction_in.supplier_id
            inner join tb_detail_transaction_in on tb_header_transaction_in.id = tb_detail_transaction_in.transaction_in_id  
            inner join tb_product tp on tp.id = tb_detail_transaction_in.product_id
            
            where 1=1 ${search} ${search_supplier} ${date_tr}

            GROUP BY tb_header_transaction_in.id 
            ORDER BY ${order_by_qry} ${short_is_desc}
            LIMIT ${take_data} OFFSET (${page_now} - 1) * ${take_data}
            `

            console.log(raw_query)

            let data = await (await DB()).select(raw_query)
            

            this.data_barang_masuk = {
                total_data : total_page[0].total_data ,
                take : take_data,
                page_now : page_now,
                total_page : Number(Math.ceil(total_page[0].total_data / take_data)),
                data : data
            }
            this.loading = false
        },
        async getSingleDataBarangMasuk(id){
            this.loading = true
            let raw_query_0 = await (await DB()).select(`select ('TR-IN-' || tb_header_transaction_in.id) as code_transaction,
            tb_header_transaction_in.*,
            tb_supplier.name,
            sum(tb_detail_transaction_in.qty) as sum_qty_detail,
            COUNT(tb_detail_transaction_in.product_id ) as product_count
            
            from tb_header_transaction_in 
            
            inner join tb_supplier on tb_supplier.id = tb_header_transaction_in.supplier_id
            inner join tb_detail_transaction_in on tb_header_transaction_in.id = tb_detail_transaction_in.transaction_in_id  
            inner join tb_product tp on tp.id = tb_detail_transaction_in.product_id

            WHERE tb_header_transaction_in.id = ${id}`)

            let raw_query_1 = await (await DB()).select(`select 
                tdti.*,
                'B-' || tp.id  AS code_barang,
                (tdti.qty * tdti.price) as sub_total,
                tp.name,
                tp.sku
                from tb_detail_transaction_in tdti 
                inner join tb_product tp on tp.id = tdti.product_id
                where tdti.transaction_in_id  = ${id}`)

            let raw_query_2 = await (await DB()).select(`SELECT 
                SUM(tb_detail_transaction_in.qty * tb_detail_transaction_in.price) as all_total_price
                 FROM tb_detail_transaction_in 
                 where tb_detail_transaction_in.transaction_in_id  = ${id}`)

            let data_transaksi_masuk = raw_query_0[0]

            let data_detail_barang = raw_query_1

            this.data_single_barang_masuk = {
                data_transaksi_masuk : data_transaksi_masuk,
                data_detail_barang : data_detail_barang,
                total_harga : raw_query_2[0].all_total_price
            }
            this.loading = false
        },
        async getDataSuplier(input_suplier){
            
            let input_sp = (input_suplier) ? `AND(tb_supplier.name LIKE  '%${input_suplier}%' OR tb_supplier.email LIKE '%${input_suplier}%')` : ''
            let raw_query = `SELECT * FROM tb_supplier WHERE 1=1 ${input_sp}  ORDER BY name DESC`
            this.data_suplier = await(await DB()).select(raw_query)
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
        async addDetailTransakiBarangMasuk(item_single_data_barang,qty,harga){

            if(this.data_transaksi_detail_barang.length < 1){
                this.data_transaksi_detail_barang.push({
                    id_barang : item_single_data_barang.id,
                    kode_barang : item_single_data_barang.code_barang,
                    nama_barang : item_single_data_barang.name,
                    sku : item_single_data_barang.sku,
                    qty : qty,
                    harga : harga
                })
            }else{
                
                //check data exist
                let is_exist = this.data_transaksi_detail_barang.some(x => x.id_barang === item_single_data_barang.id)

                if(!is_exist){
                    this.data_transaksi_detail_barang.push({
                        id_barang : item_single_data_barang.id,
                        kode_barang : item_single_data_barang.code_barang,
                        nama_barang : item_single_data_barang.name,
                        sku : item_single_data_barang.sku,
                        qty : qty,
                        harga : harga
                    })
                }
            }

        },
        async removeDetailTransakiBarangMasuk(index){
            this.data_transaksi_detail_barang.splice(index,1)
        },
        async clearDetailTransakiBarangMasuk(){
            this.data_transaksi_detail_barang = []
        },
        async saveTransaksiMasuk(supplier_id,date,desc){
            
            if(supplier_id === ''){
                return false
            }

            let exec_create_header = await(await DB()).execute(`INSERT INTO tb_header_transaction_in (supplier_id,date,description) VALUES(${supplier_id},'${date}','${desc}')`)
            

            if(exec_create_header.rowsAffected > 0){
                
                let select_single_header = await(await DB()).select(`SELECT * FROM tb_header_transaction_in WHERE id = ${exec_create_header.lastInsertId}`)
                select_single_header = select_single_header[0]
                
                this.data_transaksi_detail_barang.forEach(async(x)=>{
                     let exec_0 = await(await DB()).execute(`INSERT INTO tb_detail_transaction_in 
                        (transaction_in_id,product_id,qty,price) 
                        VALUES(${select_single_header.id} , ${x.id_barang} , ${x.qty} , ${x.harga})`)
                     let exec_1 = await(await DB()).execute(`UPDATE tb_product SET stock = stock + ${x.qty} WHERE id = ${x.id_barang}`)
                })

                return true
            }else{
                return false
            }
        },
        async deleteTransaksiMasuk(id){
            
                let exec_get_detail = await (await DB()).select(`SELECT * FROM tb_detail_transaction_in 
                INNER JOIN tb_product on tb_product.id = tb_detail_transaction_in.product_id
                WHERE tb_detail_transaction_in.transaction_in_id = ${id}`).then(result=>{                        
                    result.forEach(async(x)=>{
                        await(await DB()).execute(`UPDATE tb_product SET stock = stock - ${x.qty} WHERE id = ${x.product_id}`)
                    }) 
                })

                let exec_del_0 = await (await DB()).execute(`DELETE FROM tb_detail_transaction_in WHERE tb_detail_transaction_in.transaction_in_id = ${id}`)
                let exec_del_1 = await (await DB()).execute(`DELETE FROM tb_header_transaction_in WHERE id = ${id}`)

                if(exec_del_0.rowsAffected > 0 && exec_del_1.rowsAffected > 0){
                    return true
                }else{
                    return false
                }
                
        }
        
    },
    persist: true,
})