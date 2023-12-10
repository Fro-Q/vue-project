import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import BackgroundView from '../views/BackgroundView.vue'
import DocView from '../views/DocView.vue'
import DocTocView from '../views/DocTocView.vue'
import DocContentView from '../views/DocContentView.vue'

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
        mainPanel: HomeView,
        mapPanel: MapView
      }
    },
    {
      path: '/docs',
      name: 'docs',
      components: {
        mainPanel: DocView,
        mapPanel: BackgroundView
      },
      children: [
        {
          path: 'about',
          name: 'about',
          components: {
            sidePanel: DocTocView,
            contentPanel: DocContentView
          }
        }
      ]
    },
    {
      path: '/spi_params/:dataType',
      name: 'spi_params',
      components: {
        mainPanel: SpiParamsView,
        mapPanel: MapView
      }
    },
    {
      path: '/filter',
      name: 'filter',
      components: {
        mainPanel: ImageFilterView,
        mapPanel: MapView
      }
    }
  ]
}
)

export default router
