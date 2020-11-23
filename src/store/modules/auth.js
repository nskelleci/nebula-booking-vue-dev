import router from '../../router'
import authService from '../../Services/authService'
const state = {
  isLoggedIn : false,
  currentUser : {}
}

const mutations = {
  IS_LOGGEDIN (state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },

  SET_CURRENT_USER (state, user) {
    state.currentUser = user
  }
}

const actions = {
  async login ({commit}, params) {
    await authService.login(params.agencyCode, params.password).then(response => {
      
      if  (response) {
        if (response.status === 200) {          
          localStorage.setItem('agency', JSON.stringify(response.data.data))
          commit('SET_CURRENT_USER',  JSON.stringify(response.data.data))
          commit('IS_LOGGEDIN', true)
          router.push('/')
        }
      }
    }).catch(err => console.log(err))
  }

}

export default {
  state,
  mutations,
  actions
}