
<script setup>
import { ref } from 'vue';

let menu_active = ref("master_barang")

</script>
<template>
   <div class="flex flex-row gap-2">
    <router-link to="/laporan" @click="menu_active = 'laporan_barang'" :class="menu_active == 'laporan_barang' ? 'border-[#2351e8] bg-[#b5c1e6]' : 'bg-[#d9ddeb] border-transparent'" class="no-underline router-link-active router-link-exact-active  text-[#2d354f] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1  hover:bg-[#b5c1e6] focus:border-b-1 cursor-pointer">
        <div>
            📦
        </div>
        <span class="text-[#2d354f]">Laporan Barang</span>
    </router-link>
    <router-link to="/laporan/laporan_barang_masuk" @click="menu_active = 'laporan_barang_masuk'" :class="menu_active == 'laporan_barang_masuk' ? 'border-[#2351e8] bg-[#b5c1e6]' : 'bg-[#d9ddeb] border-transparent'" class="no-underline router-link-active router-link-exact-active  text-[#2d354f] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1  hover:bg-[#b5c1e6] focus:border-b-1 cursor-pointer">
        <div>
            📥
        </div>
        <span class="text-[#2d354f]">Laporan Transaksi Barang Masuk</span>
    </router-link>

    <router-link to="/laporan/laporan_barang_keluar" @click="menu_active = 'laporan_barang_keluar'" :class="menu_active == 'laporan_barang_keluar' ? 'border-[#2351e8] bg-[#b5c1e6]' : 'bg-[#d9ddeb] border-transparent'" class="no-underline router-link-active router-link-exact-active  text-[#2d354f] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1  hover:bg-[#b5c1e6] focus:border-b-1 cursor-pointer">
        <div>
            📤
        </div>
        <span class="text-[#2d354f]">Laporan Transaksi Barang Keluar</span>
    </router-link>

    <router-link to="/laporan/laporan_stock_menipis" @click="menu_active = 'laporan_stock_menipis'" :class="menu_active == 'laporan_stock_menipis' ? 'border-[#2351e8] bg-[#b5c1e6]' : 'bg-[#d9ddeb] border-transparent'" class="no-underline router-link-active router-link-exact-active  text-[#2d354f] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1  hover:bg-[#b5c1e6] focus:border-b-1 cursor-pointer">
        <div>
            ⚠️
        </div>
        <span class="text-[#2d354f]">Laporan Stok Barang Menipis</span>
    </router-link>
  </div>

<div class="py-4 px-0">
    <router-view></router-view>
</div>

</template>
