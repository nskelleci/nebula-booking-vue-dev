import MarketService from '../../Services/MarketServices'
const state = {
  markets : [],
  market : {}
}

const mutations = {
  SET_MARKETS (state, markets) {
    state.markets = markets
  },

  SET_MARKET  (state, market) {
    state.market = market
  }

}

const getters = {
  getFirstMarket: state => {
    return state.markets[0]
  }
}

const actions = {
  async getMarkets ({commit}) {
    commit('SET_MARKETS', await MarketService.fetchMarkets())
  },

  async getMarket ({commit}, marketid) {   
    const country = await MarketService.getMarket(marketid) 
    commit('SET_MARKET', country)         
  },

  async addMarket (_, market) {
    await MarketService.addMarket(market).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getMarkets')
        }
      }
    })
  },

  async updateMarket (_, market) {
    await MarketService.updateMarket(market)
    this.dispatch('getMarkets')
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}