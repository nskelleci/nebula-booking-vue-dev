import CruiseSeasonService from '../../Services/CruiseSeasonsServices'
const state = {
  cruiseseasons : [],
  cruiseseason : {}
}

const mutations = {
  SET_CRUISESEASONS (state, cruiseseasons) {
    state.cruiseseasons = cruiseseasons
  },

  SET_CRUISESEASON (state, cruiseseason) {
    state.cruiseseason = cruiseseason
  }
}

const actions = {
  async getCruiseSeasons ({commit}) {
    commit('SET_CRUISESEASONS', await CruiseSeasonService.fetchCruiseSeasons())
  },

  async getCruiseSeason ({commit}, cruiseseasonid) {   
    const cruise = await CruiseSeasonService.fetchCruiseSeasons(cruiseseasonid) 
    commit('SET_CRUISESEASON', cruise)         
  },

  async addCruiseSeason (_, cruiseseason) {
    await CruiseSeasonService.addCruiseSeason(cruiseseason).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getCruiseSeasons')
        }
      }
    })
  },

  async updateCruiseSeason (_, cruiseseason) {
    await CruiseSeasonService.updateCruiseSeason(cruiseseason)
    this.dispatch('getCruiseSeason')
  }

}

export default {
  state,
  mutations,
  actions
}