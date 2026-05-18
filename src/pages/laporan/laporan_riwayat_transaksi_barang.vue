<script setup>
import { onMounted, ref,watch,onUnmounted } from 'vue';
import {barangMasukStore} from '../../model_state/barang_masuk.js'
import {laporanStore} from '../../model_state/laporan.js'
import {storeToRefs} from 'pinia'
import { window } from '@tauri-apps/api';
let barang_masuk_store = barangMasukStore()

let laporan_state = laporanStore()

let { data_barang } = storeToRefs(barang_masuk_store)

let show_barang_drop = ref(false)
let barang = ref('')
let single_data_product = ref({})
let id_barang = ref()
let start_date = ref()
let end_date = ref()
let show_ = ref(false)

let clickItemBarang = (item)=>{
    barang.value = `${item.code_barang}-${item.sku}-${item.name}`
    id_barang.value = item.id
    single_data_product.value = item    
    console.log(single_data_product.value);
    
}

let blurAwait = ()=>{
    setTimeout(()=>{
        show_barang_drop.value = false
    },200)
}

watch(barang,async()=>{
    
    if(barang.value === ''){
        id_barang.value == ''
    }

    show_.value = true

    barang_masuk_store.getDataBarang(barang.value)

})

watch([barang,start_date,end_date],()=>{
    laporan_state.getRiwayatBarang(id_barang.value,start_date.value,end_date.value)
    laporan_state.getSingleDataBarang(id_barang.value)
})

onMounted(()=>{
    barang_masuk_store.getDataBarang()
})

onUnmounted(()=>{
    laporan_state.doClearData()
})

