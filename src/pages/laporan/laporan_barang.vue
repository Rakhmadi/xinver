<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { barangStore } from '../../model_state/barang.js'
import { formatRupiah } from '../../helper_function.js'
import { useRoute } from 'vue-router';
import * as XLSX from "xlsx";
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";

let route = useRoute()
let data_barang = barangStore()
// const { data_category } = storeToRefs(data_barang)

let msg = ref(false)
let msg_content = ref('')

let show_kategori = ref(false)
let show_merek = ref(false)
let show_location = ref(false)

let search = ref("")
let kategori = ref("");
let kategori_id = ref('')
let merek = ref("")
let merek_id = ref('')
let location = ref("")
let location_code = ref("")
let location_id = ref('')
let order_by_desc = ref(true)
let order_by = ref('tb_product.created_at')
let take = ref(10)
let page = ref(1)
let min_stock = ref(5)
// let filtered_category = ref([])
// let filtered_merek = ref([])
// let filtered_location = ref([])

let filtered_category = computed(()=>{
    return data_barang.data_category.filter(x=>{
        return x.name.toLowerCase().includes(kategori.value.toLowerCase())
    })
})

let filtered_merek = computed(()=>{
    return data_barang.data_merek.filter(x=>{
        return x.name.toLowerCase().includes(merek.value.toLowerCase())
    })
})

let filtered_location = computed(()=>{
    return data_barang.data_location.filter(x=>{
        return x.name.toLowerCase().includes(location.value.toLowerCase()) || x.code.toLowerCase().includes(location.value.toLowerCase())
    })
})


watch([search,kategori,merek,location,order_by,order_by_desc,take],()=>{
    if(kategori.value === ''){
        kategori_id.value = ''
    }
    
    if(merek.value === ''){
        merek_id.value = ''
    }

    if(location.value === ''){
        location_id.value = ''
    }

    data_barang.getDataBarang(search.value,kategori_id.value,merek_id.value,location_id.value,order_by.value,order_by_desc.value,1,take.value)
})


onMounted(()=>{
        
    data_barang.getDataKategori()
    data_barang.getDataMerek()
    data_barang.getDataLocation()

    data_barang.getDataBarang(search.value,kategori_id.value,merek_id.value,location_id.value,order_by.value,order_by_desc.value,1,take.value)
    
    min_stock.value = localStorage.getItem('min_pringatan_stock')


    if(route.query.data_succes_add === "true"){
        msg.value = true
        msg_content.value = 'Data Berhasil Di Tambahkan '
    }else{
        msg.value = false
    }
    

//     filtered_category.value = data_barang.data_category
    // filtered_merek.value = data_barang.data_merek
    // filtered_location.value = data_barang.data_location
    // filtered_category.value = data_barang.data_category
})




// watch([kategori,merek,location],([new_kategori,new_merek,new_location],[old_kategori,old_merek,old_location])=>{
//     //fiter category
//     filtered_category.value = data_barang.data_category.filter(x=>{
//          return x.name.toLowerCase().includes(new_kategori?.toLowerCase())
//     })
//     // filter merek
//     filtered_merek.value = data_barang.data_merek.filter(x=>{
//          return x.name.toLowerCase().includes(new_merek?.toLowerCase())
//     })
//     // filter location
//     filtered_location.value = data_barang.data_location.filter(x=>{
//          return x.name.toLowerCase().includes(new_location?.toLowerCase())
//     })
// },{immediate:true})

let selectKategori = (name_select,id)=>{
    kategori.value = name_select
    kategori_id.value = id
    show_kategori.value = false
}

let selectMerek = (name_select,id)=>{
    merek.value = name_select
    merek_id.value = id
    show_merek.value = false
}

let selectLocation = (code,name_select,id)=>{
    location.value = name_select
    location_id.value = id
    location_code.value = code
    show_location.value = false
}

let blurAwait = ()=>{
    setTimeout(()=>{
        show_kategori.value = false
        show_merek.value = false
        show_location.value = false

    },200)
}

