import CruiseService from '../../Services/CruiseServices'
import BookingService from '../../Services/BookingService'
const state = {
  CruisesbyCruiseTypes : [],
  CruisesbyCruiseType : {}
}

const mutations = {
  SET_BOOKINGS (state, CruisesbyCruiseTypes) {
    state.CruisesbyCruiseTypes = CruisesbyCruiseTypes
  },

  SET_BOOKING (state, CruisesbyCruiseType) {
    state.CruisesbyCruiseType = CruisesbyCruiseType
  }
}

const actions = {
  async getCruisebyCruiseType ({commit}, cruisetypeid) {   
      commit('SET_BOOKINGS', await CruiseService.getCruisesbyCruiseType(cruisetypeid)
      )         
  },
  async addBooking (_, booking) {
    await BookingService.addBooking(booking).then((response) => {
      if (response) {
        if (response.success) {
            console.log("Ekleme Başarılı");       
        }
      }
    })
  },
}

export default {
  state,
  mutations,
  actions
}