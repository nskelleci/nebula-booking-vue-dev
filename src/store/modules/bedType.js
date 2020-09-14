import BedTypeService from '../../Services/BedTypeService'

const state = {
  bedtypes : []
}

const getters = {

}

const mutations = {
  SET_BEDTYPES (state, bedtypes) {
    state.bedtypes = bedtypes
  },

  ADD_BEDTYPE (state, bedtype) {
    state.bedTypes.push(bedtype)
  },
  SET_BEDTYPE (state, bedtype) {
    state.bedType = bedtype
  }
}

const actions = {
  async getBedTypes ({commit}, vesselid) {
    
    commit('SET_BEDTYPES', await BedTypeService.fetchBedTypes(vesselid))
  },
  
  async addBedType (_, bedtype) {
    await BedTypeService.addBedType(bedtype).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getBedTypes', bedtype.vessel)
        }
      }
    })

  },

  async updateBedType (_, bedtype) {
    await BedTypeService.updateBedType(bedtype)
    this.dispatch('getBedTypes', bedtype.vessel)
          
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}