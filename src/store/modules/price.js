import PriceService from '../../Services/priceService'
const state = {
  filteredPrices : [],
  priceFilter : {
    'selectedVessel' : null,
    'selectedCruiseType' : null,
    'selectedMarket' : null,
    'selectedSeason' : null
  },
  calculatedFrontEndPrice:{},
  calculatedBackEndPrice:[],
  calculatedBackEndPriceSingle:{}
}


const mutations = {
  SET_FILTEREDPRICES (state, filteredPrices) {
    state.filteredPrices = filteredPrices
  },

  SET_VALUES (state, filter) {
    console.log('mutationa gelen filter', filter)
    state.priceFilter = filter
  },

  SET_CALCULATED_FRONTEND_PRICE (state, calculatedFrontEndPrice) {
    state.calculatedFrontEndPrice=calculatedFrontEndPrice
    console.log("calculatedFrontEndPrice",state.calculatedFrontEndPrice);
  },

  SET_CALCULATED_BACKEND_PRICE (state, calculatedBackEndPrice) {
    state.calculatedBackEndPrice=calculatedBackEndPrice
    console.log("calculatedBackEndPrice---",state.calculatedBackEndPrice);
  },

  SET_CALCULATED_BACKEND_PRICE_SINGLE (state, calculatedBackEndPriceSingle) {
    state.calculatedBackEndPriceSingle=calculatedBackEndPriceSingle
    //console.log("calculatedBackEndPriceSingle---",state.calculatedBackEndPriceSingle);
  }
}


const actions = {
  async getFilteredPrices ({commit}, filter) {
    commit('SET_FILTEREDPRICES', await PriceService.getPrices(filter))
  },

  updateFilter ({commit}, filter) {
    commit('SET_VALUES', filter)
  },

  async addPrice (_, price) {
    await PriceService.addPrice(price).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getFilteredPrices', state.priceFilter)
        }
      }
    })
  },

  async updatePrice (_, price) {
    await PriceService.updatePrice(price).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getFilteredPrices', state.priceFilter)
        }
      }
    })
  },

  async deletePrice (_, priceId) {
    await PriceService.deletePrice(priceId).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getFilteredPrices', state.priceFilter)
        }
      }
    })
  },

  async calculatePriceFrontEnd ({commit}, data) {
    await PriceService.calculatePriceFrontEnd(data).then((response) => {
      if (response) {
        if (response.success) {
          console.log("response",response);
          commit('SET_CALCULATED_FRONTEND_PRICE', response.data)
        }
      }
    })
  },

  async calculatePriceBackEnd ({commit}, data) {
    await PriceService.calculatePriceBackEnd(data).then((response) => {
      if (response) {
        if (response.success) {
          console.log("response",response);
          commit('SET_CALCULATED_BACKEND_PRICE', response.data)
        }
      }
    })
  },

  async calculatePriceBackEndSingle ({commit}, data) {
    await PriceService.calculatePriceBackEndSingle(data).then((response) => {
      if (response) {
        if (response.success) {
          console.log("response",response);
          commit('SET_CALCULATED_BACKEND_PRICE_SINGLE', response.data)
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