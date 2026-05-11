<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { supllierStore } from '../../model_state/supplier.js'
import Tutut from 'tutut';

let supplier_store = supllierStore()

let modal_input_supplier = ref(false)
let modal_update_supplier = ref(false)

let singile_data_supplier = ref({})

 let name = ref('')
 let email = ref('')
 let no_phone = ref('')
 let alamat = ref('')

let name_update = ref('')
let email_update = ref('')
let no_phone_update = ref('')
let alamat_update = ref('')

let search = ref('')
let order_by = ref('tb_supplier.id')
let order_by_desc = ref('')

watch([search,order_by,order_by_desc],()=>{
  supplier_store.gatDataSuplier(search.value,order_by_desc.value,order_by.value)
})


let closeParentModal = (event)=>{
  if(event.target === event.currentTarget){
    modal_input_supplier.value = false
    modal_update_supplier.value = false
  }
}


onMounted(()=>{
  supplier_store.gatDataSuplier()

})

let addSuplier = async()=>{
  if(name.value === ''){
    Tutut.info({
      title : 'Pesan',
      text : 'Nama Harus Di Isi'
    })
  }else if(email.value === '' || !email.value.includes('@')){
    Tutut.info({
      title : 'Pesan',
      text : 'Email Harus Vailid'
    })
  }else if(no_phone.value === '' || no_phone.value.length < 7){
    Tutut.info({
      title : 'Pesan',
      text : 'No Phone Di Isi dan lebih dari 7 angka'
    })
  }else if(alamat.value === ''){
    Tutut.info({
      title : 'Pesan',
      text : 'Alamat harus Di Isi'
    })
  }else{
    let exec_0 = await supplier_store.addSupplier(name.value,email.value,no_phone.value,alamat.value)
    if (exec_0) {
          modal_input_supplier.value = false
          Tutut.success({
                title : 'Pesan',
                text : 'Suplier Berhasil Ditambahkan'
          })
          supplier_store.gatDataSuplier()

    }else{
            Tutut.warning({
                title : 'System Database',
                text : 'Data Tidak Berhasil Ditambah'
            })
    }
  }
}

let showEditModal = (item)=>{
  singile_data_supplier.value = item
  name_update.value = item.name
  email_update.value = item.email
  no_phone_update.value = item.no_phone
  alamat_update.value = item.address
  modal_update_supplier.value = true  
}

let updateSupplier = async()=>{
  let exec_0 = await supplier_store.updateSupplier(name_update.value,email_update.value,no_phone_update.value,alamat_update.value,singile_data_supplier.value.id)
  if(exec_0){
      Tutut.success({
            title : 'Pesan',
            text : 'Suplier Berhasil Diupdate'
      })
      modal_update_supplier.value = false
      supplier_store.gatDataSuplier()
  }else{
      Tutut.warning({
          title : 'System Database',
          text : 'Data Tidak Berhasil Diupdate'
      })
  }
}

