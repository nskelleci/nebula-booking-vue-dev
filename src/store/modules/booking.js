import CruiseService from '../../Services/CruiseServices'
import BookingService from '../../Services/BookingService'
import BlockedCabinService from '../../Services/BlockedCabinService'
const state = {
  CruisesbyCruiseTypes: [],
  CruisesbyCruiseType: {},
  BookingDetails: [],
  AllBookingsByAgency: [],
  getBookingID: {},
  BookingsByCruise: [],
  getBookingsToday: {},
  getBookingsStatistic: {},
  AllBookingsByAgencyDetail: {}
}

const mutations = {
  CruisesbyCruiseTypes(state, CruisesbyCruiseTypes) {
    state.CruisesbyCruiseTypes = CruisesbyCruiseTypes
  },

  CruisesbyCruiseType(state, CruisesbyCruiseType) {
    state.CruisesbyCruiseType = CruisesbyCruiseType
  },

  SET_BOOKING_DETAILS(state, booking) {
    state.BookingDetails.push(booking)
  },
  SET_BOOKING_DETAILS_PASSENGER(state, params) {
    state.BookingDetails[params.index].Passengers.push(params.passanger)
  },
  SET_AGENCY_BOOKING_PASSENGER(state, params) {
    state.AllBookingsByAgency[params.index].Passengers.push(params.passanger)
  },
  CLEAR_BOOKING_DETAILS(state) {
    state.BookingDetails = []
  },
  CLEAR_BOOKING_DETAILS_WITH_INDEX(state, params) {
    state.BookingDetails[params.bookingindex].Passengers.splice(params.passengerindex, 1);
  },
  SET_ALL_BOOKING(state, AllBookingsByAgency) {
    state.AllBookingsByAgency = AllBookingsByAgency
  },
  SET_ALL_BOOKING_AGENCY_DETAIL(state, AllBookingsByAgencyDetail) {
    state.AllBookingsByAgencyDetail = AllBookingsByAgencyDetail
  },
  SET_BOOKING_ID(state, getBookingID) {
    state.getBookingID = getBookingID
  },

  //Seçilen booking in passenger larını günceller
  SET_PASSENGERS_UPDATE_BOOKING(state, passengers) {
    state.getBookingID.Passengers = passengers
  },

  //Seçilen booking passengerlarını index numarasına göre siler
  DELETE_PASSENGER_GETBOOKINGID(state, index) {
    state.getBookingID.Passengers.splice(index, 1);
  },

  SET_BOOKING_BY_CRUISE_ID(state, BookingsByCruise) {
    state.BookingsByCruise = BookingsByCruise
  },

  SET_BOOKINGS_TODAY(state, getBookingsToday) {
    state.getBookingsToday = getBookingsToday
  },

  SET_BOOKINGS_STATISTIC(state, getBookingsStatistic) {
    state.getBookingsStatistic = getBookingsStatistic
  },
}

const actions = {
  async getCruisebyCruiseType({ commit }, cruisetypeid) {
    commit('CruisesbyCruiseTypes', await CruiseService.getCruisesbyCruiseType(cruisetypeid))
  },
  async addBooking({ commit }, booking) {
    return await BookingService.addBooking(booking).then((response) => {
      if (response) {
        console.log('store icinde response', response)
        if (response.success) {
          commit('SET_BOOKING_DETAILS', response.data[0])
          return response
        }
      }
    })
  },
  async updateBooking(_, booking) {
    await BookingService.updateBooking(booking).then((response) => {
      if (response) {
        if (response.success) {
          console.log("Güncellendi", response);
        }
      }
    })
  },
  async getAllbookingsbyagency({ commit },) {
    await BookingService.getAllbookingsbyagency().then((response) => {
      if (response) {
        if (response.success) {
          commit('SET_ALL_BOOKING', response.data)
        }
      }
    })
  },
  async getAllbookingsbyagencydetail({ commit },) {
    await BookingService.getAllbookingsbyagencydetail().then((response) => {
      if (response) {
        if (response.success) {
          commit('SET_ALL_BOOKING_AGENCY_DETAIL', response.data)
        }
      }
    })
  },



  async getBookingbyId({ commit }, bookingid) {
    await BookingService.getBookingbyId(bookingid).then((response) => {
      if (response) {
        if (response.success) {
          commit('SET_BOOKING_ID', response.data)
        }
      }
    })
  },
  async getBookingsByCruise({ commit }, cruiseid) {
    await BookingService.getBookingsByCruise(cruiseid).then((response) => {
      if (response) {
        if (response.success) {
          commit('SET_BOOKING_BY_CRUISE_ID', response.data)
        }
      }
    })
  },

  async getBookingsToday({ commit }) {
    await BookingService.getBookingsToday().then((response) => {
      if (response) {
        if (response.success) {
          commit('SET_BOOKINGS_TODAY', response.data)
        }
      }
    })
  },

  async bookingPriceStatistic({ commit }) {
    await BookingService.bookingPriceStatistic().then((response) => {
      if (response) {
        if (response.success) {
          commit('SET_BOOKINGS_STATISTIC', response)
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