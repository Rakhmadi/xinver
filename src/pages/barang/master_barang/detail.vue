<script setup>
import { onMounted,ref,nextTick } from 'vue';
import { barangStore } from '../../../model_state/barang.js'
import { useRoute, useRouter } from 'vue-router'
import { formatRupiah } from '../../../helper_function.js'
import Tutut from 'tutut';
import { open } from '@tauri-apps/plugin-dialog';
import { appDataDir } from '@tauri-apps/api/path';
import { VueImageZoomer } from 'vue-image-zoomer'
import { convertFileSrc } from '@tauri-apps/api/core';
import { writeFile, mkdir, BaseDirectory ,remove} from '@tauri-apps/plugin-fs'
import {storeToRefs} from 'pinia'
import ImgNotFound from '../../../assets/imge-not-found.png'
// when using `"withGlobalTauri": true`, you may use
// const { open } = window.__TAURI__.dialog;

// Open a dialog

const route = useRoute()
const router = useRouter()

let data_barang = barangStore()
const { data_image_product } = storeToRefs(data_barang)

let app_dir_path = ref("");

let data_image_selection = ref({})

let show_modal_image = ref(false)

let file = ref([])

let description_image = ref('')

let loading_image = ref(false)

let dataImageSelection = (data)=>{
  data_image_selection.value = data
  show_modal_image.value = true
}


onMounted(async ()=>{
  data_barang.getSingleDataBarang(Number(route.params.id))
  data_barang.getDataImage(Number(route.params.id))
  
  const appDataDirPath = await appDataDir();
  app_dir_path.value = appDataDirPath

})

let deleteBarang = ()=>{
    Tutut.danger({
	    title : "Hapus Data?",
	    text : "Data yang sudah dihapus tidak dapat dikembalikan lagi. Apakah Anda yakin ingin melanjutkan?"
    },{
        showConfirm : true,
        onConfirm : ()=>{ alert("Confirm Success") },
        onCancel : ()=>{ alert("Cancel Success") }
      })
}


let closeParentModal = (event)=>{
  if(event.target === event.currentTarget){
    show_modal_image.value = false
  }
}

let fileChanges = async(event)=>{
  file.value = event.target.files
  console.log(file.value);
  
}
let saveImages = async()=>{
  
  if(file.value.length >= 1){
    loading_image.value = true
    try{
      let first_file = file.value[0] 
      let file_ext = first_file.name.split('.').pop()
          // nama file baru
      const fileName = `image_${Date.now()}.${file_ext}`

      // convert file ke Uint8Array
      const arrayBuffer = await first_file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)

      // buat folder images jika belum ada
      await mkdir('media', {
        baseDir: BaseDirectory.AppData,
        recursive: true
      })

      // simpan file ke AppData/images
      await writeFile(`media/${fileName}`, uint8Array, {
        baseDir: BaseDirectory.AppData
      })

      let exec_insert_galery_to_database = data_barang.addDataImage(Number(route.params.id),fileName,description_image.value)

      if(exec_insert_galery_to_database){

        loading_image.value = false

        Tutut.success({
            title : "Pesan",
            text : "Detail Gambar Barang Berhasil Ditambahkan."
        })

        setTimeout(async()=>{
          await nextTick()
          data_barang.getDataImage(Number(route.params.id))
        },200)

        description_image.value = ''
        
      }else{
        Tutut.info({
            title : "System Database",
            text : "Gagal Menambahkan Gambar Barang Ke Database"
        })
        loading_image.value = false
      }
      
    }catch (error){
      console.log(error);
      loading_image.value = false
    }
  }else{
    console.log("err");
    loading_image.value = false
  }

}

let DeleteDataImage = async()=>{
      
      Tutut.danger({
	      title : "Hapus Gambar?",
	      text : "Data gambar yang sudah dihapus tidak dapat dikembalikan lagi. Apakah Anda yakin ingin melanjutkan?"
      },{
        showConfirm : true,
        onConfirm : async()=>{

          loading_image.value = true

          let exec_data_image = await data_barang.deleteDataImage(data_image_selection.value.id) 
          
          if(exec_data_image){
            try {
              await remove(`media\\${data_image_selection.value.name_file}`, { baseDir: BaseDirectory.AppData });
            } catch (error) {
              console.log(error); 
            }
          }else{
            Tutut.info({
                title : "System Database",
                text : "Gagal Menghapus gambar"
            })
          }

          show_modal_image.value = false

          Tutut.success({
              title : "Pesan",
              text : "Detail Gambar Barang Berhasil Dihapus."
          })

         setTimeout(async()=>{
           await nextTick()
           data_barang.getDataImage(Number(route.params.id))
         },200)

         loading_image.value = false
        },
      })

}

let deleteDataBarang = async()=>{
    
    Tutut.danger({
	    title : "Hapus Data?",
	    text : "Data yang sudah dihapus tidak dapat dikembalikan lagi. Apakah Anda yakin ingin melanjutkan?"
    },{
        showConfirm : true,
        onConfirm : async()=>{ 
          
          let exec_0 = await data_barang.deleteDataBarang(Number(data_barang.single_data_barang.id))
          if(exec_0){
            
            router.push({
                name : 'master_barang',
            })

            Tutut.info({
                title : "Pesan",
                text : "Data Barang Berhasil Dihapus."
            }) 

          }else{
            Tutut.info({
                title : "Database System",
                text : "Data Barang Gagal Dihapus."
            }) 
          }

         }
      })
    
}
let onErrorImage = (event)=>{
  event.onerror = null
  event.target.src = ImgNotFound
}
</script>

