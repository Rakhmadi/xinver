<script setup>
import { onMounted, ref } from 'vue';
import { initDatabase } from './db'
import { appDataDir } from '@tauri-apps/api/path';
import { useRoute } from 'vue-router'
import { getCurrentWindow } from '@tauri-apps/api/window';
import Tutut from 'tutut';
import bcrypt from 'bcryptjs'
import { authStore } from './model_state/auth.js'

let auth_store = authStore()

const appWindow = getCurrentWindow();

appWindow.maximize()


// zoom out

let route = useRoute()
let db = ref()

let is_logged = ref(false)
let menu = ref("")

let password = ref('')

let list_menu = ref([
    { 
        name: "Home",
        path : '/',
        icon : '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4"><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"/><path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"/></svg>'
    },
    { 
        name: "Barang",
        path : '/barang',
        icon : '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4"><path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z"/></svg>'
    },
    { 
        name: "Barang Masuk",
        path : '/barang_masuk',
        icon : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"/></svg>'
    },
    { 
        name: "Barang Keluar",
        path : '/barang_keluar',
        icon : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/></svg>'
    },
    {
        name : 'Supplier',
        path : '/supplier',
        icon : '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4"><path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z"/><path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z"/><path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/></svg>'
    },
    { 
        name: "Laporan",
        path : '/laporan',
        icon : '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 17.25a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75Zm2.25-3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-5.25Z" clip-rule="evenodd"/><path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z"/></svg>'
    }
  ])
  
onMounted(async()=>{

try {
    initDatabase()
   
} catch (error) {

}
      

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

let clickMinimize = ()=>{
    appWindow.minimize()
}

let clickCloseWindow = ()=>{
    Tutut.confirm({
        title : 'Keluar Aplikasi',
        text : 'Apakah Anda yakin ingin keluar dari aplikasi?'
    },{
        showConfirm : true,
        onConfirm : ()=>{
            auth_store.Logout()
            password.value = ''
            appWindow.close()
        }
    })
}

let login = async()=>{
    auth_store.login(password.value)
    password.value = ''
}

let logout = ()=>{
    auth_store.Logout()
    password.value = ''
}

</script>

<template>
<section v-if="auth_store.is_login" class="flex flex-col h-screen">
        <div class="nav fixed w-full z-40 ">
            <div class="py-4 px-4 bg-[#2563EB] flex flex-row justify-between items-center " >
                <div>
                    <ul class="box-border flex flex-row gap-2 items-center">
                        <li class="list-none">
                            <span class="text-xl text-white "><span class="text-lg text-white font-semibold">X</span><span class="text-xl text-white">inver</span></span>
                        </li>
                        <li v-for="item in list_menu" :key="item" class="list-none" >
                            <router-link  :to="item.path" @click="menu = item.name " :class="menu === item.name ? 'bg-[#1E40AF]' : 'bg-[#2351e8]'" class="no-underline text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent  hover:bg-[#1E40AF] focus:border-b-1  text-white">
                                <div v-html="item.icon"></div>
                                <span class="text-red">{{item.name}}</span>
                            </router-link >
                        </li>
                    </ul>
                </div>
                <div class="relative group flex flex-row gap-2 items-center">
                    <ul class="box-border flex flex-row gap-2 list-none items-center">
                        <li class="">
                            <router-link to="/settings"  @click="menu = 'settings'" :class="menu === 'settings' ? 'bg-[#1E40AF]' : 'bg-[#2351e8]'" class=" no-underline flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF]  text-white">
                                <span class=" text-sm text-red">Pengaturan</span> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                  <path fill-rule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
                                </svg>

                            </router-link>
                        </li>
                        <li class="">
                            <button  @click="logout"  class="bg-[#2351e8] no-underline flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF]  text-white">
                                <span class=" text-sm text-red">Logout</span> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>

                            </button>
                        </li>
                    </ul>
                    <button @click="clickMinimize" class="bg bg-[#2351e8] no-underline flex flex-row items-center rounded-full py-1 px-1 gap-1 border-1 border-transparent cursor-pointer hover:bg-[#1E40AF]  text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                        </svg>
                    </button>
                    <button @click="clickCloseWindow" class="bg-red-400 no-underline flex flex-row items-center rounded-full py-1 px-1 gap-1 border-1 border-transparent hover:bg-red-500 cursor-pointer text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
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
                <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Xinver Secure Access
                </h2>
                <div class="mb-4">
                    
                    <div class="relative">
                        <input v-model="password" id="password" type="password" placeholder="Password default (123456)" class=" bg-[#e4edff] w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <button type="button" @click="togglePassword" class="absolute right-3 top-2.5 text-gray-500 text-sm cursor-pointer">Show</button>
                    </div>
                </div>
                <div class="mb-4">
                    <p class="text-red-400  text-xs">
                        Peringatan: Password default tidak berlaku jika sudah diubah. Gunakan password terbaru.
                    </p>
                </div>

                <div class="flex flex-row gap-2">
                    <button @click="login" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-200 cursor-pointer">Login</button>
                    <button @click="appWindow.close()" class="w-full bg-blue-400 hover:bg-blue-700 text-white py-2 rounded-full transition duration-200 cursor-pointer">Keluar</button>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>