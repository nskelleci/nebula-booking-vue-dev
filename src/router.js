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
            rule: 'isAgency',
            authRequired : true
          }
        },
        {
          path: '/Vessels',
          name: 'Vessel',
          component: () => import('./views/Vessel/vessels.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path: '/Vessels/add',
          name: 'Add-Vessel',
          component: () => import('./views/Vessel/VesselForm.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path: '/Vessels/edit/:id',
          name :'Edit Vessel',
          component : () => import ('./views/Vessel/VesselForm.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Vessels/:id',
          name : 'vessel-detail',
          component : () => import ('./views/Vessel/VesselDetail.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Countries/',
          name : 'countries',
          component : () => import ('./views/Cruises/Countrys/Countries.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Ports/',
          name : 'ports',
          component : () => import ('./views/Cruises/Ports/Ports.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/CruiseTypes/',
          name : 'cruisetypes',
          component : () => import ('./views/Cruises/CruiseTypes/CruiseTypes.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/CruiseSeasons/',
          name : 'cruiseseasons',
          component : () => import ('./views/Cruises/CruiseSeans/CruiseSeasons.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Markets/',
          name : 'markets',
          component : () => import ('./views/Cruises/Markets/Markets.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Prices/',
          name : 'prices',
          component : () => import ('./views/Cruises/Prices/Prices.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/AgencyTypes/',
          name : 'agencytypes',
          component : () => import ('./views/Agencies/AgencyTypes/AgencyTypes.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Agencies/',
          name : 'Agencies',
          component : () => import ('./views/Agencies/Agencies.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Cruises',
          name : 'cruises',
          component : () => import ('./views/Cruises/Cruises.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Cruises/Detail/:id',
          name : 'cruisedetail',
          component : () => import ('./views/Cruises/CruiseDetail.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Cruises/RoseCabin/:id',
          name : 'rosecabin',
          component : () => import ('./views/Cruises/RoseCabin.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
        {
          path : '/Booking/',
          name : 'booking',
          component : () => import ('./views/Booking/Booking.vue'),
          meta: {
            rule: 'isAgency',
            authRequired : true
          }
        },
        {
          path : '/MyBookings/',
          name : 'mybookings',
          component : () => import ('./views/Booking/MyBookings.vue'),
          meta: {
            rule: 'isAgency',
            authRequired : true
          }
        },
        {
          path: '/MyBookings/Detail/:id',
          name: 'mybookingsdetail',
          component : () => import ('./views/Booking/MyBookingDetail.vue'),
          meta: {
            rule: 'isAgency',
            authRequired : true
          }
        },
        {
          path: '/voucher/:id',
          name: 'voucher',
          component: () => import('./views/Booking/components/voucher.vue'),
          meta: {
            rule: 'isManager',
            authRequired : true
          }
        },
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      meta : {
        rule : 'isPublic'
      },
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue'),
          meta : {
            rule : 'isPublic',
            authRequired : false
          }
        },
        {
          path: '/pages/notauthorized-403',
          name: 'NotAuthorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta : {
            rule : 'isPublic',
            authRequired : false
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404',
      meta: {
        rule : 'isPublic',
        authRequired : false
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.authRequired)) {
//     if (localStorage.getItem('agency') === null) {
//       next({path:'pages/login'})
//     } else {
//       next()
//     }     
//   } else if (localStorage.getItem('agency') !== null) {
//     next()
//   } else {
//     next()
//   }
// })

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired) && localStorage.getItem('agency') === null) {
    
    next({path:'pages/login'})
  } else {
    next()
  }
} 
)


router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
