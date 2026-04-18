<script setup>
import { invoke } from '@tauri-apps/api/core';
import { ref, computed } from 'vue'


let get_username = async()=>{
  console.log(await invoke('get_username'))
}


const search = ref('')
const open = ref(false)

const items = ref([
  { id: 1, name: 'Laptop Asus' },
  { id: 2, name: 'Laptop Lenovo' },
  { id: 3, name: 'iPhone 13' }
])

const filtered = computed(() => {
  return items.value.filter(i =>
    i.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const select = (item) => {
  search.value = item.name
  open.value = false
}

</script>
<template>

    <h1 class="text-[#2d354f] text-2xl">Home</h1>
    <input  type="text" placeholder="Masukkan data..." class="w-full px-2 py-1 text-md bg-[#e4edff] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"/>

<button @click="get_username" class="px-3 py-1.5 text-sm font-medium text-white bg-[#2563EB] rounded-md hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer flex flex-row gap-2 justify-center">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
  </svg>
  <span>Simpan</span>
</button>
<div class="p-4">
  <h1 class="text-xl font-semibold mb-4">Data Barang</h1>

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
          <td class="px-4 py-3 font-medium text-gray-800">
            Laptop ASUS
          </td>

          <!-- SKU -->
          <td class="px-4 py-3 text-gray-600">
            LAP-001
          </td>

          <!-- STOK -->
          <td class="px-4 py-3">
            <span class="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
              10
            </span>
          </td>

          <!-- HARGA -->
          <td class="px-4 py-3 text-gray-700">
            Rp 8.000.000
          </td>

          <!-- AKSI -->
          <td class="px-4 py-3 text-center space-x-2">
            <button class="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700">
              Edit
            </button>
            <button class="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600">
              Hapus
            </button>
          </td>

        </tr>

      </tbody>
    </table>
  </div>
</div>
<div class="bg-white shadow rounded-2xl p-4 flex gap-4">
  <!-- Image -->
  <div class="w-40 h-40 bg-gray-100 rounded-xl"></div>

  <!-- Info -->
  <div class="flex-1 space-y-2">
    <h1 class="text-xl font-semibold">Laptop Asus ROG</h1>
    <p class="text-sm text-gray-500">SKU: LPT-001</p>

    <div class="flex gap-2 flex-wrap">
      <span class="px-2 py-1 bg-blue-100 text-blue-600 rounded">
        Elektronik
      </span>
      <span class="px-2 py-1 bg-blue-100 text-blue-600 rounded">
        Laptop
      </span>
    </div>

    <p class="text-lg font-bold text-green-600">
      Rp 15.000.000
    </p>
  </div>
</div>


<div class="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl shadow">

  <!-- Search -->
  <input 
    type="text"
    placeholder="Cari barang..."
    class="flex-1 min-w-[200px] px-3 py-2 border rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
  />

  <!-- Filter Category -->
  <select class="px-3 py-2 border rounded-lg">
    <option>Semua Kategori</option>
    <option>Elektronik</option>
    <option>ATK</option>
  </select>

  <!-- Sort By -->
  <select class="px-3 py-2 border rounded-lg">
    <option value="name">Nama</option>
    <option value="price">Harga</option>
    <option value="stock">Stok</option>
    <option value="created_at">Tanggal</option>
  </select>

  <!-- Order -->
  <button class="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
    ⬆️ ASC
  </button>

  <!-- View Toggle -->
  <button class="px-3 py-2 bg-gray-100 rounded-lg">
    🔲
  </button>

</div>

<div class="relative w-full">
  <input
    type="text"
    v-model="search"
    @focus="open = true"
    placeholder="Cari kategori..."
    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2563EB]"
  />

  <!-- Dropdown -->
  <div 
    v-if="open"
    class="absolute w-full bg-white border mt-1 rounded-lg shadow max-h-60 overflow-auto"
  >
    <div 
      v-for="item in filtered"
      :key="item.id"
      @click="select(item)"
      class="px-3 py-2 hover:bg-blue-50 cursor-pointer"
    >
      {{ item.name }}
    </div>

    <div v-if="filtered.length === 0" class="p-2 text-gray-500">
      Tidak ditemukan
    </div>
  </div>
</div>

<div class="p-4">
  <h1 class="text-xl font-semibold mb-4">Galeri Barang</h1>

  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    
    <!-- Card Item -->
    <div class="bg-white rounded-xl shadow hover:shadow-lg transition relative group">
      
      <!-- Gambar -->
      <img 
        src="https://picsum.photos/200/300?grayscale" 
        alt="Barang"
        class="w-full h-40 object-cover rounded-t-xl"
      />

      <!-- Nama Barang -->
      <div class="p-3">
        <h2 class="text-sm font-medium text-gray-800 truncate">
          Laptop ASUS ROG
        </h2>
      </div>

      <!-- Tombol Hapus -->
      <button 
        class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
      >
        Hapus
      </button>

    </div>

  </div>
</div>
</template>