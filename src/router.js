import { createWebHistory, createRouter } from 'vue-router'



const routes = [
  {
    path : "/",
    name : "Home", 
    component : ()=> import('./pages/Home.vue')
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