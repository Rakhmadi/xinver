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
  },
  // barang masuk router
  {
    path : '/barang_masuk',
    name : 'barang_masuk',
    component : ()=> import('./pages/barang_masuk/index.vue')
  },{
    path : '/tambah_transaksi_masuk',
    name : 'tambah_transaksi_masuk',
    component : ()=> import('./pages/barang_masuk/tambah_barang_masuk.vue')
  },{
    path : '/detail_transaksi_masuk/:id',
    name : 'detail_transaksi_masuk',
    component : ()=> import('./pages/barang_masuk/detail.vue')
  },
  // barang keluaar router
  {
    path : '/barang_keluar',
    name : 'barang_keluar',
    component : ()=> import('./pages/barang_keluar/index.vue')
  },{
    path : '/tambah_transaksi_keluar',
    name : 'tambah_transaksi_keluar',
    component : ()=> import('./pages/barang_keluar/tambah_barang_keluar.vue')
  },{
    path : '/detail_barang_keluar/:id',
    name : '/detail_barang_keluar',
    component : ()=> import('./pages/barang_keluar/detail.vue')
  },
  {
    path : "/settings",
    name : "settings", 
    component : ()=> import('./pages/Setting.vue')
  },{
    path : '/supplier',
    name : 'supplier',
    component : ()=> import('./pages/suplier/index.vue')
  },{
    path : '/laporan',
    name : 'laporan',
    component : ()=> import('./pages/laporan/index.vue'),
    children : [
      {
        path : '',
        name : 'laporan_barang',
        component : ()=>import('./pages/laporan/laporan_barang.vue')
      },{
        path : 'laporan_barang_masuk',
        name : 'laporan_barang_masuk',
        component : ()=>import('./pages/laporan/laporan_barang_masuk.vue')
      },{
        path : 'laporan_barang_keluar',
        name : 'laporan_barang_keluar',
        component : ()=>import('./pages/laporan/laporan_barang_keluar.vue')
      },{
        path : 'laporan_stock_menipis',
        name : 'laporan_stock_menipis',
        component : ()=>import('./pages/laporan/laporan_stock_menipis.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})