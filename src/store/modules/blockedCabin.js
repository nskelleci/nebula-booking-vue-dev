import BlockedCabinService from '../../Services/BlockedCabinService'

const state = {
    blockedCabin:{},
    blockedCabinsbyCruise:[]
}

const getters = {}

const mutations = {
    SET_BLOCKED_CABIN(state,blockedCabin){
        state.blockedCabin=blockedCabin
    },
    SET_BLOCKED_CABINS_BY_CRUISE(state,blockedCabinsbyCruise){
        state.blockedCabinsbyCruise=blockedCabinsbyCruise
    }
}

const actions = {
    async addBlockedCabin (_, booking) {
        await BlockedCabinService.addBlockedCabin(booking).then((response) => {
            if (response) {
                console.log("addBlockedCabin---------->",response);
                return response
            }
        })
    },
    async updateBlockedCabin (_, blockedCabin) {
        await BlockedCabinService.updateBlockedCabin(blockedCabin).then((response) => {
            if (response) {
                if (response.success) {
                    
                }
            }
        })
    },
    async getBlockedCabin ({commit},params) {
        await BlockedCabinService.getBlockedCabin(params).then((response) => {
            if (response) {
                if (response.success) {
                    commit('SET_BLOCKED_CABIN', response.data[0])
                }
            }
        })
    },
    async getBlockedCabinsByCruise ({commit},cruiseid) {
        await BlockedCabinService.getAllBlockedCabinsbyCruise(cruiseid).then((response) => {
            if (response) {
                if (response.success) {
                    commit('SET_BLOCKED_CABINS_BY_CRUISE', response.data)
                }
            }
        })
    }

}

export default {
  state,
  getters,
  mutations,
  actions
}