import { defineStore } from "pinia";
import { DB } from "../db";
import { BaseDirectory ,remove} from '@tauri-apps/plugin-fs'

export const supllierStore = defineStore('supplier',{
    state : ()=>{
        return {
            data_supplier : [],
            loading : false,
        }
    },
    actions : {
        async gatDataSuplier(search = '',sort_by_dsc = true,order_by = 'tb_supplier.id'){

            let or_search = (search) ? `AND(name LIKE '%${search}%' OR email LIKE '%${search}%')` : ""
            let order_by_mode = `${order_by} ${(sort_by_dsc) ? "DESC" : "ASC"}` 
            
            let raw_query_0 = `SELECT tb_supplier.*,count(tb_header_transaction_in.id ) as total_transaksi_masuk FROM tb_supplier 
                left join tb_header_transaction_in on tb_supplier.id = tb_header_transaction_in.supplier_id 
                WHERE 1=1 ${or_search} GROUP BY tb_supplier.id ORDER BY ${order_by_mode}`
            console.log(raw_query_0);
            
            this.data_supplier = await(await DB()).select(raw_query_0)
        },
        async addSupplier(name,email,no_phone,address){
            this.loading = true
            let exec_0 = await(await DB()).execute(`INSERT INTO tb_supplier 
                (name,email,no_phone,address)
                VALUES($1,$2,$3,$4)`,[name,email,no_phone,address])
            this.loading = false
            if(exec_0.rowsAffected > 0){
                return true
            }else{
                return false
            }  
        },
        async updateSupplier(name,email,no_phone,address,id){
            this.loading = true
            let exec_0 = await (await DB()).execute(`UPDATE tb_supplier 
                SET name = '${name}',email ='${email}',no_phone='${no_phone}', address='${address}' 
                WHERE id = ${id}`)
            this.loading = false
            if(exec_0.rowsAffected > 0 ){
                return true
            }else{
                return false
            }
        },
        async checkSupplier(id){
            
            let exec_0 = await(await DB()).select(`SELECT tb_supplier.*,count(tb_header_transaction_in.id ) as total_transaksi_masuk FROM tb_supplier 
                left join tb_header_transaction_in on tb_supplier.id = tb_header_transaction_in.supplier_id where tb_supplier.id = '${id}'
                GROUP BY tb_supplier.id `)
            
                if(exec_0[0].total_transaksi_masuk <= 0){
                    return true
                }else{
                    return false
                }
        },
        async deleteSuplier(id){
            let exec_0 = await(await DB()).execute(`DELETE FROM tb_supplier WHERE id = ${id}`)
            
            if(exec_0.rowsAffected > 0 ){
                return true
            }else{
                return false
            }

        }
    }
})

