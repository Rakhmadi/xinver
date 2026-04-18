<script setup>
import { menu } from '@tauri-apps/api';
import { ref } from 'vue';

let menu_active = ref("master_barang")


</script>
<template>
  <!-- start child menu  -->
  <div class="flex flex-row gap-2">
    <router-link to="/barang" aria-current="page" @click="menu_active = 'master_barang'" :class="menu_active == 'master_barang' ? 'border-[#2351e8] bg-[#b5c1e6]' : 'bg-[#d9ddeb] border-transparent'" class="router-link-active router-link-exact-active  text-[#2d354f] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1  hover:bg-[#b5c1e6] focus:border-b-1 cursor-pointer">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
        </div>
        <span class="text-[#2d354f]">Master Barang</span>
    </router-link>
    <router-link  to="/barang/kategori" aria-current="page" @click="menu_active = 'kategori'" :class="menu_active == 'kategori' ? 'border-[#2351e8] bg-[#b5c1e6]' : 'bg-[#d9ddeb] border-transparent'" class="router-link-active router-link-exact-active  text-[#2d354f] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1  hover:bg-[#b5c1e6] focus:border-b-1 cursor-pointer">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
        </div>
        <span class="text-[#2d354f]">Kategori</span>
    </router-link>
    <router-link to="/barang/lokasi" aria-current="page"  @click="menu_active = 'merk'" :class="menu_active == 'merk' ? 'border-[#2351e8] bg-[#b5c1e6]' : 'bg-[#d9ddeb] border-transparent'" class="router-link-active router-link-exact-active text-[#2d354f] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 hover:bg-[#b5c1e6] focus:border-b-1 cursor-pointer">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
        </div>
        <span class="text-[#2d354f]">Merk</span>
    </router-link>
    <router-link to="/barang/lokasi" aria-current="page"  @click="menu_active = 'lokasi'" :class="menu_active == 'lokasi' ? 'border-[#2351e8] bg-[#b5c1e6]' : 'bg-[#d9ddeb] border-transparent'" class="router-link-active router-link-exact-active text-[#2d354f] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 hover:bg-[#b5c1e6] focus:border-b-1 cursor-pointer">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
        </div>
        <span class="text-[#2d354f]">Lokasi</span>
    </router-link>
    <router-link to="/barang/lokasi" aria-current="page"  @click="menu_active = 'galeri'" :class="menu_active == 'galeri' ? 'border-[#2351e8] bg-[#b5c1e6]' : 'bg-[#d9ddeb] border-transparent'" class="router-link-active router-link-exact-active text-[#2d354f] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 hover:bg-[#b5c1e6] focus:border-b-1 cursor-pointer">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        </div>
        <span class="text-[#2d354f]">Galeri</span>
    </router-link>
  </div>
  <!-- end child menu -->
<div class="py-4 px-0">
    <router-view></router-view>
</div>
</template>