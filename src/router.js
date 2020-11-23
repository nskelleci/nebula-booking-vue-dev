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
import store from './store/store'
import acl from './acl/acl'
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
          component: () => import('./views/Home.vue'),
          meta: {
            rule: 'isAgency'
          }
        },
        {
          path: '/Vessels',
          name: 'Vessel',
          component: () => import('./views/Vessel/vessels.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path: '/Vessels/add',
          name: 'Add-Vessel',
          component: () => import('./views/Vessel/VesselForm.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path: '/Vessels/edit/:id',
          name :'Edit Vessel',
          component : () => import ('./views/Vessel/VesselForm.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/Vessels/:id',
          name : 'vessel-detail',
          component : () => import ('./views/Vessel/VesselDetail.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/Countries/',
          name : 'countries',
          component : () => import ('./views/Cruises/Countrys/Countries.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/Ports/',
          name : 'ports',
          component : () => import ('./views/Cruises/Ports/Ports.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/CruiseTypes/',
          name : 'cruisetypes',
          component : () => import ('./views/Cruises/CruiseTypes/CruiseTypes.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/CruiseSeasons/',
          name : 'cruiseseasons',
          component : () => import ('./views/Cruises/CruiseSeans/CruiseSeasons.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/Markets/',
          name : 'markets',
          component : () => import ('./views/Cruises/Markets/Markets.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/Prices/',
          name : 'prices',
          component : () => import ('./views/Cruises/Prices/Prices.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/AgencyTypes/',
          name : 'agencytypes',
          component : () => import ('./views/Agencies/AgencyTypes/AgencyTypes.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/Agencies/',
          name : 'Agencies',
          component : () => import ('./views/Agencies/Agencies.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/Cruises',
          name : 'cruises',
          component : () => import ('./views/Cruises/Cruises.vue'),
          meta: {
            rule: 'isManager'
          }
        },
        {
          path : '/Booking/',
          name : 'booking',
          component : () => import ('./views/Booking/Booking.vue'),
          meta: {
            rule: 'isAgency'
          }
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
          component: () => import('@/views/pages/Login.vue'),
          meta: {
            rule : 'isPublic'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule : '*'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404',
      meta: {
        rule : '*'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedin = this.$acl.check('public')
  if (to.name !== 'page-login' && loggedin) next({ name: 'page-login' })
  else next()
})


router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
