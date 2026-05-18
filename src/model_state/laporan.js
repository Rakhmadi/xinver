import { defineStore } from "pinia";
import { DB } from "../db";

export const laporanStore = defineStore('laporan',{
    state : () =>{
        return {
            data_reprot_barang : [],
            data_laporan_barang_masuk : [],
            data_laporan_barang_keluar : [],
            data_laporan_barang_min : [],
            data_riwayat_barang : {},
            detail_data_barang : {}

        }
    },
    actions : {
        async getDataLaporanBarangMasuk(start_date,end_date) {
            let raw_query = `select ('TR-IN-' || tb_header_transaction_in.id) as code_transaction,
            tb_header_transaction_in.*,
            tb_supplier.name,
            sum(tb_detail_transaction_in.qty) as sum_qty_detail,
            COUNT(tb_detail_transaction_in.product_id ) as product_count,
            SUM(tb_detail_transaction_in.qty * tb_detail_transaction_in.price) as all_total_price
           
            from tb_header_transaction_in 
            
            inner join tb_supplier on tb_supplier.id = tb_header_transaction_in.supplier_id
            inner join tb_detail_transaction_in on tb_header_transaction_in.id = tb_detail_transaction_in.transaction_in_id  
            inner join tb_product tp on tp.id = tb_detail_transaction_in.product_id WHERE date BETWEEN '${start_date}' AND '${end_date}'
            
            GROUP BY tb_header_transaction_in.id `

            console.log(raw_query)

            let data = await(await DB()).select(raw_query)

            this.data_laporan_barang_masuk = data
        },
        async getDataLaporanBarangKeluar(start_date,end_date){
            let raw_query = `SELECT tb_header_transaction_out.*, 
                ('TR-OUT-'|| tb_header_transaction_out.id) as code_transaksi,
                count(tb_detail_transaction_out.product_id) as jenis_produk,  
                sum(tb_detail_transaction_out.qty) as sum_total_qty,
                sum(tb_detail_transaction_out.qty * tb_detail_transaction_out.price ) as total_price
                FROM tb_header_transaction_out
                INNER JOIN tb_detail_transaction_out on tb_detail_transaction_out.transaction_out_id = tb_header_transaction_out.id 
                INNER JOIN tb_product on tb_product.id = tb_detail_transaction_out.product_id 
                WHERE date BETWEEN '${start_date}' AND '${end_date}'
                GROUP BY tb_header_transaction_out.id`

                let data = await(await DB()).select(raw_query)

                this.data_laporan_barang_keluar = data
        },
        async getLaporanStockMin(){
            let stock_min = await (await DB()).select(`SELECT 'B-' || tb_product.id  AS code_barang ,* from tb_product where tb_product.stock <= ${Number(localStorage.getItem('min_pringatan_stock'))}`)
            this.data_laporan_barang_min = stock_min
        },
        async getRiwayatBarang(id,start_date,end_date){
            let transaksi_masuk = await(await DB()).select(`
                    select ('TR-IN-' || tb_header_transaction_in.id) as code_transaction,
                    tb_supplier.name as name_supplier, 
                    tb_header_transaction_in.*,
                    tb_detail_transaction_in.qty as qty_transaction
                    from tb_header_transaction_in
                    inner join tb_supplier on tb_supplier.id = tb_header_transaction_in.supplier_id 
                    inner join tb_detail_transaction_in on tb_detail_transaction_in.transaction_in_id  = tb_header_transaction_in.id 
                    inner join tb_product on tb_product.id  = tb_detail_transaction_in.product_id where tb_product.id = ${id} AND date BETWEEN  '${start_date}' AND '${end_date}'`)
            let transaksi_keluar = await(await DB()).select(` select tb_header_transaction_out.*,
                ('TR-OUT-'|| tb_header_transaction_out.id) as code_transaction,
                    tb_detail_transaction_out.qty as qty_transaction
                    from tb_header_transaction_out 
                    inner join tb_detail_transaction_out on tb_detail_transaction_out.transaction_out_id  = tb_header_transaction_out.id 
                    inner join tb_product on tb_product.id  = tb_detail_transaction_out.product_id where tb_product.id = ${id} AND date BETWEEN  '${start_date}' AND '${end_date}'`)

                    this.data_riwayat_barang = {
                        transaksi_masuk : transaksi_masuk,
                        transaksi_keluar : transaksi_keluar
                    }
                    
        },async getSingleDataBarang(id){
            let data = await(await DB()).select(`SELECT 
                'B-' || tb_product.id  AS code_barang ,
                tb_product.id,
                tb_product.name,
                tb_product.sku,
                tb_product.stock as product_stock,
                tb_product.price as product_price,
                tb_product.unit as product_unit,
                tb_category.name AS category_name,
                tb_merek.name AS merek_name,
                tb_location.name AS location_name,
                tb_location.code AS location_code,
                tb_product.created_at AS created_at,
                (tb_product.price * tb_product.stock) as total_harga
                FROM tb_product 
                LEFT JOIN tb_category ON tb_category.id = tb_product.category_id 
                LEFT JOIN tb_merek ON tb_merek.id = tb_product.merk_id
                LEFT JOIN tb_location ON tb_location.id = tb_product.location_id where tb_product.id = ${id}`)
                this.detail_data_barang = data[0]
        },doClearData(){
            this.detail_data_barang = {}

            this.data_riwayat_barang = {
                transaksi_masuk : [],
                transaksi_keluar : []
            }
        }
    }
})