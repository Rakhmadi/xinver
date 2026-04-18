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
        path : 'kategori',
        name : 'kategori',
        component : () => import("./pages/barang/kategori/index.vue")
      },{
        path : 'lokasi',
        name : 'lokasi',
        component : () => import("./pages/barang/lokasi/index.vue")
      }
    ]


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