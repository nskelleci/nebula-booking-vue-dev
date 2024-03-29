import CabinService from '../../Services/CabinService'

const state = {
  cabins: [],
  allCabins: [],
  avaliableCabinsbyCruiseCategory: [],
  getAvaliableCabins:[]
}

const getters = {

}
const mutations = {
  SET_CABINS(state, Cabins) {
    state.cabins = Cabins
  },
  SET_ALL_CABINS(state, Cabins) {
    state.allCabins = Cabins
  },
  SET_AVALIABLE_CABINS_BY_CRUISE_CABIN_CATEGORY(state, cabins) {
    state.avaliableCabinsbyCruiseCategory = cabins
  },
  SET_AVALIABLE_CABINS(state, getAvaliableCabins) {
    state.getAvaliableCabins = getAvaliableCabins
  },
}
const actions = {

  async getCabins({ commit }, vesselid) {
    commit('SET_CABINS', await CabinService.fetchCabins(vesselid))
  },
  async getAllCabins({ commit }) {
    commit('SET_ALL_CABINS', await CabinService.fetchAllCabins())
  },

  async addCabin(_, cabin) {
    await CabinService.addCabin(cabin).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getCabins', cabin.vessel)
        }
      }
    })
  },

  async updateCabin(_, cabin) {
    await CabinService.updateCabin(cabin)
    this.dispatch('getCabins', cabin.vessel)
  },

  async getAvaliableCabinsbyCruiseCabinCategory({ commit }, params) {
    const cabins = await CabinService.fetchAvaliableCabinsbyCabinCategoryCruise(params)
    for (let item in cabins) {
      cabins[item].numberOfAdult = 0;
      cabins[item].numberOfChild = 0;
      cabins[item].rosPrice = 0;
      cabins[item].isRos = false;
    }
    commit('SET_AVALIABLE_CABINS_BY_CRUISE_CABIN_CATEGORY', cabins)
  },

  async getFetchAvaliableCabins({ commit }, cruiseId) {
    const cabins = await CabinService.fetchAvaliableCabins(cruiseId)
    for (let item in cabins) {
      cabins[item].numberOfAdult = 0;
      cabins[item].numberOfChild = 0;
      cabins[item].rosPrice = 0;
      cabins[item].isRos = false;
    }
    commit('SET_AVALIABLE_CABINS', cabins)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}