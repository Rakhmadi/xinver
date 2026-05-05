import { defineStore } from "pinia";
import { DB } from "../db";
import { BaseDirectory ,remove} from '@tauri-apps/plugin-fs'


export const barangMasukStore = defineStore('barang_masuk',{
    state:()=>{
        return {
            data_barang_masuk : [],
            data_suplier : []
        }
    },
    actions : {
        async getDataBarangMasuk(search_code,date,order_by,is_desc,page,take){

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
            COUNT(tb_detail_transaction_in.product_id ) as product_count
            
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
        },
        async getDataSuplier(){
            let data = await (await DB()).select("")
        }
    }
})