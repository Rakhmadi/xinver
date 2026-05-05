import { defineStore } from "pinia";
import { DB } from "../db";
import { BaseDirectory ,remove} from '@tauri-apps/plugin-fs'

export const barangStore = defineStore('barang',{
    state : ()=>{
        return {
            data_barang : {},
            data_category : [],
            data_merek : [],
            data_location : [],
            single_data_barang : {},
            data_image_product : [],
            loading : false
        }
    },
    actions : {
        async getDataBarang(search,kategori_id,merek_id,location_id,order_by,is_desc,page,take){
            this.loading = true                
            let or_search = (search) ? `AND ( ('B-' || tb_product.id) LIKE '%${search}%' OR tb_product.name LIKE '%${search}%' OR tb_product.description LIKE '%${search}%' OR tb_product.sku LIKE '%${search}%')` : ""  

            let conditional_kategori_id = (kategori_id) ? `AND (tb_product.category_id = '${kategori_id}' )` : ""

            let conditional_merek_id = (merek_id) ? `AND (tb_product.merk_id = '${merek_id}' )` : ""

            let conditional_location_id = (location_id) ? `AND (tb_product.location_id = '${location_id}' )` : ""

            let total_page =  await (await DB()).select(`SELECT COUNT(id) AS total_data FROM tb_product where 1=1 ${or_search} ${conditional_kategori_id}  ${conditional_merek_id}  ${conditional_location_id}`)

            let order_by_is_desc = (is_desc) ? "DESC" : "ASC"

            let take_data = (take) ? Number(take) : 10
           
            let page_now = (page) ? page : 1 

            let raw_query = `SELECT 
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
            this.loading = false   
        },
        
        
        async getSingleDataBarang(id_barang){

            let data = await(await DB()).select(`SELECT tb_product.* ,
                'B-' || tb_product.id  AS code_barang ,
                tb_category.name AS category_name,
                tb_merek.name AS merek_name,
                tb_location.name AS location_name,
                tb_location.code AS location_code,
                tb_category.description AS  description_category,
                tb_merek.description AS description_merek,
                tb_location.description AS description_location
                from tb_product 
                LEFT JOIN tb_category ON tb_category.id = tb_product.category_id 
                LEFT JOIN tb_merek ON tb_merek.id = tb_product.merk_id
                LEFT JOIN tb_location ON tb_location.id = tb_product.location_id where tb_product.id = ${id_barang}`)

            this.single_data_barang = data[0]
            
            return data
        },

        async deleteDataBarang(id_barang){
            
            let exec0 = await(await DB()).select(`SELECT * FROM tb_galery  WHERE product_id = $1`,[id_barang])
            
            exec0.forEach(async(item) => {
                await remove(`media\\${item.name_file}`, { baseDir: BaseDirectory.AppData });
            });
            
            let exec2 = await(await DB()).execute(`DELETE FROM tb_galery WHERE product_id = $1`,[id_barang])

            let exec1 = await(await DB()).execute(`DELETE FROM tb_product WHERE id = $1`,[id_barang])
            

            if(exec1.rowsAffected > 0 || exec2.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },

        async getDataImage(id){
            let data = await(await DB()).select(`SELECT * FROM tb_galery WHERE product_id = ${id}`,)
            this.data_image_product = data
        },

        async addDataBarang(name,sku,category_id,merk_id,location_id,description,unit,stock,price){

            let exec = await(await DB()).execute(`INSERT INTO tb_product (name,sku,category_id,merk_id,location_id,description,unit,stock,price)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,[name,sku,category_id,merk_id,location_id,description,unit,stock,price])            
            
            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }

        },

        async updateDataBarang(name,sku,category_id,merk_id,location_id,description,unit,stock,price,product_id){
        let exec = await(await DB()).execute(`UPDATE tb_product SET
            name = $1, 
            sku = $2, 
            category_id = $3,
            merk_id = $4,
            location_id = $5,
            description = $6,
            unit = $7,
            stock = $8,
            price = $9 WHERE id = $10 `,[name,sku,category_id,merk_id,location_id,description,unit,stock,price,product_id])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },


        
        async checkSKUbarang(sku){
            return await (await DB()).select("SELECT * from tb_product WHERE sku = $1",[sku])
        },

        async addDataImage(product_id,name_file,description){
            
            let exec = await(await DB()).execute(`INSERT INTO tb_galery (product_id,name_file,description) VALUES ($1,$2,$3)`,
                [product_id,name_file,description]
            )            
            
            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
            
        },
        async deleteDataImage(id){
            let exec = await(await DB()).execute(`DELETE FROM tb_galery WHERE id = $1`,[id])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },
        async getDataKategori(by_name = true,order_by_desc = true,order_by = 'tb_category.id'){
            
            let order_by_mode = ``
            
            if(by_name){
                order_by_mode = 'tb_category.name ASC'
            }else{
                order_by_mode = `${order_by} ${order_by_desc ? "DESC" : "ASC"}`
            }

            this.data_category = await (await DB()).select(`SELECT 
                tb_category.id,
                tb_category.name,
                tb_category.description,
                count(tb_category.id) as product_count,
                sum(tb_product.stock) as sum_stock
                from tb_category 
                INNER JOIN tb_product on tb_product.category_id = tb_category.id
                GROUP BY tb_category.id 
                ORDER BY ${order_by_mode}`)
        },

        async addDataKategori(category_name,description){

           let exec = await(await DB()).execute(`INSERT INTO tb_category (name,description) VALUES ($1,$2)`,[category_name,description])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },

        async updateDataKategori(name,description,id){
        let exec = await(await DB()).execute(`UPDATE tb_category SET
            name = $1, 
            description = $2 WHERE id = $3 `,[name,description,id])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },

        async checkKategoriInProducts(category_id){
            let exec_0 = await (await DB()).select("SELECT count(*) as count from tb_product where category_id = $1",[category_id])
            if(exec_0[0].count <= 0){
                return true
            }else{
                return false
            }
        },
        async deleteDataKategori(id){
            let exec = await(await DB()).execute(`DELETE FROM tb_category WHERE id = $1`,[id])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },
        async getDataMerek(by_name = true,order_by_desc = true,order_by = 'tb_merek.id'){
            
            let order_by_mode = ``
            
            if(by_name){
                order_by_mode = 'tb_merek.name ASC'
            }else{
                order_by_mode = `${order_by} ${order_by_desc ? "DESC" : "ASC"}`
            }

            this.data_merek = await (await DB()).select(`SELECT 
                tb_merek.id,
                tb_merek.name,
                tb_merek.description,
                count(tb_merek.id) as product_count,
                sum(tb_product.stock) as sum_stock
                from tb_merek 
                INNER JOIN tb_product on tb_product.merk_id = tb_merek.id
                GROUP BY tb_merek.id 
                ORDER BY ${order_by_mode}`)
        },
        async addDataMerek(category_name,description){
           let exec = await(await DB()).execute(`INSERT INTO tb_merek (name,description) VALUES ($1,$2)`,[category_name,description])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },

        async updateDataMerek(name,description,id){
            let exec = await(await DB()).execute(`UPDATE tb_merek SET
                name = $1, 
                description = $2 WHERE id = $3 `,[name,description,id])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },

        async checkMerekInProducts(category_id){
            let exec_0 = await (await DB()).select("SELECT count(*) as count from tb_product where merk_id = $1",[category_id])
            if(exec_0[0].count <= 0){
                return true
            }else{
                return false
            }
        },
        async deleteDataMerek(id){
            let exec = await(await DB()).execute(`DELETE FROM tb_merek WHERE id = $1`,[id])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },

        async getDataLocation(by_name = true,order_by_desc = true,order_by = 'tb_location.id'){
            let order_by_mode = ``
            
            if(by_name){
                order_by_mode = 'tb_location.name ASC'
            }else{
                order_by_mode = `${order_by} ${order_by_desc ? "DESC" : "ASC"}`
            }

            this.data_location = await (await DB()).select(`SELECT 
                tb_location.id,
                tb_location.code,
                tb_location.name,
                tb_location.description,
                count(tb_location.id) as product_count,
                sum(tb_product.stock) as sum_stock
                from tb_location 
                INNER JOIN tb_product on tb_product.location_id = tb_location.id
                GROUP BY tb_location.id ORDER BY ${order_by_mode}`)
        },
        async addDataLocation(code,name,description){
           let exec = await(await DB()).execute(`INSERT INTO tb_location (code,name,description) VALUES ($1,$2,$3)`,[code,name,description])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },
        async updateDataLocation(code,name,description,id){
            let exec = await(await DB()).execute(`UPDATE tb_location SET
                code = $1,
                name = $2, 
                description = $3 WHERE id = $4 `,[code,name,description,id])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        },
        async checkLocationInProducts(id){
            let exec_0 = await (await DB()).select("SELECT count(*) as count from tb_product where location_id = $1",[id])
            console.log(exec_0[0].count);
            
            if(exec_0[0].count <= 0){
                return true
            }else{
                return false
            }
        },
        async deleteDataLocation(id){
            let exec = await(await DB()).execute(`DELETE FROM tb_location WHERE id = $1`,[id])

            if(exec.rowsAffected > 0){
                return true
            }else{
                return false
            }
        }
    }
})
