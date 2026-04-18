<script setup>
import { onMounted, ref } from 'vue';
import Database from '@tauri-apps/plugin-sql';
import { appDataDir } from '@tauri-apps/api/path';

let db = ref()

let is_logged = ref(false)
let menu = ref("")
let list_menu = ref([
    { 
        name: "Home",
        path : '/',
        icon : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>'
    },
    { 
        name: "Barang",
        path : '/barang',
        icon : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>'
    },
    { 
        name: "Barang Masuk",
        path : '/',
        icon : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"/></svg>'
    },
    { 
        name: "Barang Keluar",
        path : '/',
        icon : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/></svg>'
    },
    { 
        name: "Stock",
        path : '/',
        icon : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>'
    },
    {
        name : 'Supplier',
        path : '/',
        icon : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>'
    },
    { 
        name: "Laporan",
        path : '/',
        icon : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/></svg>'
    }
  ])
  
onMounted(async()=>{

try {
        db.value = await Database.load("sqlite:test.db");
    
    let x = await db.value.execute(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      );`)

      console.log(x);
} catch (error) {
    
}
      
    
    is_logged.value = "true"
    //    is_logged.value = String(localStorage.getItem('is_logged'))


    const appDataDirPath = await appDataDir();
    console.log(appDataDirPath);
    

    
})


let togglePassword = (event)=>{
      const input = document.getElementById("password");
      const btn = event.target;

      if (input.type === "password") {
        input.type = "text";
        btn.innerText = "Hide";
      } else {
        input.type = "password";
        btn.innerText = "Show";
      }
}
</script>

<template>
<section v-if="is_logged === 'true' " class="flex flex-col h-screen">
        <div class="nav fixed w-full">
            <div class="py-4 px-4 bg-[#2563EB] flex flex-row justify-between items-center">
                <div>
                    <ul class="box-border flex flex-row gap-2">
                        <li class="">
                            <span class="text-xl text-white"><span class="text-lg text-white font-semibold">X</span><span class="text-xl text-white">inver</span></span>
                        </li>
                        <li v-for="item in list_menu" :key="item">
                            <router-link  :to="item.path" @click="menu = item.name " :class="menu === item.name ? 'bg-[#1E40AF]' : 'bg-[#2351e8]'" class=" text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent  hover:bg-[#1E40AF] focus:border-b-1  text-white">
                                <div v-html="item.icon"></div>
                                <span class="text-red">{{item.name}}</span>
                            </router-link >
                        </li>
                    </ul>
                </div>
                <div class="relative group">
                    <ul class="box-border flex flex-row gap-2">
                        <li class="">
                            <router-link to="/settings"  @click="menu = 'settings'" :class="menu === 'settings' ? 'bg-[#1E40AF]' : 'bg-[#2351e8]'" class="flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF]  text-white">
                                <span class=" text-sm text-red">Pengaturan</span> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <content class="grow bg-[#ffffff] p-2 mt-[62px]">
            <div class="box-border w-full h-full  ">
                <div class=" px-12 py-6 bg-[#ffffff]">
                    <router-view></router-view>
                </div>
            </div>
        </content>
    </section>
    <section v-else class="bg-[#2563EB] w-screen h-screen">
        <div class="w-full h-full  flex justify-center items-center">
            <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
    
                <!-- Title -->
                <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Xinver Secure Access
                </h2>

                <!-- Password Input -->
                <div class="mb-4">
                    <label class="block text-sm text-gray-600 mb-1">Password</label>
                    
                    <div class="relative">
                        <input id="password" type="password" placeholder="Enter password" class=" bg-[#e4edff] w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">

                        <!-- Toggle Button -->
                        <button type="button" @click="togglePassword" class="absolute right-3 top-2.5 text-gray-500 text-sm">Show</button>
                    </div>
                </div>

                <!-- Button -->
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-200 cursor-pointer">Login</button>
            </div>
        </div>
    </section>
</template>
<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>