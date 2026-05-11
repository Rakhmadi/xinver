<script setup>
import { onMounted, ref, watch } from 'vue';
import {barangMasukStore} from '../../model_state/barang_masuk.js'
import { useRoute, useRouter } from 'vue-router';
import { formatRupiah } from '../../helper_function.js'
import Tutut from 'tutut';

let route = useRoute()
let router = useRouter()
let data_barang_masuk =  barangMasukStore()

data_barang_masuk.getSingleDataBarangMasuk(Number(route.params.id))

let deleteCancelTransaksi = ()=>{
  Tutut.danger({
    title : 'Apakah Anda Yakin? ',
    text : 'Transaksi Akan Dibatalkan Data Akan Dihapus Permenent Apakah Anda Yakin?'
  },{
    showConfirm : true,
    onConfirm : ()=>{
      
      let exec_del_0 = data_barang_masuk.deleteTransaksiMasuk(Number(route.params.id))
      
      if(exec_del_0){
        Tutut.success({
          title : 'Pesan',
          text : 'Data Transaksi Berhasil Di Dihapus'
        })

        router.push({
          path : '/barang_masuk'
        })

      }

    }
  })
}
</script>

<template>
<div class=" mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
    <!-- Header -->
    <div class="bg-[#eceef7] px-6 py-5 flex flex-row justify-between items-center">
      <div>
        <h1 class="text-xl font-bold text-[#2d354f]">
          Detail Barang Masuk "{{ data_barang_masuk.data_single_barang_masuk.data_transaksi_masuk.code_transaction }}"
        </h1>
      </div>
      <div class="flex flex-row gap-2 h-min">
          <router-link to="/barang_masuk" class="bg-[#2563EB] no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                <span class="text-red">Kembali</span>
            </router-link>
            <button @click="deleteCancelTransaksi()" class="bg-[#f35757] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#ff5c5c] focus:border-b-1 text-white cursor-pointer">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
                <span class="text-red">Hapus dan Batalkan Transaksi</span>
            </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-[40%]">

      <!-- Left Side -->
      <div class="space-y-2">

        <div>
          <label class="text-sm text-gray-500">Kode Transaksi Masuk</label>
          <p class="font-semibold text-gray-800">{{ data_barang_masuk.data_single_barang_masuk.data_transaksi_masuk.code_transaction }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Tanggal</label>
          <p class="font-semibold text-gray-800">{{ data_barang_masuk.data_single_barang_masuk.data_transaksi_masuk.date }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Nama Suplier</label>
          <p class="font-semibold text-gray-800">{{ data_barang_masuk.data_single_barang_masuk.data_transaksi_masuk.name }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Total Jenis Barang</label>
          <p class="font-semibold text-gray-800">{{ data_barang_masuk.data_single_barang_masuk.data_transaksi_masuk.product_count }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Total QTY Barang</label>
          <p class="font-semibold text-gray-800">{{ data_barang_masuk.data_single_barang_masuk.data_transaksi_masuk.sum_qty_detail }}</p>
        </div>


      </div>

      <!-- Right Side -->
      <div class="space-y-2">
        <div>
          <label class="text-sm text-gray-500">Total Harga Harga</label>
          <p class="font-semibold text-gray-800">{{formatRupiah(data_barang_masuk.data_single_barang_masuk.total_harga)}}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Tanggal Dibuat</label>
          <p class="font-semibold text-gray-800">{{ data_barang_masuk.data_single_barang_masuk.data_transaksi_masuk.created_at }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Terakhir Update</label>
          <p class="font-semibold text-gray-800">{{ data_barang_masuk.data_single_barang_masuk.data_transaksi_masuk.updated_at }}</p>
        </div>
      </div>
    </div>
    <hr class="border-t border-gray-300 mb-4">
    <div class="px-6">
      <h1 class="text-xl font-bold text-[#2d354f] mb-4"> Diskripsi Transaksi </h1>
      <div v-html="data_barang_masuk.data_single_barang_masuk.data_transaksi_masuk.description"></div>
    </div>
    <hr class="border-t border-gray-300 my-4">
    <div class="px-6">
      <h1 class="text-xl font-bold text-[#2d354f] mb-4"> Detail Barang </h1>
        <div class="overflow-x-auto bg-white rounded-xl shadow mb-4">
                    <table class="min-w-full text-sm text-left">
                        <!-- HEADER -->
                        <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th class="px-4 py-3">Kode Barang</th>
                                <th class="px-4 py-3">Nama Barang</th>
                                <th class="px-4 py-3">SKU</th>
                                <th class="px-4 py-3">QTY</th>
                                <th class="px-4 py-3">Harga</th>
                                <th class="px-4 py-3">Subtotal</th>
                            </tr>
                        </thead>
                        <!-- BODY --> 
                        <tbody class="divide-y divide-gray-200">
                            <!-- ROW --> 
                            <tr v-for="(item) in data_barang_masuk.data_single_barang_masuk.data_detail_barang" :key="item" class="hover:bg-gray-50 transition">
                                <td class="px-4 py-3 text-gray-600">{{ item.code_barang }}</td>
                                <td class="px-4 py-3 text-gray-600">{{ item.name }}</td>
                                <td class="px-4 py-3 text-gray-600">{{ item.sku }}</td>
                                <td class="px-4 py-3 text-gray-600">{{ item.qty }}</td>
                                <td class="px-4 py-3 text-gray-600">{{ formatRupiah(item.price) }}</td>
                                <td class="px-4 py-3 text-gray-600">{{ formatRupiah(item.sub_total) }}</td>
                            </tr>
                        </tbody>
                    </table>
        </div>
        <div class="flex flex-row-reverse mb-4">
            <div class="bg-gray-100 rounded-xl px-4 py-3">
                <h3 class="font-semibold text-gray-700">
                    Total Harga  {{formatRupiah(data_barang_masuk.data_single_barang_masuk.total_harga)}}
                </h3>
            </div>
        </div>
        
    </div>
    <!-- Footer -->
  </div>
</template>