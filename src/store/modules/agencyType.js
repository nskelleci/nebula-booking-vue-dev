import AgencyTypeService from '../../Services/AgencyTypeService'
const state = {
  agencytypes : [],
  agencytype : {}
}

const mutations = {
  SET_AGENCYTYPES (state, agencytypes) {
    state.agencytypes = agencytypes
  },

  SET_AGENCYTYPE (state, agencytype) {
    state.agencytype = agencytype
  }
}

const actions = {
  async getAgencyTypes ({commit}) {
    commit('SET_AGENCYTYPES', await AgencyTypeService.fetchAgencyTypes())
  },

  async getAgencyType ({commit}, agencytypeid) {   
    const agency = await AgencyTypeService.getAgency(agencytypeid) 
    commit('SET_AGENCYTYPE', agency)         
  },

  async addAgencyType (_, agencytype) {
    await AgencyTypeService.addAgencyType(agencytype).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getAgencyTypes')
        }
      }
    })
  },

  async updateAgencyType (_, agencytype) {
    await AgencyTypeService.updateAgencyType(agencytype)
    this.dispatch('getAgencyTypes')
  }

}

export default {
  state,
  mutations,
  actions
}