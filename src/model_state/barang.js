import { defineStore } from "pinia";
import { DB } from "../db";
export const barangStore = defineStore('barang',{
    state : ()=>{
        return {
            data_barang : {},
            data_category : [],
            data_merek : [],
            data_location : []
        }
    },
    actions : {
        async getDataBarang(search,kategori_id,merek_id,location_id,order_by,is_desc,page,take){
                    
            let or_search = (search) ? `AND ( ('B-' || tb_product.id) LIKE '%${search}%' OR tb_product.name LIKE '%${search}%' OR tb_product.sku LIKE '%${search}%')` : ""  

            let conditional_kategori_id = (kategori_id) ? `AND (tb_product.category_id = '${kategori_id}' )` : ""

            let conditional_merek_id = (merek_id) ? `AND (tb_product.merk_id = '${merek_id}' )` : ""

            let conditional_location_id = (location_id) ? `AND (tb_product.location_id = '${location_id}' )` : ""

            let total_page =  await (await DB()).select(`SELECT COUNT(id) AS total_data FROM tb_product where 1=1 ${or_search} ${conditional_kategori_id}  ${conditional_merek_id}  ${conditional_location_id}`)

            let order_by_is_desc = (is_desc) ? "DESC" : "ASC"

            let take_data = (take) ? Number(take) : 10
           
            let page_now = (page) ? page : 1 

            let raw_query = `SELECT 
                'B-' || tb_product.id  AS code_barang ,
                tb_product.name,
                tb_product.sku,
                tb_product.stock as product_stock,
                tb_product.price as product_price,
                tb_category.name AS category_name,
                tb_merek.name AS merek_name,
                tb_location.name AS location_name,
                tb_location.code AS location_code,
                tb_product.created_at AS created_at
                FROM tb_product 
                LEFT JOIN tb_category ON tb_category.id = tb_product.category_id 
                LEFT JOIN tb_merek ON tb_merek.id = tb_product.merk_id
                LEFT JOIN tb_location ON tb_location.id = tb_product.location_id
                where 1=1 ${or_search} ${conditional_kategori_id}  ${conditional_merek_id}  ${conditional_location_id}   
                ORDER BY tb_product.${order_by} ${order_by_is_desc}
                LIMIT ${take_data} offset (${page_now} - 1) * ${take_data}`
        

            let data = await (await DB()).select(raw_query)

            this.data_barang = {
                total_data : total_page[0].total_data ,
                take : take_data,
                page_now : page_now,
                total_page : Number(Math.ceil(total_page[0].total_data / take_data)),
                data : data
            }
        },

        
        async getDataKategori(){
            this.data_category = await (await DB()).select("SELECT * from tb_category ORDER BY name ASC")
        },
        async getDataMerek(){
            this.data_merek = await (await DB()).select("SELECT * from tb_merek ORDER BY name ASC")
        },
        async getDataLocation(){
            this.data_location = await (await DB()).select("SELECT * from tb_location ORDER BY name ASC")
        }
    }
})
