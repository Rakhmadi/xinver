<script setup>
import { homeStore } from '../model_state/home'
import { onMounted, ref } from 'vue'
import { formatRupiah } from '../helper_function'

let barang_store =  homeStore()


let data_series_transaksi_masuk = ref([])
let data_series_total_qty_masuk = ref([])
let data_category_date_masuk = ref([])

let data_series_transaksi_keluar = ref([])
let data_series_total_qty_keluar = ref([])
let data_category_date_keluar = ref([])
let min_stock = ref(0)

onMounted(async()=>{
    console.log(barang_store.data_home.grafik_masuk);

    min_stock.value = Number(localStorage.getItem('min_pringatan_stock')) + 1

    barang_store.getInfo().then(x=>{
        data_series_transaksi_masuk.value = barang_store.data_home.grafik_masuk.map(x=>{return x.transaksi})
        data_series_total_qty_masuk.value = barang_store.data_home.grafik_masuk.map(x=>{return x.total_qty})
        data_category_date_masuk.value = barang_store.data_home.grafik_masuk.map(x=>{return x.date.split(' ')[0]})

        series_0.value = [{
                name: 'Banyak Transaksi',
                data: data_series_transaksi_masuk.value
            },
            {
                name: 'Total Barang Masuk',
                data: data_series_total_qty_masuk.value
            }]

            chartOptions_0.value = {
                    chart: {
                        type: 'line',
                        height: 350,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: false
                        }
                    },

                    stroke: {
                        curve: 'smooth',
                        width: 3
                    },

                    dataLabels: {
                        enabled: false
                    },

                    xaxis: {
                        categories: data_category_date_masuk.value
                    },

                    legend: {
                        position: 'top'
                    },

                    tooltip: {
                        shared: true,
                        intersect: false
                    }
                }



                //===============================================================================================================


        data_series_transaksi_keluar.value = barang_store.data_home.grafik_keluar.map(x=>{return x.transaksi})
        data_series_total_qty_keluar.value = barang_store.data_home.grafik_keluar.map(x=>{return x.total_qty})
        data_category_date_keluar.value = barang_store.data_home.grafik_keluar.map(x=>{return x.date.split(' ')[0]})

        series_1.value = [{
                name: 'Banyak Transaksi',
                data: data_series_transaksi_keluar.value
            },
            {
                name: 'Total Barang Keluar',
                data: data_series_total_qty_keluar.value
            }]

            chartOptions_1.value = {
                    chart: {
                        type: 'line',
                        height: 350,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: false
                        }
                    },

                    stroke: {
                        curve: 'smooth',
                        width: 3
                    },

                    dataLabels: {
                        enabled: false
                    },

                    xaxis: {
                        categories: data_category_date_keluar.value
                    },

                    legend: {
                        position: 'top'
                    },

                    tooltip: {
                        shared: true,
                        intersect: false
                    }
                }


    })





    
})


const series_0 = ref([])
const chartOptions_0 = ref({})

const series_1 = ref([])
const chartOptions_1 = ref({})

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">

    <!-- Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-slate-500 text-sm">
                    Total Stock Barang
                </p>

                <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ barang_store.data_home.total_product }}</h2>
            </div>

            <div class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                📦
            </div>
        </div>
    </div>

        <!-- Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-slate-500 text-sm">
                    Total Jenis Barang
                </p>

                <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ barang_store.data_home.total_jenis_barang }}</h2>
            </div>

            <div class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                📦
            </div>
        </div>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-slate-500 text-sm">
                    Barang Masuk
                </p>

                <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ barang_store.data_home.sum_masuk }}</h2>
            </div>

            <div class="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
                📥
            </div>
        </div>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-slate-500 text-sm">Barang Keluar</p>

                <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ barang_store.data_home.sum_keluar }}</h2>

            </div>

            <div class="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                📤
            </div>
        </div>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-slate-500 text-sm">
                    Stok Menipis (kurang dari {{ min_stock }})
                </p>

                <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ barang_store.data_home.stock_min }}</h2>
            </div>

            <div class="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-2xl">
                ⚠️
            </div>
        </div>
    </div>
