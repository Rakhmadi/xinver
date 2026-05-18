<script setup>
import { onMounted, ref, watch } from 'vue';
import {barangKeluarStore} from '../../model_state/barang_keluar.js'
import { useRoute } from 'vue-router';
import {storeToRefs} from 'pinia'

import { useRouter } from 'vue-router';

import { formatRupiah } from '../../helper_function.js'
import Tutut from 'tutut';

let router = useRouter()
let barang_keluar_store = barangKeluarStore()

let { data_barang,data_transaksi_detail_barang} = storeToRefs(barang_keluar_store)

const today = new Date().toISOString().split('T')[0]

let barang = ref('')
let id_barang = ref('')

let qty = ref(0)
let harga = ref(0)
let harga_format = ref('')

let date = ref(today)
let deskripsi = ref('')

let show_barang_drop = ref(false)

let single_data_product = ref({})

let show_msg = ref(false)
let content_msg = ref('')

let total_harga_detail_barang = ref(0) 


let clickItemBarang = (item)=>{
    barang.value = `${item.code_barang}-${item.sku}-${item.name}`
    id_barang.value = item.id
    single_data_product.value = item   
    harga_format.value = formatRupiah(item.price)
    harga.value = item.price
}

let blurAwait = ()=>{
    setTimeout(()=>{
        show_barang_drop.value = false
    },200)
}

let getTotalAllDetailbarang = ()=>{
    total_harga_detail_barang.value = data_transaksi_detail_barang.value.reduce((sum,item)=>{
        return sum + (item.qty * item.harga)
    },0)
}



watch(barang,async()=>{
    
    if(barang.value === ''){
        id_barang.value == ''
    }

    barang_keluar_store.getDataBarang(barang.value)

})

watch(data_transaksi_detail_barang,()=>{
    getTotalAllDetailbarang()
},{deep : true})


onMounted(async()=>{
    barang_keluar_store.getDataBarang()
    getTotalAllDetailbarang()
})

let addBarangDetail = ()=>{
    if(id_barang.value === ''){
        show_msg.value = true
        content_msg.value = 'Seleksi Barang Diperlukan'
    }else if(qty.value === 0){
        show_msg.value = true
        content_msg.value = 'Qty Harus Lebih Dari 0'
    }else if((single_data_product.value.stock - qty.value) < 0 ){
        show_msg.value = true
        content_msg.value = `Stock barang B-${single_data_product.value.id} Hanya '${single_data_product.value.stock}'`

    }else{
        barang_keluar_store.addDetailTransakiBarangKeluar(single_data_product.value,qty.value,harga.value)
        qty.value = 0
        harga.value = 0
        single_data_product.value = {}
        barang.value = ''
        id_barang.value = ''
        harga_format.value = ''
    }
    
}

let removeBarangDetail = (index)=>{
    barang_keluar_store.removeDetailTransakiBarangKeluar(index)
    qty.value = 0
    harga.value = 0
    single_data_product.value = {}
    barang.value = ''
    id_barang.value = ''
    harga_format.value = ''
}

let saveTransaksiKeluar = ()=>{
    
    if(data_transaksi_detail_barang.value.length <= 0){
        show_msg.value = true
        content_msg.value = 'Detail Barang Minimum 1 Barang'
    }else{
        barang_keluar_store.saveTransaksiKeluar(date.value,deskripsi.value).then(x=>{
            
            Tutut.success({
                title : 'Pesan',
                text : 'Data Transaksi Berhasil Di Simpan'
            })

            qty.value = 0
            harga.value = 0
            harga_format.value = ''
            single_data_product.value = {}
            barang.value = ''
            id_barang.value = ''

            barang_keluar_store.clearDetailTransakiBarangKeluar()

            router.push({
                path : '/barang_keluar'
            })
        })
    }
}

let clearDetail = ()=>{
    barang_keluar_store.clearDetailTransakiBarangKeluar()
}


