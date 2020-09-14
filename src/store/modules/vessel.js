import axios from '@/axios.js'
import VesselService from '../../Services/VesselServices'
const state = {
  vessels : [],
  vessel : {}
}

const getters = {
  
}

const mutations = {
  SET_VESSELS (state, vessels) {
    state.vessels = vessels
  },

  ADD_VESSEL (state, vessel) {
    state.vessels.push(vessel)
  },
  SET_VESSEL (state, vessel) {
    state.vessel = vessel
  }


}

const actions = {
  async getVessels ({commit}) {
    commit('SET_VESSELS', await VesselService.fetchVessels())
  },

  async getVessel ({commit}, vesselid) {   
      const vessel = await VesselService.getVessel(vesselid) 
      commit('SET_VESSEL', vessel)         
  },

  async addVessel (_, vessel) {
    await VesselService.addVessel(vessel).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getVessels')
        }
      }
    })

  },

  async updateVessel (_, vessel) {
    await VesselService.updateVessel(vessel)
    this.dispatch('getVessels')
          
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}