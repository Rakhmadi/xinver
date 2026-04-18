<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const data_kategori = ref([
  { id: 1, name: 'Elektronik' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Smartphone' }
])

onMounted(()=>{
    filtered.value = data_kategori.value
})


let show_kategori = ref(false)
let kategori = ref();
let kategori_id = ref()
let order_by_desc = ref(true)
let filtered = ref([])


watch(kategori,(value)=>{
    filtered.value = data_kategori.value.filter(x=>{
         return x.name.toLowerCase().includes(value?.toLowerCase())
    })
},{immediate:true})

let selectKategori = (name_select,id)=>{
    kategori.value = name_select
    kategori_id.value = id
    show_kategori.value = false
}

let blurAwait = ()=>{
    setTimeout(()=>{
        show_kategori.value = false
    },100)
}
</script>
<template>
    <h1 class="text-xl text-[#2d354f] font-semibold mb-4">Master Barang</h1>
    <div class="flex justify-between  mb-4">
        <div class=" gap-2 flex flex-row w-[50%] items-center grow">
            <input type="text" placeholder="Cari Kode - Nama - SKU" class="w-[300px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            <div class="relative">
                <input type="text" v-model="kategori" placeholder="Kategori" @focus="show_kategori = true" @blur="blurAwait" class="w-[200px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <div v-show="show_kategori" class="absolute bg-[#e4edff] rounded-lg w-full mt-2 py-2 overflow-y-auto h-[250px]">
                    <li v-for="item in filtered" @click="selectKategori(item.name,item.id)" :key="item" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">{{ item.name }}</li>   
                    <li v-if="filtered.length === 0" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">Data tidak di temukan</li>
                </div>
            </div>
            <div class="relative">
                <input type="text" v-model="kategori" placeholder="Merek" @focus="show_kategori = true" @blur="blurAwait" class="w-[200px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <div v-show="show_kategori" class="absolute bg-[#e4edff] rounded-lg w-full mt-2 py-2 overflow-y-auto h-[250px]">
                    <li  v-for="item in filtered" @click="selectKategori(item.name,item.id)" :key="item" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">{{ item.name }}</li>   
                    <li v-if="filtered.length === 0" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">Data tidak di temukan</li>
                </div>
            </div>
            <div class="relative">
                <input type="text" v-model="kategori" placeholder="Location" @focus="show_kategori = true" @blur="blurAwait" class="w-[200px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <div v-show="show_kategori" class="absolute bg-[#e4edff] rounded-lg w-full mt-2 py-2 overflow-y-auto h-[250px]">
                    <li  v-for="item in filtered" @click="selectKategori(item.name,item.id)" :key="item" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">{{ item.name }}</li>   
                    <li v-if="filtered.length === 0" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">Data tidak di temukan</li>
                </div>
            </div>
            <select class="w-[200px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <option value="">Order</option>
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
            <button class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
                <span class="text-red">Clear</span>
            </button>
            <div>
            </div>
        </div>
        <button href="/" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            <span class="text-red">Tambah</span>
        </button>
    </div>
    <div class="overflow-x-auto bg-white rounded-xl shadow">
        <table class="min-w-full text-sm text-left">
            <!-- HEADER -->
            <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                    <th class="px-4 py-3">Nama Barang</th>
                    <th class="px-4 py-3">SKU</th>
                    <th class="px-4 py-3">Stok</th>
                    <th class="px-4 py-3">Harga</th>
                    <th class="px-4 py-3 text-center">Aksi</th>
                </tr>
            </thead>
            <!-- BODY -->
            <tbody class="divide-y">
                <!-- ROW -->
                <tr class="hover:bg-gray-50 transition">
                    <!-- NAMA -->
                    <td class="px-4 py-3 font-medium text-gray-800"> Laptop ASUS </td>
                    <!-- SKU -->
                    <td class="px-4 py-3 text-gray-600"> LAP-001 </td>
                    <!-- STOK -->
                    <td class="px-4 py-3"><span class="px-2 py-1 text-xs rounded bg-green-100 text-green-700"> 10 </span></td>
                    <!-- HARGA -->
                    <td class="px-4 py-3 text-gray-700"> Rp 8.000.000 </td>
                    <!-- AKSI -->
                    <td class="px-4 py-3 text-center flex flex-row-reverse gap-2">
                        <button href="/" class="bg-[#f35757] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#ff5c5c] focus:border-b-1 text-white cursor-pointer">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                            <span class="text-red">Delete</span>
                        </button>
                        <button href="/" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                </svg>
                            </div>
                            <span class="text-red">Edit</span>
                        </button>
                        <button href="/" class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                            <span class="text-red">Detail</span>
                        </button>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>
    <div class="mt-4 text-[#2d354f] text-sm">
        <span>Halaman 1 hingga 20 dari 100 Entri</span>
    </div>
    <div class="mt-4 flex gap-2">
        <button class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
            <span class="text-red">Sebelum</span>
        </button>
        <button class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            <span class="text-red">Berikutnya</span>
        </button>
    </div>
</template>