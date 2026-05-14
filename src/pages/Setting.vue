<script setup>
import { ref,onMounted } from 'vue'
import { authStore } from '../model_state/auth.js'
import Tutut from 'tutut'
import { appDataDir } from '@tauri-apps/api/path';
import { revealItemInDir } from '@tauri-apps/plugin-opener';


let new_pass = ref('')
let repeat_password = ref('')
let old_password = ref('')
let  num_minimum_stock = ref(5)
let msg = ref(false)
let msg_content = ref('')


let auth_store = authStore()

onMounted(()=>{
    let min_stock_storage = localStorage.getItem('min_pringatan_stock')

    if(min_stock_storage){
        num_minimum_stock.value = min_stock_storage
    }else{
        localStorage.setItem("min_pringatan_stock", 5);
    }
})

let changeMinStockPeringatan = ()=>{
    localStorage.setItem('min_pringatan_stock',Number(num_minimum_stock.value))
    num_minimum_stock.value = localStorage.getItem('min_pringatan_stock')
    Tutut.info({
        title : 'Pesan',
        text : 'Minimun Peringatan Stock Berhasil Di Ubah'
    })
}

let cangePAssword = async()=>{
    if(new_pass.value.length < 6){
        msg.value = true
        msg_content.value = 'Password Harus Lebih dari 5'
    }else if(new_pass.value != repeat_password.value){
        msg.value = true
        msg_content.value = 'Password Baru Harus Sama Dengan Verifikasi Password'
    }else{ 
        auth_store.changePassword(repeat_password.value,old_password.value).then((result)=>{
            console.log(result)
            if(result){

                console.log(result)
                Tutut.info({
                    title : 'Pesan',
                    text : 'Password Berhasil Di Ubah'
                })

                setTimeout(()=>{
                    auth_store.Logout()
                },2000)
            }else{
                msg.value = true      
                msg_content.value = 'Gagal! Password Kemungkinan Salah'
            }
        })
    }
}

let buka = async()=>{

    const appDataDirPath = await appDataDir();

    await revealItemInDir(appDataDirPath+'\\');

}

</script>

<template>
    <div>
        <h1 class="text-3xl pb-6 text-[#2d354f]">Pengaturan</h1>
        <h2 class="text-xl pb-4 pt-2 text-[#2d354f]">Ubah Password</h2>
        <lable class="text-red-500 text-sm" v-show="msg">{{ msg_content }}</lable>
        <div class="flex w-[50%] gap-2">
            <input type="text" v-model="new_pass"  placeholder="Password Baru" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            <input type="text " v-model="repeat_password" placeholder="Verifikasi Password Baru" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            <input type="password" v-model="old_password"  placeholder="Password" class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            <button @click="cangePAssword" class="bg-[hsl(221,83%,53%)] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                <span class="text-red">Ubah</span>
            </button>
        </div>
        <hr class="border-t border-gray-300 my-4">
        <h2 class="text-xl pb-4 pt-2 text-[#2d354f]">Lokasi Database & file</h2>
            <p class="mb-4">Kamu bisa membackup (Database dan File gambar) kamu di folder ini (Klik buka folder)</p>
            <button @click="buka" class="bg-[hsl(221,83%,53%)] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                <span class="text-red">Buka Folder</span>
            </button>

        <hr class="border-t border-gray-300 my-4">
        <h2 class="text-xl pb-4 pt-2 text-[#2d354f]">Lainnya</h2>
        <p class="mb-4">Minimum Pringatan Stock</p>
        <div class="flex flex-row gap-2">
            <input type="number" min="5" max="100" v-model="num_minimum_stock"  placeholder="10" class="w-50 px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]">
            <button @click="changeMinStockPeringatan" class="bg-[hsl(221,83%,53%)] text-sm flex flex-row items-center rounded-full py-1 px-3 gap-1 border-1 border-transparent hover:bg-[#1E40AF] focus:border-b-1 text-white cursor-pointer">
                <span class="text-red">Ubah</span>
            </button>
        </div>
        <hr class="border-t border-gray-300 my-4">
        <h2 class="text-xl pb-4 pt-2 text-[#2d354f]">Tentang Aplikasi</h2>
        <p>Simple Inventory System adalah aplikasi untuk mengelola stok barang secara sederhana. Aplikasi ini membantu mencatat barang masuk, barang keluar, dan memantau jumlah stok dengan mudah. Dirancang dengan tampilan yang ringan dan mudah digunakan, aplikasi ini cocok untuk kebutuhan usaha kecil hingga menengah.</p>
        <div class="mt-4"></div>
        <h1 class="text-lg font-bold text-gray-800">MIT License</h1>
        <p class="text-sm text-gray-500">Copyright (c) 2026 Rakhmadi</p>

        <div class="text-sm text-gray-700 leading-relaxed space-y-3">
        <p>
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to do so, subject to the
        following conditions:
        </p>

        <p>
        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.
        </p>

        <p>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
        </p>
        </div>
        <hr class="border-t border-gray-300 my-4">
        Xinver Created by Rakhmadi 

   </div>
</template>