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
        getDataBarang(){

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
