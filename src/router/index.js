import { createRouter, createWebHistory } from 'vue-router'
import upload from '../views/uploadView.vue'
import spi from '../views/spiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: 
    },
    {
      path: '/upload',
      name: 'upload',
      component:upload    
    },
    {
      path: '/spi',
      name: 'spi',
      component:spi
    }
  ]
  }
  )

export default router