let clear = ()=>{
    kategori.value = ""
    merek.value = ""
    location.value = ""
    kategori_id.value = ''
    merek_id.value = ''
    location_id.value = ''
    order_by.value = "created_at"
    search.value = ""
    location_code.value = ""
    take.value = 10
    order_by_desc.value = true

    data_barang.getDataBarang(search.value,kategori_id.value,merek_id.value,location_id.value,order_by.value,order_by_desc.value,1,take.value)

}

let nextPage = ()=>{
    if(page.value < data_barang.data_barang.total_page){
        page.value = page.value + 1
        data_barang.getDataBarang(search.value,kategori_id.value,merek_id.value,location_id.value,order_by.value,order_by_desc.value,page.value,take.value)
    }
}

let previousPage = ()=>{
    if(page.value > 1){
        page.value = page.value - 1
        data_barang.getDataBarang(search.value,kategori_id.value,merek_id.value,location_id.value,order_by.value,order_by_desc.value,page.value,take.value)
    }
}

function highlightText(text, keyword) {
    if (!keyword) return text;

    return text.replace(
        new RegExp(keyword, "gi"),
        `<mark>$&</mark>`
    );
}

let export_ = async()=>{
        data_barang.getDataBarang(search.value,kategori_id.value,merek_id.value,location_id.value,order_by.value,order_by_desc.value,1,take.value,true).then(async()=>{
        const now = new Date();
        const timestamp = now.toISOString().replace(/[^0-9]/g, '').slice(0, 14);
        // buat worksheet
        const worksheet = XLSX.utils.json_to_sheet(data_barang.data_barang_export);

        // buat workbook
        const workbook = XLSX.utils.book_new();

        // append sheet
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Laporan Data Barang"
        );

        // generate binary excel
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        // dialog save
        const filePath = await save({
            defaultPath: `laporan_barang_${timestamp}.xlsx`,
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
    <div class="flex justify-between mb-4">
        <div class=" gap-2 flex flex-row w-[50%] items-center grow">
            <input v-model="search" type="text" placeholder="Cari Kode - Nama Barang - SKU" class="w-[250px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            <div class="relative">
                <input type="text" v-model="kategori" placeholder="Kategori" @click="show_kategori = true" @blur="blurAwait" class="w-[170px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <div v-show="show_kategori" class="absolute bg-[#e4edff] rounded-lg w-full mt-2 py-2 overflow-y-auto h-[250px]">
                    <li v-for="item in filtered_category" @click="selectKategori(item.name,item.id),show_kategori = true " :key="item" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">{{ item.name }}</li>   
                    <li v-if="filtered_category.length === 0" class="list-none mx-4 hover:bg-[#c6d9ff] cursor-pointer py-2">Data tidak di temukan</li>
                </div>
            </div>
            <div class="relative">
                <input type="text" v-model="merek" placeholder="Merek" @click="show_merek = true" @blur="blurAwait" class="w-[170px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <div v-show="show_merek" class="absolute bg-[#e4edff] rounded-lg w-full mt-2 py-2 overflow-y-auto h-[250px]">
                    <li  v-for="item in filtered_merek" @click="selectMerek(item.name,item.id)" :key="item" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">{{ item.name }}</li>   
                    <li v-if="filtered_merek.length === 0" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">Data tidak di temukan</li>
                </div>
            </div>
            <div class="relative">
                <input type="text" v-model="location" placeholder="Location" @click="show_location = true" @blur="blurAwait" class="w-[170px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <div v-show="show_location" class="absolute bg-[#e4edff] rounded-lg w-full mt-2 py-2 overflow-y-auto h-[250px]">
                    <li  v-for="item in filtered_location" @click="selectLocation(item.code,`${item.code} - ${item.name}`,item.id)" :key="item" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2"> {{item.code}} - {{ item.name }}</li>   
                    <li v-if="filtered_location.length === 0" class="list-none px-4 hover:bg-[#c6d9ff] cursor-pointer py-2">Data tidak di temukan</li>
                </div>
            </div>
            <select v-model="take" class="w-[120px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <option default value="10">Ambil - 10</option>
                <option value="20">Ambil - 20</option>
                <option value="50">Ambil - 50</option>
                <option value="100">Ambil - 100</option>
            </select>
            <select v-model="order_by" class="w-[200px] px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
                <option value="tb_product.created_at">Urutkan - Tanggal Dibuat</option>
                <option value="tb_product.updated_at">Urutkan - Tanggal Diperbarui</option>
                <option value="tb_product.id">Urutkan - Barang</option>
                <option value="tb_product.name">Urutkan - Nama</option>
                <option value="tb_product.sku">Urutkan - SKU</option>
                <option value="tb_product.stock">Urutkan - Stok</option>
                <option value="tb_product.price">Urutkan - Harga</option>
                <option value="total_harga">Urutkan - Total Harga</option>=
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
            <button @click="export_" class="bg-green-700 text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-green-800 focus:border-b-1 text-white cursor-pointer">
               <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
               </div>
                <span class="text-red">Export To EXCEL</span>
            </button>
            <div class="flex flex-row gap-2 items-center" v-show="data_barang.loading">
                <div class="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Memuat Data ....</span>
            </div>
            <div>
            </div>
        </div>
    </div>
    <div class="overflow-x-auto bg-white rounded-xl shadow">
        <table class="min-w-full text-sm text-left">
            <!-- HEADER -->
            <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                    <th class="px-4 py-3">Kode Barang</th>
                    <th class="px-4 py-3">Nama Barang</th>
                    <th class="px-4 py-3">SKU</th>
                    <th class="px-4 py-3">Stok</th>
                    <th class="px-4 py-3">Harga</th>
                    <th class="px-4 py-3">Total Harga</th>
                    <th class="px-4 py-3">Kategori</th>
                    <th class="px-4 py-3">Merek</th>
                    <th class="px-4 py-3">Location</th>
                    <th class="px-4 py-3 text-center"></th>
                </tr>
            </thead>
            <!-- BODY -->
            <tbody class="divide-y divide-gray-200">
                <!-- ROW -->
                <tr v-for="item in data_barang.data_barang.data" :key="item.id" class="hover:bg-gray-50 transition">
                    <td class="px-4 py-3 font-medium text-gray-800" v-html="highlightText(item.code_barang,search)"></td>
                    <td class="px-4 py-3 text-gray-600" v-html="highlightText(item.name,search)"></td>
                    <td class="px-4 py-3 text-gray-600" v-html="highlightText(item.sku,search)"> </td>
                    <td class="px-4 py-3">
                    <span class="px-2 py-1 text-xs rounded" :class="item.product_stock > min_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"> {{ item.product_stock }} </span> - {{ item.product_unit }}</td>
                    <td class="px-4 py-3 text-gray-700"> {{ formatRupiah(item.product_price) }} </td>
                    <td class="px-4 py-3 text-gray-700"> {{ formatRupiah(item.total_harga) }} </td>
                    <td class="px-4 py-3 text-gray-700"> {{ item.category_name }} </td>
                    <td class="px-4 py-3 text-gray-700"> {{ item.merek_name }} </td>
                    <td class="px-4 py-3 text-gray-700"> {{ `${item.location_code} - ${item.location_name}` }} </td>
                </tr>
                
            </tbody>
        </table>
    </div>
    <div class="mt-4 text-[#2d354f] text-sm flex gap-2">
        <span>Halaman {{ page }} hingga {{ data_barang.data_barang.total_page }} dari {{ data_barang.data_barang.total_data }} Entri</span>
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
        <button @click="nextPage" :class="page >= data_barang.data_barang.total_page ? 'bg-[#7397e6]' : 'bg-[#2563EB] hover:bg-[#1E40AF]' " class="bg-[#2563EB] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent focus:border-b-1 text-white cursor-pointer">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
            <span class="text-red">Berikutnya</span>
        </button>
    </div>

</template>