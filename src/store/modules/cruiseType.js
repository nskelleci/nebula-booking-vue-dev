import CruiseTypeService from '../../Services/CruiseTypeServices'
const state = {
  cruisetypes : [],
  cruiseTypesByVessel : [],
  cruisetype : {}
}

const mutations = {
  SET_CRUISETYPES (state, cruisetypes) {
    state.cruisetypes = cruisetypes
  },

  SET_CRUISETYPE (state, cruisetype) {
    state.cruisetype = cruisetype
  },

  SET_CRUISETYPESBYVESSEL (state, cruisetypes) {
    state.cruiseTypesByVessel = cruisetypes
  }
}

const getters = {
  getFirstCruiseType: state => {
    return state.cruiseTypesByVessel[0]
  }

}

const actions = {
  async getCruiseTypes ({commit}) {
    commit('SET_CRUISETYPES', await CruiseTypeService.fetchCruiseTypes())
  },

  async getCruiseTypesByVessel ({commit}, vesselid) {
    console.log("action icine gelen vesselid", vesselid)
    commit('SET_CRUISETYPESBYVESSEL', await CruiseTypeService.fetchCruiseTypesbyVessel(vesselid))
  },

  async getCruiseType ({commit}, cruisetypeid) {   
    const cruise = await CruiseTypeService.geCruise(cruisetypeid) 
    commit('SET_CRUISETYPE', cruise)         
  },

  async addCruiseType (_, cruisetype) {
    await CruiseTypeService.addCruiseType(cruisetype).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getCruiseTypes')
        }
      }
    })
  },

  async updateCruiseType (_, cruisetype) {
    await CruiseTypeService.updateCruiseType(cruisetype)
    this.dispatch('getCruiseTypes')
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}