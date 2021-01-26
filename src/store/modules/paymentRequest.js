import PaymentRequestService from '../../Services/PaymentRequestService'
const state = {
  paymentRequests : []
}

const mutations = {
  SET_PAYMENT_REQUEST (state, paymentRequests) {
    state.paymentRequests = paymentRequests
  },
}

const actions = {
  async getPaymentRequest ({commit}) {
    commit('SET_PAYMENT_REQUEST', await PaymentRequestService.fetchAllPaymentRequest())
  },

  async addPaymentRequest (_, paymentRequest) {
    await PaymentRequestService.addPaymentRequest(paymentRequest).then((response) => {
      if (response) {
        if (response.success) {
          this.dispatch('getPaymentRequest')
        }
      }
    })
  },

  async updatePaymentRequest (_, paymentRequest) {
    await PaymentRequestService.updatePaymentRequest(paymentRequest)
    this.dispatch('getPaymentRequest')
  }

}

export default {
  state,
  mutations,
  actions
}