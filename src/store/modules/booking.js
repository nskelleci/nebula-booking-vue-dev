import CruiseService from '../../Services/CruiseServices'
import BookingService from '../../Services/BookingService'
const state = {
  CruisesbyCruiseTypes : [],
  CruisesbyCruiseType : {},
  BookingDetails : []
}

const mutations = {
  CruisesbyCruiseTypes (state, CruisesbyCruiseTypes) {
    state.CruisesbyCruiseTypes = CruisesbyCruiseTypes
  },

  CruisesbyCruiseType (state, CruisesbyCruiseType) {
    state.CruisesbyCruiseType = CruisesbyCruiseType
  },

  SET_BOOKING_DETAILS (state, booking) {
    state.BookingDetails.push(booking)
  },
  SET_BOOKING_DETAILS_PASSENGER (state, params) {
    state.BookingDetails[params.index].Passengers.push(params.passanger)
  },
  CLEAR_BOOKING_DETAILS (state) {
    state.BookingDetails=[]
  },
  CLEAR_BOOKING_DETAILS_WITH_INDEX (state,params) {
    state.BookingDetails[params.bookingindex].Passengers.splice(params.passengerindex, 1);
  }
}

const actions = {
  async getCruisebyCruiseType ({commit}, cruisetypeid) {   
      commit('CruisesbyCruiseTypes', await CruiseService.getCruisesbyCruiseType(cruisetypeid))         
  },
  async addBooking ({commit}, booking) {
    await BookingService.addBooking(booking).then((response) => {
      if (response) {
        if (response.success) {
            commit('SET_BOOKING_DETAILS', response.data[0])     
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