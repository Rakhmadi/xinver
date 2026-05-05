
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { barangStore } from '../../../model_state/barang.js'
import Tutut from 'tutut';

let data_barang = barangStore()

let show_modal_tambah = ref(false) 
let show_modal_update = ref(false)

let code = ref('')
let name = ref('')
let description = ref('')

let code_update = ref('')
let name_update = ref('')
let description_update = ref('')

let loading = ref(false)

let single_data_location = ref({})

let order_by_desc = ref(true)

let order_by = ref('tb_location.id')

onMounted(()=>{
    data_barang.getDataLocation(false)
})

let addLokasi = async()=>{
    if(code.value.length >= 1 && name.value.length > 3){
        loading.value = true
        let exec_0 = await data_barang.addDataLocation(code.value,name.value,description.value)
        if(exec_0){

            Tutut.success({
                title : 'Pesan',
                text : 'Lokasi Berhasil Ditambahkan'
            })

            data_barang.getDataLocation(false)

            code.value = ''
            name.value = ''
            description.value = ''
            show_modal_tambah.value = false
            loading.value = false

        }else{
            
            Tutut.warning({
                  title : 'System Database',
                  text : 'Data Tidak Berhasil Ditambah'
            })

            show_modal_tambah.value = false
            loading.value = false
        }
    }else{
          Tutut.warning({
                title : 'Pesan',
                text : 'Kode harus lebih dari 1 dan nama harus lebih dari 3'
          })
          loading.value = false

    }
}

let showUpdateLocation = (data)=>{
    single_data_location.value = data
    show_modal_update.value = true
    code_update.value = data.code
    name_update.value = data.name
    description_update .value = data.description
    show_modal_update.value = true
}

let udpateDataLocation = async()=>{
    loading.value = true
    let exec_0 = await data_barang.updateDataLocation(code_update.value,name_update.value,description_update.value,single_data_location.value.id)
    if(exec_0){

        Tutut.success({
            title : 'Pesan',
            text : 'Lokasi Berhasil Diupdate'
        })

        data_barang.getDataLocation(false)

        show_modal_update.value = false
        loading.value = false
    }else{
        Tutut.warning({
            title : 'System Database',
            text : 'Data Tidak Berhasil Ditambah'
        })

        loading.value = false
    }
}

let deleteDataLocation = async(id)=>{
    Tutut.danger({
        title : "Hapus Data ?",
        text : "Data Merek yang sudah dihapus tidak dapat dikembalikan lagi. Apakah Anda yakin ingin melanjutkan?"
    },{
        showConfirm : true,
        onConfirm : async()=>{
            let exec_0 =await data_barang.checkLocationInProducts(id)
            if(exec_0){
                    let exec_1 = await data_barang.deleteDataLocation(id)
                    if(exec_1){
                        data_barang.getDataLocation(false)
                        Tutut.success({
                            title : 'Pesan',
                            text : 'Location Berhasil Dihapus'
                        })
                    }else{
                        Tutut.warning({
                            title : 'System Database',
                            text : 'Data Tidak Berhasil Dihapus'
                        })
                    }
            }else{
                Tutut.info({
                    title : "Pesan",
                    text : "Lokasi Sedang Di Gunakan Dalam Data Barang"
                })
            }
        }
    })
}

let closeParentModal = (event)=>{
  if(event.target === event.currentTarget){
    show_modal_tambah.value = false
    show_modal_update.value = false
  }
}

watch([order_by,order_by_desc],()=>{
    data_barang.getDataLocation(false,order_by_desc.value,order_by.value)
})

