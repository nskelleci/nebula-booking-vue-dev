import CruiseService from '../../Services/CruiseServices'
const state = {
  bookings : [],
  booking : {}
}

const mutations = {
  SET_BOOKINGS (state, bookings) {
    state.bookings = bookings
  },

  SET_BOOKING (state, booking) {
    state.booking = booking
  }
}

const actions = {
  async getCruisebyCruiseType ({commit}, cruisetypeid) {   
      commit('SET_BOOKINGS', await CruiseService.getCruisesbyCruiseType(cruisetypeid)
      )         
  }
}

export default {
  state,
  mutations,
  actions
}