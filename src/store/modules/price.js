import PriceService from '../../Services/priceService'
const state = {
  filteredPrices : [],
  priceFilter : {
    'selectedVessel' : null,
    'selectedCruiseType' : null,
    'selectedMarket' : null,
    'selectedSeason' : null
  }
 
}


const mutations = {
  SET_FILTEREDPRICES (state, filteredPrices) {
    state.filteredPrices = filteredPrices
  },

  SET_VALUES (state, filter) {
    console.log('mutationa gelen filter', filter)
    state.priceFilter = filter
  }
}


const actions = {
  async getFilteredPrices ({commit}, filter) {
    console.log('actiona gelen filter===', filter)
    commit('SET_FILTEREDPRICES', await PriceService.getPrices(filter))
    console.log(state.filteredPrices)
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

  }

  // async updateVessel (_, vessel) {
  //   await VesselService.updateVessel(vessel)
  //   this.dispatch('getVessels')
          
  // }

}

export default {
  state,
  mutations,
  actions
  
}