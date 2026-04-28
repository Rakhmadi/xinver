<script setup>
import { onMounted, ref } from 'vue';
import { barangStore } from '../../../model_state/barang.js'
import { useRouter } from 'vue-router';
import Tutut from 'tutut';
let router = useRouter()

let data_barang = barangStore()

onMounted(()=>{
    data_barang.getDataKategori()
    data_barang.getDataMerek()
    data_barang.getDataLocation()
})

let description = ref(``)
let name = ref('');
let SKU = ref('')
let category_id = ref('none')
let merek_id = ref('none')
let location_id = ref('none')
let jenis_unit = ref('')
let stock_awal = ref(0)
let harga = ref(0)
let sku_available = ref([])

let msg_sku_exist = ref(false)

let msg_input = ref(false)
let msg_isi = ref('')

let checkSKUInputBrang = async()=>{
    sku_available.value = await data_barang.checkSKUbarang(SKU.value) 
    console.log(sku_available.value);
    
    if(sku_available.value.length >= 1){
        msg_sku_exist.value = true
    }else{
        msg_sku_exist.value = false
    }
}

let save = async()=>{
    if(name.value.length <= 5){
        msg_input.value = true
        msg_isi.value = 'Nama Barang Harus Lebih Dari 5' 
    }else if(sku_available.value.length >= 1){
        msg_input.value = true
        msg_isi.value = 'NO SKU sudah di pakai' 
    }else if(SKU.value === ""){
        msg_input.value = true
        msg_isi.value = 'SKU tidak boleh kosong' 
    }else if(jenis_unit.value === ""){
        msg_input.value = true
        msg_isi.value = 'Jenis tidak boleh kosong'
    }else if(category_id.value === "none"){
        msg_input.value = true
        msg_isi.value = 'Kategori harus di isi'
    }else if(merek_id.value === "none"){
        msg_input.value = true
        msg_isi.value = 'Merek harus di isi'
    }else if(location_id.value === "none"){
        msg_input.value = true
        msg_isi.value = 'Lokasi harus di isi'
    }else{

        
        let exec_data_barang = await data_barang.addDataBarang(name.value,SKU.value,category_id.value,merek_id.value,location_id.value,description.value,jenis_unit.value,stock_awal.value,harga.value)

        if(exec_data_barang){
            router.push({
                name : 'master_barang',
            })

            Tutut.info({
                title : "Pesan",
                text : "Data Barang Berhasil Ditambahkan."
            }) 
        }else{
            Tutut.info({
                title : "System Database",
                text : "Data Tidak Berhasil Di Tambahkan."
            }) 
        }

    }
}




</script>
<template>
    <h1 class="text-xl text-[#2d354f] font-semibold mb-4">Tambah Barang</h1>
    <div v-show="msg_input" class="flex flex-row w-full h-auto bg-yellow-50 text-yellow-800 rounded-xl p-4 border border-yellow-200">
        <div class="flex flex-row justify-between w-full items-center">
            <div class="flex flex-row items-center gap-4">
                <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="">{{ msg_isi }}</div>
            </div>
            <div class="close cursor-pointer" @click="msg_input = !msg_input">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    </div>
    <form>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
                <div class="flex flex-col">
                    <lable class="font-medium text-md">Nama Barang</lable>
                    <input v-model="name" required type="text" placeholder="Input Nama Barang" class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                </div>
          </div>
          <div>
                <div class="flex flex-col">
                    <lable class="font-medium text-md">SKU (Stock Keeping Unit)</lable>
                    <input v-model="SKU" @input="checkSKUInputBrang" type="text" placeholder="Input SKU" class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    <span class="text-sm text-red-400" v-show="msg_sku_exist">NO SKU sudah di pakai</span>
                </div>
          </div>
          <div>
                <div class="flex flex-col">
                    <lable class="font-medium text-md">Jenis Unit</lable>
                    <input v-model="jenis_unit" type="text" placeholder="Psc,Unit,Box dll..." class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                </div>
          </div>
          <div>
                <div class="flex flex-col">
                    <lable class="font-medium text-md">Stok Awal Barang</lable>
                    <input v-model="stock_awal" required type="number" placeholder="0" class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                </div>
          </div>
          <div>
                <div class="flex flex-col">
                    <lable class="font-medium text-md">Harga Barang</lable>
                    <input v-model="harga" type="number" placeholder="0" class=" px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                </div>
          </div>
          <div>
                <div class="flex flex-col">
                    <lable class="font-medium text-md">Kategori</lable>
                    <select v-model="category_id" required class="px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                        <option default value="none">Select</option>
                        <option v-for="item in data_barang.data_category" :key="item" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
          </div>
          <div>
                <div class="flex flex-col">
                    <lable class="font-medium text-md">Merek</lable>
                    <select v-model="merek_id" required class="px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                        <option default value="none">Select</option>
                        <option v-for="item in data_barang.data_merek" :key="item" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
          </div>
          <div>
                <div class="flex flex-col">
                    <lable class="font-medium text-md">Lokasi Barang</lable>
                    <select v-model="location_id" required class="px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                        <option default value="none">Select</option>
                        <option v-for="item in data_barang.data_location" :key="item" :value="item.id">{{item.code}} - {{ item.name }}</option>
                    </select>
                </div>
          </div>
        </div>
        <div class="mt-6">
            <lable class="font-medium text-md mt">Deskripsi</lable>
            <QuillEditor
                v-model:content="description"
                contentType="html"
                theme="snow"
                toolbar="full"
                class="bg-white border-1 border-gray-200 h-[400px]  px-2 py-1 text-md bg-[#e4edff] border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
        </div>
        <button @click.prevent="save" class="bg-[#2563EB] mt-6 no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            <span class="text-red">Tambah</span>
        </button>
    </form>

    
</template>