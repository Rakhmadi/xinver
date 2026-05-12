import { defineStore } from "pinia";
import { DB } from "../db";

export const laporanStore = defineStore('laporan',{
    state : () =>{
        return {
            data_reprot_barang : []
        }
    },
    actions : {
        async getData() {
            
        }
    }
})