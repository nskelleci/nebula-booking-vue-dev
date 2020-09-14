import CabinService from '../../Services/CabinService'

const state = {
  cabins : []
}

const getters = {

}
const mutations = {
  SET_CABINS (state, Cabins) {
    state.cabins = Cabins
  }
}
const actions = {

  async getCabins ({commit}, vesselid) {
    commit('SET_CABINS', await CabinService.fetchCabins(vesselid))
  },


  async addCabin (_, cabin) {
    console.log('add cabin : ', cabin)
    await CabinService.addCabin(cabin).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getCabins', cabin.vessel)          
        }
      }
    })
  },

  async updateCabin (_, cabin) {
    await CabinService.updateCabin(cabin)
    this.dispatch('getCabins', cabin.vessel)          
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}