</div>
<!-- ================================================================================================ -->
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

    <!-- Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-slate-500 text-sm">
                    Total Harga Semua Barang
                </p>

                <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ formatRupiah(barang_store.data_home.total_harga_barang) }}</h2>
            </div>

            <div class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                💲
            </div>
        </div>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-slate-500 text-sm">
                    Total Harga Transaksi Masuk
                </p>

                <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ formatRupiah(barang_store.data_home.total_harga_barang_masuk) }}</h2>
            </div>

            <div class="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
                💲
            </div>
        </div>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-slate-500 text-sm">Total Harga Transaksi Keluar</p>

                <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ formatRupiah(barang_store.data_home.total_harga_barang_keluar) }}</h2>

            </div>

            <div class="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                💲
            </div>
        </div>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-slate-500 text-sm">
                    Rata - Rata Harga Barang
                </p>

                <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ formatRupiah(Math.floor(barang_store.data_home.rata_rata_harga_barang)) }}</h2>
            </div>

            <div class="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-2xl">
                💲
            </div>
        </div>
    </div>
</div>




<div class="grid grid-cols-2 gap-6 mb-8">
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 class="text-xl text-[#2d354f] font-semibold mb-4">Grafik Transaksi Barang Masuk</h2>
        <apexchart type="line" height="350" :options="chartOptions_0" :series="series_0"/>
    
    </div>
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 class="text-xl text-[#2d354f] font-semibold mb-4">Grafik Transaksi Barang Keluar</h2>
        <apexchart type="line" height="350" :options="chartOptions_1" :series="series_1"/>  
    </div>
</div>

<div class="grid grid-cols-2 gap-6 mb-8">
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 class="text-xl text-[#2d354f] font-semibold mb-4">Top 10 Barang Yang Sering Masuk</h2>
        <table class="min-w-full text-sm text-left">
                <!-- HEADER -->
                <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                    
                        <th class="px-4 py-3">Kode Barang</th>
                        <th class="px-4 py-3">Nama</th>
                        <th class="px-4 py-3">Total qty</th>
                    </tr>
                </thead>
                <!-- BODY -->
                <tbody class="divide-y divide-gray-200">
                    <!-- ROW -->
                    <tr v-for="(item) in barang_store.data_home.data_banyak_transaksi_masuk" :key="item.id" class="hover:bg-gray-50 transition">
                        <td class="px-4 py-3 text-gray-600">{{ item.code_barang }}</td>
                        <td class="px-4 py-3 text-gray-600">{{ item.name }}</td>
                        <td class="px-4 py-3 text-gray-600">{{ item.sum_qty }} - {{ item.unit }}</td>
                    </tr>
                    
                </tbody>
            </table>
    </div>
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 class="text-xl text-[#2d354f] font-semibold mb-4">Top 10 Barang Yang Sering Keluar</h2>
        <table class="min-w-full text-sm text-left">
                <!-- HEADER -->
                <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                    
                        <th class="px-4 py-3">Kode Barang</th>
                        <th class="px-4 py-3">Nama</th>
                        <th class="px-4 py-3">Total qty</th>
                    </tr>
                </thead>
                <!-- BODY -->
                <tbody class="divide-y divide-gray-200">
                    <!-- ROW -->
                    <tr v-for="(item) in barang_store.data_home.data_banyak_transaksi_keluar" :key="item.id" class="hover:bg-gray-50 transition">
                        <td class="px-4 py-3 text-gray-600">{{ item.code_barang }}</td>
                        <td class="px-4 py-3 text-gray-600">{{ item.name }}</td>
                        <td class="px-4 py-3 text-gray-600">{{ item.sum_qty }} - {{ item.unit }}</td>
                    </tr>
                    
                </tbody>
            </table>
    </div>
</div>


</template>