import DashboardService from '../../Services/DashboardService'
import BlockedCabinService from '../../Services/BlockedCabinService'
import { cosh } from 'core-js/fn/number'
import CabinService from '../../Services/CabinService'
import { all } from 'core-js/fn/promise'

const state = {
    cruises:[],
    selectedCruise:{}
}

const getters = {}

const mutations = {
    SET_CRUISES(state,cruises){
        state.cruises=cruises
    },
    SET_SELECTED_CRUISE(state,selectedCruise){
        state.selectedCruise=selectedCruise
    }
}

const actions = {
    async fetchCruiseListwithOccupancy ({commit}) {
        let cruises = await DashboardService.fetchCruiseListwithOccupancy();
        let blockedCabins= await BlockedCabinService.getAllBlockedCabins();
        let allCabins = await CabinService.fetchAllCabins()
        cruises.forEach(cruise=>{
            cruise.soldCabins = []
            cruise.vesselCabinCount = allCabins.filter(cabin=> cabin.vessel === cruise.vessel._id).length
            blockedCabins.forEach(blockedCabin=>{
                if(cruise._id===blockedCabin.cruise){
                    if(blockedCabin.blockReason==="Sold"){
                        cruise.soldCabins.push(blockedCabin.cabin)
                    }
                }
            })
        })
        commit('SET_CRUISES', cruises)

       
    },
}

export default {
  state,
  getters,
  mutations,
  actions
}