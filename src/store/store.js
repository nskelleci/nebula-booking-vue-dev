/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
// Impprt Modules
import vessel from './modules/vessel'
import cabinCategory from './modules/cabinCategory'
import bedType from './modules/bedType'
import cabin from './modules/cabin'
import country from './modules/country'
import port from './modules/port'
import cruiseType from './modules/cruiseType'
import cruiseSeason from './modules/cruiseSeason'
import market from './modules/market'
import price from './modules/price'
import agency from './modules/agency'
import agencyType from './modules/agencyType'
import cruise from './modules/cruise'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules : {
    vessel,
    cabinCategory,
    bedType,
    cabin,
    country,
    port,
    cruiseType,
    cruiseSeason,
    market,
    price,
    agency,
    agencyType,
    cruise
  },

  // strict: process.env.NODE_ENV !== 'production'
  strict: false

})
