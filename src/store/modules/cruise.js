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
    commit('SET_CRUISE', await CruiseService.getCruiseDetail(cruiseid))         
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