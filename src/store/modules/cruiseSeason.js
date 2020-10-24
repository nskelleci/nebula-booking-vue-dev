import CruiseSeasonService from '../../Services/CruiseSeasonsServices'
const state = {
  cruiseseasons : [],
  cruiseseason : {}
}

const mutations = {
  SET_CRUISESEASONS (state, cruiseseasons) {
    state.cruiseseasons = cruiseseasons
  }
}

const actions = {
  async getCruiseSeasons ({commit}) {
    commit('SET_CRUISESEASONS', await CruiseSeasonService.fetchCruiseSeasons())
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
    this.dispatch('getCruiseSeasons')
  }

}

export default {
  state,
  mutations,
  actions
}