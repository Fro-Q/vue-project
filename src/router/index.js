import { createRouter, createWebHistory } from 'vue-router'
import UploadFileView from '../views/UploadFileView.vue'
import SpiParamsView from '../views/SpiParamsView.vue'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        optionPanel: HomeView,
        mapPanel: MapView
      }
    },
    {
      path: '/upload',
      name: 'upload',
      components: {
        optionPanel: UploadFileView,
        mapPanel: MapView
      }
    },
    {
      path: '/spi',
      name: 'spi',
      components: {
        optionPanel: SpiParamsView,
        mapPanel: MapView
      }
    }
  ]
}
)

export default router
