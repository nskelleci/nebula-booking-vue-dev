import CruiseService from '../../Services/CruiseServices'
import PassengerService from '../../Services/PassengerService'
const state = {
  passangers : [],
  passanger : {}
}

const mutations = {
  SET_PASSENGERS (state, passangers) {
    state.passangers = passangers
  },

  SET_PASSENGER (state, passanger) {
    state.passanger = passanger
  }
}

const actions = {
  async getPassenger ({commit}, pasaportno) {   
      commit('SET_PASSENGER', await PassengerService.getPassenger(pasaportno))         
  },
  async addPassenger (_, passenger) {
    await PassengerService.addPassenger(passenger).then((response) => {
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