import axios from '@/axios.js'
import VesselService from '../../Services/VesselServices'
const state = {
  vessels : [],
  vessel : null
}

const getters = {
  getVessel :  (state) => (_id) => {
    return state.vessels.find(vessel => vessel._id === _id)
  },
  getVessels (state) {
    return state.vessels
  }
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

  getVessel ({commit}, vesselid) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:7878/api/v1/vessel/${vesselid}`)
        .then((response) => {
          commit('SET_VESSEL', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })

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