import { defineStore } from "pinia";
import { DB } from "../db";

export const homeStore = defineStore('home',{
    state : ()=>{
        return {
            data_home : {}
        }
    },
    actions : {
        async getInfo(){

            let total_product = await (await DB()).select(`select sum(stock) as total_product from tb_product`)
            let total_jenis_barang = await (await DB()).select(`select count(id) as total_product from tb_product`)
            let sum_masuk = await (await DB()).select(`SELECT sum(tb_detail_transaction_in.qty) as sum_total FROM  tb_detail_transaction_in`)
            let sum_keluar = await (await DB()).select(`SELECT sum(tb_detail_transaction_out.qty)as sum_total FROM  tb_detail_transaction_out`)
            let stock_min = await (await DB()).select(`SELECT count(tb_product.id) as total_stockmin from tb_product where tb_product.stock <= ${Number(localStorage.getItem('min_pringatan_stock')
)}`)

            let grafik_masuk = await (await DB()).select(`select 
                count(DISTINCT tb_header_transaction_in.id) as transaksi,
                sum(tb_detail_transaction_in.qty) as total_qty ,
                date  
                from tb_header_transaction_in
                inner join tb_detail_transaction_in on tb_detail_transaction_in.transaction_in_id = tb_header_transaction_in.id 
                group by strftime('%Y/%m/%d', tb_header_transaction_in.date) order by date desc limit 10`)

            let grafik_keluar = await (await DB()).select(`select 
                count(DISTINCT tb_header_transaction_out.id) as transaksi ,
                sum(tb_detail_transaction_out.qty) as total_qty,
                date 
                from tb_header_transaction_out 
                inner join tb_detail_transaction_out on tb_detail_transaction_out.transaction_out_id  = tb_header_transaction_out.id  
                group by strftime('%Y/%m/%d', tb_header_transaction_out.date) order by date desc limit 10`)

                let total_harga_barang = await(await DB()).select(`select sum(stock*price) as total_harga_barang from tb_product`)

                let total_harga_barang_masuk = await(await DB()).select(`select sum(qty * price) as total from tb_detail_transaction_in  `)
                let total_harga_barang_keluar = await(await DB()).select(`select sum(qty * price) as total from tb_detail_transaction_out `)

                let rata_rata_harga_barang = await(await DB()).select(`select avg(price) as rata_rata_harga_produk from tb_product `)

                let data_banyak_transaksi_keluar = await(await DB()).select(`select 
                    sum(tb_detail_transaction_out.qty) sum_qty ,
                    ('B-' || tb_product.id) as code_barang,
                    name,
                    sku,
                    unit
                    from tb_detail_transaction_out
                    inner join tb_product ON tb_product.id = tb_detail_transaction_out.product_id 
                    group by product_id order by sum_qty DESC LIMIT 10`)

                let data_banyak_transaksi_masuk = await(await DB()).select(`select 
                    sum(tb_detail_transaction_in.qty) sum_qty ,
                    ('B-' || tb_product.id) as code_barang,
                    name,
                    sku,
                    unit
                    from tb_detail_transaction_in
                    inner join tb_product ON tb_product.id = tb_detail_transaction_in.product_id 
                    group by product_id order by sum_qty DESC LIMIT 10`)

            this.data_home = {
                total_product : total_product[0].total_product,
                sum_masuk : sum_masuk[0].sum_total,
                sum_keluar : sum_keluar[0].sum_total,
                stock_min : stock_min[0].total_stockmin,
                grafik_masuk : grafik_masuk.reverse(),
                grafik_keluar : grafik_keluar.reverse(),
                total_harga_barang : total_harga_barang[0].total_harga_barang,
                total_harga_barang_masuk : total_harga_barang_masuk[0].total,
                total_harga_barang_keluar : total_harga_barang_keluar[0].total,
                rata_rata_harga_barang : rata_rata_harga_barang[0].rata_rata_harga_produk,
                data_banyak_transaksi_keluar : data_banyak_transaksi_keluar,
                data_banyak_transaksi_masuk : data_banyak_transaksi_masuk,
                total_jenis_barang : total_jenis_barang[0].total_product
            }

            return 0

        }
    }
})
