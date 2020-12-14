import BlockedCabinService from '../../Services/BlockedCabinService'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    async addBlockedCabin (_, booking) {
        await BlockedCabinService.addBlockedCabin(booking).then((response) => {
            if (response) {
                return response
            }
        })
    },
    async updateBlockedCabin (_, booking) {
        await BlockedCabinService.updateBlockedCabin(booking).then((response) => {
            if (response) {
                if (response.success) {
                    
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