import PortService from '../../Services/PortServices'
const state = {
  ports : [],
  port : {}
}

const mutations = {
  SET_PORTS (state, ports) {
    state.ports = ports
  },

  SET_PORT (state, port) {
    state.port = port
  }
}

const actions = {
  async getPorts ({commit}) {
    commit('SET_PORTS', await PortService.fetchPorts())
  },

  async getPort ({commit}, portid) {   
    const port = await PortService.getPort(portid) 
    commit('SET_PORT', port)         
  },

  async addPort (_, port) {
    await PortService.addPort(port).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getPorts')
        }
      }
    })
  },

  async updatePort (_, port) {
    await PortService.updatePort(port)
    this.dispatch('getPorts')
          
  }

}

export default {
  state,
  mutations,
  actions
}