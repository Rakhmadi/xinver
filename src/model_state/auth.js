import { defineStore } from "pinia";
import { DB } from "../db";
import bcrypt from 'bcryptjs'

export const authStore = defineStore('auth',{
    state : () =>{
        return {
            data_reprot_barang : [],
            is_login : false
        }
    },
    actions : {
        async login(password){
            let data_user = await ( await DB()).select(`SELECT * from tb_user where name = 'admin'`)
            let password_hash = data_user[0].password

            bcrypt.compare(password,password_hash,(err,result)=>{
                this.is_login = result
            })
        },
        async Logout() {
            this.is_login = false
        }
        ,async changePassword(new_password,old_password){


            let data_user = await ( await DB()).select(`SELECT * from tb_user where name = 'admin'`)
            let password_hash = data_user[0].password

            try{
                bcrypt.compare(old_password,password_hash,async(err,result)=>{
                    if(result){
                        const salt = await bcrypt.genSalt(10)
                        const hash = await bcrypt.hash(new_password,salt)
                        await(await DB()).execute(`UPDATE tb_user SET password ='${hash}' where name = 'admin'`)

                    }else{
                    }
                })
                return true
            }catch(err){
                return false
            }

        }
    },

    persist : true
})