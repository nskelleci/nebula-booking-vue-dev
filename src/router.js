/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/Vessels',
          name: 'Vessel',
          component: () => import('./views/Vessel/vessels.vue')
        },
        {
          path: '/Vessels/add',
          name: 'Add-Vessel',
          component: () => import('./views/Vessel/VesselForm.vue')
        },
        {
          path: '/Vessels/edit/:id',
          name :'Edit Vessel',
          component : () => import ('./views/Vessel/VesselForm.vue')
        },
        {
          path : '/Vessels/:id',
          name : 'vessel-detail',
          component : () => import ('./views/Vessel/VesselDetail.vue')
        },
        {
          path : '/Countries/',
          name : 'countries',
          component : () => import ('./views/Cruises/Countrys/Countries.vue')
        },
        {
          path : '/Ports/',
          name : 'ports',
          component : () => import ('./views/Cruises/Ports/Ports.vue')
        },
        {
          path : '/CruiseTypes/',
          name : 'cruisetypes',
          component : () => import ('./views/Cruises/CruiseTypes/CruiseTypes.vue')
        },
        {
          path : '/CruiseSeasons/',
          name : 'cruiseseasons',
          component : () => import ('./views/Cruises/CruiseSeans/CruiseSeasons.vue')
        },
        {
          path : '/Markets/',
          name : 'markets',
          component : () => import ('./views/Cruises/Markets/Markets.vue')
        },
        {
          path : '/Prices/',
          name : 'prices',
          component : () => import ('./views/Cruises/Prices/Prices.vue')
        },
        {
          path : '/AgencyTypes/',
          name : 'agencytypes',
          component : () => import ('./views/Agencies/AgencyTypes/AgencyTypes.vue')
        },
        {
          path : '/Agencies/',
          name : 'Agencies',
          component : () => import ('./views/Agencies/Agencies.vue')
        },
        {
          path : '/Cruises/',
          name : 'cruises',
          component : () => import ('./views/Cruises/Cruises.vue')
        },
        {
          path : '/Booking/',
          name : 'booking',
          component : () => import ('./views/Booking/Booking.vue')
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