</script>
<template>
    <div class=" flex flex-row justify-between items-center mb-4 ">
        <div>
            <h1 class="text-2xl text-[#2d354f] ">Tambah Transaksi Barang Keluar</h1>
        </div>
        <div>
            <router-link to="/barang_masuk" class="bg-[#2563EB] w-min no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                <span class="text-red">Kembali</span>
            </router-link>
        </div>
    </div>
    <div v-show="show_msg" class="flex flex-row w-full h-auto bg-yellow-50 text-yellow-800 rounded-xl p-4 border border-yellow-200 mb-4">
        <div class="flex flex-row justify-between w-full items-center">
            <div class="flex flex-row items-center gap-4">
                <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="">{{ content_msg }}</div>
            </div>
            <div class="close cursor-pointer" @click="show_msg = !show_msg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    </div>
    <div class="shadow rounded-2xl p-4 border-1 border-gray-200">
        <h1 class="text-lg text-[#2d354f] my-2 font-semibold">Informasi Transaksi Masuk</h1>
        <div class="grid grid-cols-4 gap-4 ">
            <div>
                    <div class="flex flex-col gap-1">
                        <lable class="text-md">Tanggal</lable>
                        <input v-model="date" type="date" placeholder="Input Nama Barang" class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    </div>
            </div>
                <div>
                    <div class="flex flex-col  gap-1">
                        <lable class="text-md">Deskripsi</lable>
                        <input v-model="deskripsi" type="text" placeholder="Deskripsi" class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    </div>
            </div>
        </div>
    </div>


        <div class="shadow rounded-2xl p-4 mt-4 border-1 border-gray-200">
            <h1 class="text-lg text-[#2d354f] my-2 font-semibold" >Tambah Detail Barang Transaksi Masuk</h1>
            <div class="grid grid-cols-4 gap-4 items-end">
                <div class="relative ">
                        <div class="flex flex-col  gap-1">
                            <lable class="text-md">Seleksi Barang</lable>
                            <input @click="show_barang_drop = true" @blur="blurAwait" v-model="barang" type="text" placeholder="Cari Data Barang (kode,sku,nama barang)" class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                        </div>
                        <div v-show="show_barang_drop" class="absolute bg-[#e4edff] rounded-lg w-full mt-2 py-2 overflow-y-auto h-[250px]">
                            <li v-for="item in data_barang" :key="item.id" @click="clickItemBarang(item)" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">{{ item.code_barang }} - {{ item.sku }} - {{ item.name }}</li>
                            <li v-if="data_barang.length <= 0" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">Supplier Not Found</li>
                        </div>
                </div>
                <div>
                        <div class="flex flex-col gap-1">
                            <lable class="text-md">QTY</lable>
                            <input v-model="qty" type="number" min="0" placeholder="Input Nama Barang" class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                        </div>
                </div>
                    <div>
                        <div class="flex flex-col  gap-1">
                            <lable class="text-md">Harga <span class="text-xs">(Sesuai Harga Di Master Barang)</span></lable>
                            <input disabled :value="(harga_format)" min="0" placeholder="Rp. XXXX" class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                        </div>
                </div>
                <div class="flex flex-row gap-2">
                    <button @click="addBarangDetail"  class="bg-[#2563EB] w-min no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>  
                        </div>
                        <span class="text-red">Tambah</span>
                    </button>
                    <button @click="clearDetail" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </div>
                        <span class="text-red">Bersihkan Detail</span>
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto bg-white rounded-xl shadow mt-4">
                <table class="min-w-full text-sm text-left">
                
                <!-- HEADER -->
                <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                    <th class="px-4 py-3">NO. </th>
                    <th class="px-4 py-3">Kode Barang </th>
                    <th class="px-4 py-3">Nama Barang</th>
                    <th class="px-4 py-3">SKU</th>
                    <th class="px-4 py-3">QTY</th>
                    <th class="px-4 py-3">Harga</th>
                    <th class="px-4 py-3">Subtotal</th>
                    <th class="px-4 py-3 text-center">Aksi</th>
                    </tr>
                </thead>

                <!-- BODY -->
                <tbody class="divide-y divide-gray-200">

                    <!-- ROW -->
                    <tr v-for="(item,index) in data_transaksi_detail_barang" :key="index" class="hover:bg-gray-50 transition">
                        <!-- NAMA -->
                         <td class="px-4 py-3 font-medium text-gray-800" >
                            {{ index + 1 }}
                        </td>
                        <td class="px-4 py-3 font-medium text-gray-800" >
                            {{ item.kode_barang }}
                        </td>
                        <td class="px-4 py-3 font-medium text-gray-800" >
                            {{ item.nama_barang }}
                        </td>
                        <td class="px-4 py-3 font-medium text-gray-800" >
                            {{ item.sku }}
                        </td>
                        <td class="px-4 py-3 font-medium text-gray-800" >
                            {{ item.qty }}
                        </td>
                        <td class="px-4 py-3 font-medium text-gray-800" >
                            {{ formatRupiah(item.harga) }}
                        </td>
                        <td class="px-4 py-3 font-medium text-gray-800" >
                            {{ formatRupiah(item.qty*item.harga) }}
                        </td>
                        <td>
                            <button @click="removeBarangDetail(index)" class="bg-[#f35757] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#ff5c5c] focus:border-b-1 text-white cursor-pointer">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <span class="text-red">Hapus</span>
                            </button>
                        </td>
                    </tr>

                </tbody>
                </table>
            </div>

            <div class="flex flex-row-reverse my-4">
                <div class="bg-gray-100 rounded-xl px-4 py-3"><h3 class="font-semibold text-gray-700">Total Harga  {{formatRupiah(total_harga_detail_barang)}}</h3></div>
            </div>
        </div>

    <button @click.prevent="saveTransaksiKeluar" class="bg-[#2563EB] mt-4 no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
        <span class="text-red">Simpan Transaksi Keluar</span>
    </button>
</template>