let print = ()=>{
    globalThis.window.print()    
}
</script>
<template>
    <h2 class="">Laporan Riwayat Keluar Dan Masuk Barang</h2>
    <div class="flex flex-row gap-2 items-end mb-8">
        <div class="relative ">
              <div class="flex flex-col gap-1">
                  <lable class="text-md">Seleksi Barang</lable>
                  <input @click="show_barang_drop = true" @blur="blurAwait" v-model="barang" type="text" placeholder="Cari Data Barang (kode,sku,nama barang)" class="w-[400px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
              </div>
              <div v-show="show_barang_drop" class="z-10 absolute bg-[#e4edff] rounded-lg w-full mt-2 py-2 overflow-y-auto h-[250px]">
                  <li v-for="item in data_barang" :key="item.id" @click="clickItemBarang(item)" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">{{ item.code_barang }} - {{ item.sku }} - {{ item.name }}</li>
                  <li v-if="data_barang.length <= 0" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">Barang Not Found</li>
              </div>
        </div>
        <div class="flex flex-col gap-2">
            <lable>Tanggal Awal</lable>
            <input type="date" v-model="start_date" class="w-[250px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
        </div>
        <div class="flex flex-col gap-2">
            <lable>Tangal Akhir</lable>
            <input type="date" v-model="end_date" class="w-[250px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
        </div>
        <button @click="print" v-show="laporan_state.detail_data_barang.code_barang" class="bg-purple-700 text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-purple-800 focus:border-b-1 text-white cursor-pointer">
           <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                </svg>
           </div>
            <span class="text-red">Print</span>
        </button>
    </div>

    <div class="bg-white  rounded" id="print-area" v-show="show_">
        <h3 class="my-2">Riwayat Keluar Dan Masuk Barang Tanggal "{{ start_date }}" Sampai "{{ end_date }}"</h3>
        <div class="overflow-x-auto border border-white/10 bg-white/5 backdrop-blur-md">
            <table class="min-w-full text-sm ">
                <tbody class="divide-y divide-white/10">

                    <tr class="hover:bg-white/5 transition z-0 ">
                        <td class=" font-medium text-gray-900 z-0 w-40 pb-2">
                            Kode Barang
                        </td>
                        <td class="pb-2">
                            {{ laporan_state.detail_data_barang.code_barang }}
                        </td>
                    </tr>

                    <tr class="hover:bg-white/5 transition z-0 ">
                        <td class=" font-medium text-gray-900 z-0 w-40 pb-2">
                            Nama Barang
                        </td>
                        <td class="pb-2">
                            {{ laporan_state.detail_data_barang.name }}
                        </td>
                    </tr>

                    <tr class="hover:bg-white/5 transition z-0 ">
                        <td class=" font-medium text-gray-900 z-0 w-40 pb-2">
                            SKU
                        </td>
                        <td class="pb-2">
                            {{ laporan_state.detail_data_barang.sku }}
                        </td>
                    </tr>
                    <tr class="hover:bg-white/5 transition z-0 ">
                        <td class=" font-medium text-gray-900 z-0 w-40 pb-2">
                            Stock Barang
                        </td>
                        <td class="pb-2">
                            {{ laporan_state.detail_data_barang.product_stock }} - {{ laporan_state.detail_data_barang.product_unit }}
                        </td>
                    </tr>
                    <tr class="hover:bg-white/5 transition z-0 ">
                        <td class=" font-medium text-gray-900 z-0 w-40 pb-2">
                            Kategori
                        </td>
                        <td class="pb-2">
                            {{ laporan_state.detail_data_barang.category_name }}
                        </td>
                    </tr>
                    <tr class="hover:bg-white/5 transition z-0 ">
                        <td class=" font-medium text-gray-900 z-0 w-40 pb-2">
                            Merek
                        </td>
                        <td class="pb-2">
                            {{ laporan_state.detail_data_barang.merek_name }}
                        </td>
                    </tr>
                    <tr class="hover:bg-white/5 transition z-0 ">
                        <td class=" font-medium text-gray-900 z-0 w-40 pb-2">
                            Location (code-name)
                        </td>
                        <td class="pb-2">
                            {{ laporan_state.detail_data_barang.location_code }} - {{ laporan_state.detail_data_barang.location_name }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="grid grid-cols-1 gap-4">
        
        <div class="">
            <h3 class="my-4">Riwayat Transaksi Masuk</h3>
            <div class="overflow-x-auto rounded-lg border border-gray-300">
            <table class="w-full border-collapse text-sm">
                <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 px-3 py-2 text-left">
                    Kode Transaksi
                    </th>
                    <th class="border border-gray-300 px-3 py-2 text-left">
                    Tanggal
                    </th>
                    <th class="border border-gray-300 px-3 py-2 text-left">
                    Nama Suplier
                    </th>
                    <th class="border border-gray-300 px-3 py-2 text-left">
                    Qty
                    </th>
                    <th class="border border-gray-300 px-3 py-2 text-left">
                    Diskripsi
                    </th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="item in laporan_state.data_riwayat_barang.transaksi_masuk" :key="item" class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-3 py-2">
                    {{item.code_transaction}}
                    </td>
                    <td class="border border-gray-300 px-3 py-2">
                    {{ item.date }}
                    </td>
                    <td class="border border-gray-300 px-3 py-2">
                    {{ item.name_supplier }}
                    </td>
                    <td class="border border-gray-300 px-3 py-2">
                    {{ item.qty_transaction }}
                    </td>
                    <td class="border border-gray-300 px-3 py-2">
                    {{ item.description }}
                    </td>
                </tr>
                </tbody>
            </table>
            </div>

        </div>

        <div class="">
            <h3 class="my-4">Riwayat Transaksi Keluar</h3>
            <div class="overflow-x-auto rounded-lg border border-gray-300">
            <table class="w-full border-collapse text-sm">
                <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 px-3 py-2 text-left">
                    Kode Transaksi
                    </th>
                    <th class="border border-gray-300 px-3 py-2 text-left">
                    Tanggal
                    </th>
                    <th class="border border-gray-300 px-3 py-2 text-left">
                    Qty
                    </th>
                    <th class="border border-gray-300 px-3 py-2 text-left">
                    Diskripsi
                    </th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="item in laporan_state.data_riwayat_barang.transaksi_keluar" :key="item" class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-3 py-2">
                    {{item.code_transaction}}
                    </td>
                    <td class="border border-gray-300 px-3 py-2">
                    {{ item.date }}
                    </td>
                    <td class="border border-gray-300 px-3 py-2">
                    {{ item.qty_transaction }}
                    </td>
                    <td class="border border-gray-300 px-3 py-2">
                    {{ item.description }}
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

        </div>

    </div>
</template>