<template>
<div class="">
  <div class=" mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

    <!-- Header -->
    <div class="bg-[#d9ddeb] px-6 py-5">
      <h1 class="text-xl font-bold text-[#2d354f]">
        Detail Barang "{{ data_barang.single_data_barang.code_barang }}" Dengan SKU "{{ data_barang.single_data_barang.sku }}"
      </h1>
      <p class="text-[#2d354f] text-sm">
        Informasi lengkap data barang inventory
      </p>
    </div>

    <!-- Content -->
    <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-[40%]">

      <!-- Left Side -->
      <div class="space-y-2">

        <div>
          <label class="text-sm text-gray-500">Kode Barang</label>
          <p class="font-semibold text-gray-800">{{ data_barang.single_data_barang.code_barang }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Nama Product</label>
          <p class="font-semibold text-gray-800">{{ data_barang.single_data_barang.name }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">SKU</label>
          <p class="font-semibold text-gray-800">{{ data_barang.single_data_barang.sku }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Kategori</label>
          <p class="font-semibold text-gray-800">{{ data_barang.single_data_barang.category_name }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Merek</label>
          <p class="font-semibold text-gray-800">{{ data_barang.single_data_barang.merek_name }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Lokasi</label>
          <p class="font-semibold text-gray-800"> {{ data_barang.single_data_barang.location_code }}  - {{ data_barang.single_data_barang.location_name }}</p>
        </div>

      </div>

      <!-- Right Side -->
      <div class="space-y-2">

        <div>
          <label class="text-sm text-gray-500">Stock</label>
          <p class="font-semibold text-gray-800">{{ data_barang.single_data_barang.stock }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Harga</label>
          <p class="font-semibold text-gray-800">{{ formatRupiah(data_barang.single_data_barang.price) }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Tanggal Dibuat</label>
          <p class="font-semibold text-gray-800">{{ data_barang.single_data_barang.created_at }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Terakhir Update</label>
          <p class="font-semibold text-gray-800">{{ data_barang.single_data_barang.updated_at }}</p>
        </div>
      </div>
    </div>
    <hr class="border-t border-gray-300 my-4">
    <div class="px-6">
      <h1 class="text-xl font-bold text-[#2d354f]"> Diskripsi Detail Barang </h1>
    </div>
    <div class="px-6 py-5" v-html="data_barang.single_data_barang.description"></div>
    <hr class="border-t border-gray-300 my-4">
    <div class="px-6 py-5">
      <div class="flex flex-row justify-between pb-6">
        <h1 class="text-xl font-bold text-[#2d354f]">List Gambar Barang Detail</h1>

      </div>
      <div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="relative group overflow-hidden rounded-xl cursor-pointer" v-for="item in data_image_product" :key="item.id" >
              
              <img @error="onErrorImage"
                :src="convertFileSrc(`${app_dir_path}/media/${item.name_file}`)"
                :alt="item.description"
                class="w-full h-64 object-cover"
              >
              <div @click="dataImageSelection(item)" class="absolute inset-0 bg-gray-800/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span class="text-white text-lg font-semibold">
                  Klik Untuk Detail
                </span>
              </div>
            </div>
          </div>
      </div>
      <div class="flex flex-row justify-between mt-2"><h1 class="text-xl font-bold text-[#2d354f]">Tambah Gambar</h1></div>
      <div class="my-4 flex flex-row gap-2">
        <input @change="fileChanges" accept="image/*" type="file" placeholder="" class="w-[300px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
        <input v-model="description_image" type="text" placeholder="Diskripsi" class="w-[300px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
        <button :disabled="loading_image" @click="saveImages" href="/" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            <span class="text-red">Tambah Foto Barang</span>
        </button>
            <div class="flex flex-row gap-2 items-center" v-show="loading_image">
                <div class="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading</span>
            </div>
      </div>
    </div>
    <!-- Footer -->
     
    <div class="bg-gray-50 px-6 py-4 flex justify-end gap-2">
     <router-link to="/barang" class="bg-[#2563EB] no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
          <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
          </div>
          <span class="text-red">Kembali</span>
      </router-link>
      <router-link :to="`/barang/edit_barang/${data_barang.single_data_barang.id}`" class="bg-[#2563EB] no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
          <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
          </div>
          <span class="text-red">Edit</span>
      </router-link>
      <button @click="deleteDataBarang" class="bg-[#f35757] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#ff5c5c] focus:border-b-1 text-white cursor-pointer">
          <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
          </div>
          <span class="text-red">Delete Barang</span>
      </button>
    </div>

  </div>
</div>

<div v-show="show_modal_image" class="fixed inset-0 bg-[#2f2f3386] z-50 flex items-center justify-center" @click="closeParentModal">
  <div class=" bg-white rounded-xl p-4 flex flex-col w-[600px]" >
    <div class="w-full h-full flex flex-col gap-3">
      <div class="flex flex-row justify-between items-center">
        <div><h1 class="text-xl font-bold text-[#2d354f]">Detail Gambar Barang</h1></div>
        <div @click="show_modal_image = !show_modal_image" class="close p-2 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="rounded-lg w-full flex items-center justify-center">
        <vue-image-zoomer 
        :regular="convertFileSrc(`${app_dir_path}/media/${data_image_selection.name_file}`)"
        class="w-full h-full"
        img-class="h-[600px] object-cover"/>
      
      </div>
      <div class="flex flex-col gap-2">
          <h1 class="text-xl font-bold text-[#2d354f]">Deskiripsi</h1>
          <div class="">
            {{data_image_selection.description}}
          </div>
          <div class="flex flex-row-reverse">
              <button @click="DeleteDataImage" class="bg-[#f35757] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#ff5c5c] focus:border-b-1 text-white cursor-pointer">
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                  </div>
                  <span class="text-red">Hapus Gambar</span>
              </button>
          </div>
      </div>
    </div>
  </div>
</div>
</template>