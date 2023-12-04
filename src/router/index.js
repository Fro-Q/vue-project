import { createRouter, createWebHistory } from 'vue-router'
import SpiParamsView from '../views/SpiParamsView.vue'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import ImageFilterView from '../views/ImageFilterView.vue'

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
      path: '/spi_params/:dataType',
      name: 'spi_params',
      components: {
        optionPanel: SpiParamsView,
        mapPanel: MapView
      }
    },
    {
      path: '/filter',
      name: 'filter',
      components: {
        optionPanel: ImageFilterView,
        mapPanel: MapView
      }
    }
  ]
}
)

export default router
