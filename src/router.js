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
    component : ()=> import("./pages/barang/barang.vue")
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