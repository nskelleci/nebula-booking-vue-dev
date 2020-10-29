import AgencyService from '../../Services/AgencyService'
const state = {
  agencies : [],
  agency : {}
}

const mutations = {
  SET_AGENCIES (state, agencies) {
    state.agencies = agencies
  },

  SET_AGENCY (state, agency) {
    state.agency = agency
  }
}

const actions = {
  async getAgencies ({commit}) {
    commit('SET_AGENCIES', await AgencyService.fetchAgencies())
  },

  async getAgency ({commit}, agencyid) {   
    const agency = await AgencyService.getAgency(agencyid) 
    commit('SET_AGENCYCREATE', agency)         
  },

  async addAgency (_, agency) {
    await AgencyService.addAgency(agency).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getAgencies')
        }
      }
    })
  },

  async updateAgency (_, agencytype) {
    await AgencyService.updateAgency(agencytype)
    this.dispatch('getAgencies')
  }

}

export default {
  state,
  mutations,
  actions
}