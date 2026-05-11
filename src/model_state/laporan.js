import { defineStore } from "pinia";
import { DB } from "../db";

export const homeStore = defineStore('home',{
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