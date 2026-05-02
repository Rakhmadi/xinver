import { path } from '@tauri-apps/api'
import { createWebHistory, createRouter } from 'vue-router'



const routes = [
  {
    path : "/",
    name : "Home", 
    component : ()=> import('./pages/Home.vue')
  },{
    path : '/barang',
    name : 'barang',
    component : ()=> import("./pages/barang/barang.vue"),
    children : [
      {
        path : '',
        name : 'master_barang',
        component : () => import("./pages/barang/master_barang/index.vue")
      },{
        path : 'detail_barang/:id',
        name : 'detail_barang',
        component : ()=> import("./pages/barang/master_barang/detail.vue")
      },{
        path : 'tambah_barang',
        name : 'tambah_barang',
        component : () => import("./pages/barang/master_barang/tambah_barang.vue")
      },{
        path : 'edit_barang/:id',
        name : 'edit_barang',
        component : ()=> import("./pages/barang/master_barang/edit_barang.vue")
      },{
        path : 'kategori',
        name : 'kategori',
        component : () => import("./pages/barang/kategori/index.vue")
      },{
        path : 'merk',
        name : 'merk',
        component : () => import("./pages/barang/merk/index.vue")
      },{
        path : 'lokasi',
        name : 'lokasi',
        component : () => import("./pages/barang/lokasi/index.vue")
      }
    ]
  },{
    path : '/barang_masuk',
    name : 'barang_masuk',
    component : ()=> import('./pages/barang_masuk/index.vue')
  },{
    path : "/settings",
    name : "settings", 
    component : ()=> import('./pages/Setting.vue')
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})