let deleteSupplierCLikc = async(id)=>{
  Tutut.danger({
    title : "Hapus Data ?",
    text : "Data yang sudah dihapus tidak dapat dikembalikan lagi. Apakah Anda yakin ingin melanjutkan?"
  },{
    showConfirm : true,
    onConfirm :async ()=>{
        let exec_0 = await supplier_store.checkSupplier(id)
        if(exec_0){
          let exec_1 = await supplier_store.deleteSuplier(id)
          if(exec_1){
            supplier_store.gatDataSuplier()
            Tutut.success({
                title : 'Pesan',
                text : 'Supplier Berhasil Dihapus'
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
                text : "Supllier Sedang Di Gunakan Dalam Data Transaksi"
            })
        }
    }
  })
  
}

</script>


<template>

    <h1 class="mb-4">List Data Supplier</h1>
    <div class="flex flex-row justify-between mb-4">
        <div class="flex felx-row gap-2 items-center w-full justify-between">
            <div class="flex flex-row items-center gap-2">
                <input  v-model="search" type="text" placeholder="Cari Nama atau Email" class="w-[300px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <select v-model="order_by" class="w-[300px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                    <option value="tb_supplier.id" selected>Select</option>
                    <option value="tb_supplier.name">Urutkan Nama</option>
                    <option value="tb_supplier.email">Urutkan Email</option>
                    <option value="total_transaksi_masuk">Urutkan Total Transaksi Masuk</option>
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
            <button @click="modal_input_supplier = !modal_input_supplier" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
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
            <!-- HEADER -->
            <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  
                    <th class="px-4 py-3">Nama</th>
                    <th class="px-4 py-3">Email</th>
                    <th class="px-4 py-3">Nomor Phone</th>
                    <th class="px-4 py-3">Alamat</th>
                    <th class="px-4 py-3">Total Transaksi</th>
                    <th class="px-4 py-3 text-center">Aksi</th>
                </tr>
            </thead>
            <!-- BODY -->
            <tbody class="divide-y divide-gray-200">
                <!-- ROW -->
                <tr v-for="(item) in supplier_store.data_supplier" :key="item.id" class="hover:bg-gray-50 transition">
                    <td class="px-4 py-3 text-gray-600">{{ item.name }}</td>
                    <td class="px-4 py-3 text-gray-600">{{ item.email }}</td>
                    <td class="px-4 py-3 text-gray-600">{{ item.no_phone }}</td>
                    <td class="px-4 py-3 text-gray-600">{{ item.address }}</td>
                    <td class="px-4 py-3 text-gray-600">{{ item.total_transaksi_masuk }}</td>
                    <td class="px-4 py-3 text-center flex flex-row-reverse gap-2">
                        <button @click="deleteSupplierCLikc(item.id)" href="/" class="bg-[#f35757] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#ff5c5c] focus:border-b-1 text-white cursor-pointer">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                            <span class="text-red">Delete</span>
                        </button>
                        <button @click="showEditModal(item)" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
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

<div v-show="modal_input_supplier" class="fixed inset-0 bg-[#2f2f3386] z-50 flex items-center justify-center" @click="closeParentModal">
  <div class=" bg-white rounded-xl p-4 flex flex-col w-[600px]" >
    <div class="w-full h-full flex flex-col gap-3">
      <div class="flex flex-row justify-between items-center">
        <div><h1 class="text-xl font-semibold text-[#2d354f]">Tambah Supplier</h1></div>
        <div @click="modal_input_supplier = !modal_input_supplier" class="close p-2 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="rounded-lg w-full flex items-center justify-center">
        <div class="flex flex-col gap-2 items-start w-full">
            <div class="flex flex-col w-full">
                <label>Nama</label>
                <input v-model="name" type="text" placeholder="Masukan Nama" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            </div>
            
            <div class="flex flex-col w-full">
                <label>Email</label>
                <input v-model="email" type="text" placeholder="example@domain.com" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            </div>
            <div class="flex flex-col w-full">
                <label>Nomor Phone</label>
                <input v-model="no_phone" type="tel"  pattern="[0-9]{10,13}"  placeholder="089XXXXXX" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            </div>
            <div class="flex flex-col w-full">
                <label>Alamat</label>
                <input v-model="alamat" type="text" placeholder="Alamat Jl. ..........." class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            </div>
            <div class="flex flex-row gap-2 items-center">
                <button @click="addSuplier()" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
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

<div v-show="modal_update_supplier" class="fixed inset-0 bg-[#2f2f3386] z-50 flex items-center justify-center" @click="closeParentModal">
  <div class=" bg-white rounded-xl p-4 flex flex-col w-[600px]" >
    <div class="w-full h-full flex flex-col gap-3">
      <div class="flex flex-row justify-between items-center">
        <div><h1 class="text-xl font-semibold text-[#2d354f]">Update Supplier "{{ singile_data_supplier.name }}"</h1></div>
        <div @click="modal_update_supplier = !modal_update_supplier" class="close p-2 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="rounded-lg w-full flex items-center justify-center">
        <div class="flex flex-col gap-2 items-start w-full">
            <div class="flex flex-col w-full">
                <label>Nama</label>
                <input v-model="name_update" type="text" placeholder="Masukan Nama" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            </div>
            
            <div class="flex flex-col w-full">
                <label>Email</label>
                <input v-model="email_update" type="text" placeholder="example@domain.com" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            </div>
            <div class="flex flex-col w-full">
                <label>Nomor Phone</label>
                <input v-model="no_phone_update" type="tel"  pattern="[0-9]{10,13}"  placeholder="089XXXXXX" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            </div>
            <div class="flex flex-col w-full">
                <label>Alamat</label>
                <input v-model="alamat_update" type="text" placeholder="Alamat Jl. ..........." class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            </div>
            <div class="flex flex-row gap-2 items-center">
                <button @click="updateSupplier()" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                    <span class="text-red">Update</span>
                </button>
                <div class="flex flex-row gap-2 items-center" v-show="supplier_store.loading">
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