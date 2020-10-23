import CountryService from '../../Services/CountryServices'
const state = {
  countries : [],
  country : {}
}

const mutations = {
  SET_COUNTRIES (state, countries) {
    state.countries = countries
  },

  SET_COUNTRY (state, country) {
    state.country = country
  }


}

const actions = {
  async getCountries ({commit}) {
    commit('SET_COUNTRIES', await CountryService.fetchCountries())
  },

  async getCountry ({commit}, countryid) {   
    const country = await CountryService.getCountry(countryid) 
    commit('SET_COUNTRY', country)         
  },

  async addCountry (_, country) {
    await CountryService.addCountry(country).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getCountries')
        }
      }
    })

  },

  async updateCountry (_, country) {
    await CountryService.updateCountry(country)
    this.dispatch('getCountries')
          
  }

}

export default {
  state,
  mutations,
  actions
}