</script>
<template>
    <h1 class="text-xl font-semibold text-[#2d354f] mb-4">List Data Lokasi</h1>
    <div class="flex flex-row justify-between mb-4">
        <div class="flex felx-row gap-2 items-center w-full justify-between">
            <div class="flex flex-row items-center gap-2">
                <select v-model="order_by" class="w-[300px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    <option value="tb_location.id" selected>Select</option>
                    <option value="product_count">Urut Total Jenis Barang</option>
                    <option value="sum_stock">Urut Total Stock Barang</option>
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
            </div>
            <button @click="show_modal_tambah = !show_modal_tambah" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
                <span class="text-red">Tambah</span>
            </button>
        </div>
    </div>

    <div class="overflow-x-auto bg-white rounded-xl shadow">
        <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                    <th class="px-4 py-3">kode Lokasi</th>
                    <th class="px-4 py-3">Nama Lokasi</th>
                    <th class="px-4 py-3">Deskripsi</th>
                    <th class="px-4 py-3">Total Jenis Barang</th>
                    <th class="px-4 py-3">Total Stock Barang</th>
                    <th class="px-4 py-3 text-center">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-for="item in data_barang.data_location" :key="item.id" class="hover:bg-gray-50 transition">
                    <td class="px-4 py-3 font-medium text-gray-800"> {{ item.code }} </td>
                    <td class="px-4 py-3 text-gray-600"> {{ item.name }} </td>
                    <td class="px-4 py-3 text-gray-600"> {{ item.description }} </td>
                    <td class="px-4 py-3 text-gray-600"> {{ item.product_count }} </td>
                    <td class="px-4 py-3 text-gray-600"> {{ item.sum_stock }} </td>
                    <td class="px-4 py-3 text-center flex flex-row-reverse gap-2">
                        <button @click=deleteDataLocation(item.id) class="bg-[#f35757] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#ff5c5c] focus:border-b-1 text-white cursor-pointer">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                            <span class="text-red">Delete</span>
                        </button>
                        <button @click="showUpdateLocation(item)" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                </svg>
                            </div>
                            <span class="text-red">Edit</span>
                        </button>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

    <div v-show="show_modal_tambah" class="fixed inset-0 bg-[#2f2f3386] z-50 flex items-center justify-center" @click="closeParentModal">
        <div class=" bg-white rounded-xl p-4 flex flex-col w-[600px]" >
            <div class="w-full h-full flex flex-col gap-3">
            <div class="flex flex-row justify-between items-center">
                <div><h1 class="text-xl font-semibold text-[#2d354f]">Tambah Lokasi</h1></div>
                <div @click="show_modal_tambah = !show_modal_tambah" class="close p-2 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </div>
            </div>
            <div class="rounded-lg w-full flex items-center justify-center">
                <div class="flex flex-col gap-2 items-start w-full">
                    <div class="flex flex-col w-full">
                        <label>Nama Kode</label>
                        <input v-model="code" type="text" placeholder="Masukan Kode Lokasi" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    </div>
                    <div class="flex flex-col w-full">
                        <label>Nama Lokasi</label>
                        <input v-model="name" type="text" placeholder="Masukan Nama Merek" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    </div>
                    <div class="flex flex-col w-full">
                        <label>Deskripsi</label>
                        <input v-model="description" type="text" placeholder="Diskripsi" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    </div>
                    <div class="flex flex-row gap-2 items-center">
                        <button @click="addLokasi" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                            <span class="text-red">Tambah</span>
                        </button>
                        <div class="flex flex-row gap-2 items-center" v-show="loading">
                            <div class="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading ....</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>

    <div v-show="show_modal_update" class="fixed inset-0 bg-[#2f2f3386] z-50 flex items-center justify-center" @click="closeParentModal">
    <div class=" bg-white rounded-xl p-4 flex flex-col w-[600px]" >
        <div class="w-full h-full flex flex-col gap-3">
        <div class="flex flex-row justify-between items-center">
            <div><h1 class="text-xl font-semibold text-[#2d354f]">Update Location "{{ single_data_location.name }}"</h1></div>
            <div @click="show_modal_update = !show_modal_update" class="close p-2 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </div>
        </div>
        <div class="rounded-lg w-full flex items-center justify-center">
            <div class="flex flex-col gap-2 items-start w-full">
                <div class="flex flex-col w-full">
                    <label>Nama Kode</label>
                    <input v-model="code_update" type="text" placeholder="Masukan Kode Lokasi" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                </div>
                <div class="flex flex-col w-full">
                    <label>Nama Location</label>
                    <input v-model="name_update" type="text" placeholder="Masukan Nama Merek" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                </div>
                
                <div class="flex flex-col w-full">
                    <label>Deskripsi</label>
                    <input v-model="description_update" type="text" placeholder="Diskripsi" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                </div>
                <div class="flex flex-row gap-2 items-center">
                    <button :disabled="loading" @click="udpateDataLocation" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"></path></svg>
                        </div>
                        <span class="text-red">Update</span>
                    </button>
                    <div class="flex flex-row gap-2 items-center" v-show="loading">
                        <div class="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading ....</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>

</template>