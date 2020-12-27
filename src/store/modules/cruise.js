import CruiseService from '../../Services/CruiseServices'
const state = {
  cruises : [],
  cruise : {}
}

const mutations = {
  SET_CRUISES (state, cruises) {
    state.cruises = cruises
  },

  SET_CRUISE (state, cruise) {

    state.cruise = cruise
  }
}

const actions = {
  async getCruises ({commit}) {
    commit('SET_CRUISES', await CruiseService.fetchCruises())
  },

  async getCruiseDetail ({commit}, cruiseid) {   
    const cruise = await CruiseService.getCruiseDetail(cruiseid)
    commit('SET_CRUISE', cruise)         
  },

  async addCruise (_, cruise) {
    await CruiseService.addCruise(cruise).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getCruises')
        }
      }
    })
  },
  // ROS   (run of ship )  ROH (Run of hotel) FIAT -> Fix It Again tomorrow
  async updateCruise (_, cruise) {
    await CruiseService.updateCruise(cruise)
    this.dispatch('getCruises')
  }

}

export default {
  state,
  mutations,
  actions
}