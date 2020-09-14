import CabinCategoryService from '../../Services/CabinCategoryService'

const state = {
  cabinCategories : []

}

const getters = {

}

const mutations = {
  SET_CABINCATEGORIES (state, cabincategories) {
    state.cabinCategories = cabincategories
  }
}

const actions = {
  async getCabinCategories ({commit}, vesselid) {
    
    commit('SET_CABINCATEGORIES', await CabinCategoryService.fetchCabinCategories(vesselid))
  },

  async addCabinCategory (_, cabincategory) {
    await CabinCategoryService.addCabinCategory(cabincategory).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getCabinCategories', cabincategory.vessel)
        }
      }
    })

  },
  async updateCabinCategory (_, cabincategory) {
    await CabinCategoryService.updateCabinCategory(cabincategory)
    this.dispatch('getCabinCategories', cabincategory.vessel)
          
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}