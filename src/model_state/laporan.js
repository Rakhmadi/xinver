import { defineStore } from "pinia";
import { DB } from "../db";

export const laporanStore = defineStore('laporan',{
    state : () =>{
        return {
            data_reprot_barang : [],
            data_laporan_barang_masuk : [],
            data_laporan_barang_keluar : [],
            data_laporan_barang_min : []

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
        }
    }
})