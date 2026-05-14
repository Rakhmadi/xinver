<script setup>
import { ref } from 'vue'
import {laporanStore} from '../../model_state/laporan.js'
import * as XLSX from "xlsx";
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";

let laporan_state = laporanStore()
let start_date = ref('')
let end_date = ref('')


let export_ = async()=>{
    laporan_state.getDataLaporanBarangKeluar(start_date.value,end_date.value).then(async()=>{

        console.log(laporan_state.data_laporan_barang_keluar)

            let data_export = laporan_state.data_laporan_barang_keluar.map(x=>{
                return {
                    kode_transaksi : x.code_transaksi,
                    tanggal_transaksi : x.date, 
                    deskripsi : x.description,
                    nama_supplier : x.name,
                    total_qty : x.sum_total_qty,
                    total_jenis_barang : x.jenis_produk,
                    total_harga : x.total_price

                }
            })

    // buat worksheet
            const worksheet = XLSX.utils.json_to_sheet(data_export);

            // buat workbook
            const workbook = XLSX.utils.book_new();

            // append sheet
            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Laporan Data"
            );

            // generate binary excel
            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });

            // dialog save
            const filePath = await save({
                defaultPath: "laporan barang keluar.xlsx",
                filters: [
                {
                    name: "Excel",
                    extensions: ["xlsx"]
                }
                ]
            });

            // user cancel
            if (!filePath) return;

            // save file
            await writeFile(
                filePath,
                new Uint8Array(excelBuffer)
            );  
        })


}
</script>
<template>
    <h2>Laporan Transaksi Barang Keluar</h2>
    <div class="mt-4 flex flex-row gap-2 items-end">
        <div class="flex flex-col gap-2">
            <lable>Tanggal Awal</lable>
            <input type="date" v-model="start_date" class="w-[250px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
        </div>
        <div class="flex flex-col gap-2">
            <lable>Tangal Akhir</lable>
            <input type="date" v-model="end_date" class="w-[250px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
        </div>
        <button @click="export_" class="bg-green-700 text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-green-800 focus:border-b-1 text-white cursor-pointer">
           <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
           </div>
            <span class="text-red">Export To EXCEL</span>
        </button>
    </div>
</template>