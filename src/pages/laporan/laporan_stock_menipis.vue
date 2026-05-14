<script setup>
import { ref,onMounted } from 'vue'
import {laporanStore} from '../../model_state/laporan.js'
import * as XLSX from "xlsx";
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";

let laporan_state = laporanStore()
let start_date = ref('')
let end_date = ref('')
let data_export = ref('')

onMounted(()=>{
    laporan_state.getLaporanStockMin(start_date.value,end_date.value).then(async()=>{
                console.log(laporan_state.data_laporan_barang_min)

            data_export.value = laporan_state.data_laporan_barang_min.map(x=>{
                return {
                    kode_barang : x.code_barang,
                    sku : x.sku,
                    nama_barang : x.name,
                    stock : x.stock,
                    unit : x.unit,
                    harga : x.price ,
                    description : x.description
                }
            })
        })
})

let export_ = async()=>{
    laporan_state.getLaporanStockMin(start_date.value,end_date.value).then(async()=>{
        console.log(laporan_state.data_laporan_barang_min)
            data_export.value = laporan_state.data_laporan_barang_min.map(x=>{
                return {
                    kode_barang : x.code_barang,
                    sku : x.sku,
                    nama_barang : x.name,
                    stock : x.stock,
                    unit : x.unit,
                    harga : x.price ,
                    description : x.description
                }
            })

    // buat worksheet
            const worksheet = XLSX.utils.json_to_sheet(data_export.value);

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
                defaultPath: "laporan Stock Menipis.xlsx",
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
    <h2 class="mb-4">Laporan Transaksi Barang Keluar</h2>
        <button @click="export_" class="bg-green-700 mb-4 text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-green-800 focus:border-b-1 text-white cursor-pointer">
           <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
           </div>
            <span class="text-red">Export To EXCEL</span>
        </button>
    <div class="overflow-x-auto bg-white rounded-xl shadow ">
        <table class="min-w-full text-sm text-left">
            <!-- HEADER -->
            <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                    <th class="px-4 py-3">kode_barang</th>
                    <th class="px-4 py-3">sku</th>
                    <th class="px-4 py-3">nama_barang</th>
                    <th class="px-4 py-3">stock</th>
                    <th class="px-4 py-3">unit</th>
                    <th class="px-4 py-3">harga</th>
                    <th class="px-4 py-3">description</th>
                </tr>
            </thead>
            <!-- BODY -->
            <tbody class="divide-y divide-gray-200">
                <!-- ROW -->
                <tr v-for="item in data_export" :key="item.id" class="hover:bg-gray-50 transition">
                    <td class="px-4 py-3 font-medium text-gray-800">{{ item.kode_barang }}</td>
                    <td class="px-4 py-3 font-medium text-gray-800">{{ item.sku }}</td>
                    <td class="px-4 py-3 font-medium text-gray-800">{{ item.nama_barang }}</td>
                    <td class="px-4 py-3 font-medium text-gray-800">{{ item.stock }}</td>
                    <td class="px-4 py-3 font-medium text-gray-800">{{ item.unit }}</td>
                    <td class="px-4 py-3 font-medium text-gray-800">{{ item.harga }}</td>
                    <td class="px-4 py-3 font-medium text-gray-800">{{ item.description }}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>