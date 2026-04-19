import Database from "@tauri-apps/plugin-sql";
import { exists, BaseDirectory } from "@tauri-apps/plugin-fs";
import migration_sql from "./migration";

export let DB = async()=>{
    return await Database.load("sqlite:xinver_database.db");
}

export let initDatabase = async()=>{
    let database_exist = await exists('xinver_database.db',{
        baseDir : BaseDirectory.AppData
    })

    if(!database_exist){
        (await DB()).execute(migration_sql)
    }
    
    
}
