<script setup>
import { onMounted, ref, watch } from 'vue';
import {barangMasukStore} from '../../model_state/barang_masuk.js'


let data_barang_masuk = barangMasukStore()

let search = ref('')
let date = ref('')
let order_by_desc = ref(true)
let order_by = ref('tb_header_transaction_in.id')
let take = ref(10)
let page = ref(1)

onMounted(()=>{
    data_barang_masuk.getDataBarangMasuk(search.value,date.value,order_by.value,order_by_desc.value,page.value,take.value)
})


let clear = ()=>{
    search.value = ''
    date.value = ''
    order_by.value = 'tb_header_transaction_in.id'
    order_by_desc.value = true
    take.value = 10
    page.value = 1
}

function highlightText(text, keyword) {
    if (!keyword) return text;

    return text.replace(
        new RegExp(keyword, "gi"),
        `<mark>$&</mark>`
    );
}

let nextPage = ()=>{
    if(page.value < data_barang_masuk.data_barang_masuk.total_page){
        page.value = page.value + 1
        data_barang_masuk.getDataBarangMasuk(search.value,date.value,order_by.value,order_by_desc.value,page.value,take.value)
    }
}

let previousPage = ()=>{
    if(page.value > 1){
        page.value = page.value - 1
         data_barang_masuk.getDataBarangMasuk(search.value,date.value,order_by.value,order_by_desc.value,page.value,take.value)
    }
}

watch([search,date,order_by_desc,order_by,take],()=>{
    
    data_barang_masuk.getDataBarangMasuk(search.value,date.value,order_by.value,order_by_desc.value,1,take.value)
})


</script>
<template>
    <div><h1 class="mb-4">List Data Transaksi Barang Masuk</h1></div>
    <div class="mb-4 flex flex-row items-center justify-between">
        <div class="flex flex-row gap-2">
                <input v-model="search" type="text" placeholder="Kode (TR-IN-XXXX) Atau Nama Suplier" class="w-[300px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <input v-model="date" type="date" class="w-[200px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <select v-model="take" class="w-[120px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    <option default value="10">Ambil - 10</option>
                    <option value="20">Ambil - 20</option>
                    <option value="50">Ambil - 50</option>
                    <option value="100">Ambil - 100</option>
                </select>
                <select v-model="order_by" class="w-[200px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    <option value="tb_header_transaction_in.id" default>Urutkan Kode Transaksi</option>
                    <option value="tb_header_transaction_in.date">Urutkan Tanggal</option>
                    <option value="product_count">Urutkan Total Jenis Barang</option>
                    <option value="sum_qty_detail">Urutkan Total Stock Barang</option>
                </select>
                <button @click="order_by_desc = !order_by_desc" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                    <div v-if="order_by_desc">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                        </svg>
                    </div>
                    <div v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                        </svg>
                    </div>
                    <span v-if="order_by_desc" class="text-red">Desc</span>
                    <span v-else class="text-red">Asc</span>
                </button>
                <button @click="clear" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                    <span class="text-red">Reset</span>
                </button>
        </div>
        <div>
            <router-link to="/" class="bg-[#2563EB] no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
                <span class="text-red">Tambah Transaksi Barang Masuk</span>
            </router-link>
        </div>
    </div>
    <div>
        <div class="overflow-x-auto bg-white rounded-xl shadow">
            <table class="min-w-full text-sm text-left">
                <!-- HEADER -->
                <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                        <th class="px-4 py-3">Kode Transaksi</th>
                        <th class="px-4 py-3">Tanggal Transaksi</th>
                        <th class="px-4 py-3">Nama Suplier</th>
                        <th class="px-4 py-3">Deskripsi</th>
                        <th class="px-4 py-3">Total Jenis Barang</th>
                        <th class="px-4 py-3">Total QTY Barang</th>
                        <th class="px-4 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <!-- BODY -->
                <tbody class="divide-y divide-gray-200">
                    <!-- ROW -->
                    <tr v-for="(item) in data_barang_masuk.data_barang_masuk.data" :key="item" class="hover:bg-gray-50 transition">
                        <td class="px-4 py-3 font-medium text-gray-800" v-html="highlightText(item.code_transaction,search)"></td>
                        <td class="px-4 py-3 text-gray-600">{{ item.date }}</td>
                        <td class="px-4 py-3 text-gray-600" v-html="highlightText(item.name,search)"></td>
                        <td class="px-4 py-3 text-gray-600">{{ item.description }}</td>
                        <td class="px-4 py-3 text-gray-600">{{ item.product_count }}</td>
                        <td class="px-4 py-3 text-gray-600">{{ item.sum_qty_detail }}</td>
                        <td class="px-4 py-3 text-center flex flex-row-reverse gap-2">
                            <router-link :to="`barang/detail_barang/${item.id}`" class="bg-[#2563EB] no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </div>
                                <span class="text-red">Detail</span>
                            </router-link>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-4 text-[#2d354f] text-sm flex gap-2">
        <span>Halaman {{ page }} hingga {{ data_barang_masuk.data_barang_masuk.total_page }} dari {{data_barang_masuk.data_barang_masuk.total_data}} Entri</span>
    </div>
    <div class="mt-4 flex gap-2">
        <button @click="previousPage" :class="page <= 1 ? 'bg-[#7397e6]' : 'bg-[#2563EB] hover:bg-[#1E40AF]' " class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent  focus:border-b-1 text-white cursor-pointer">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
            <span class="text-red">Sebelum</span>
        </button>
        <button @click="nextPage" :class="page >= data_barang_masuk.data_barang_masuk.total_page ? 'bg-[#7397e6]' : 'bg-[#2563EB] hover:bg-[#1E40AF]' " class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent focus:border-b-1 text-white cursor-pointer">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            <span class="text-red">Berikutnya</span>
        </button>
    </div>
    
</template>