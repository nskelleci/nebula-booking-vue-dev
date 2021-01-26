import axios from '../axios'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addPaymentRequest (agency)  {
    return await axios.post(`${apiUri.apiUri.URI}/paymentRequest`, agency)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updatePaymentRequest (paymentRequest) {
    return await axios.put(`${apiUri.apiUri.URI}/paymentRequest/${paymentRequest._id}`, paymentRequest)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },

  async fetchAllPaymentRequest() {
    return await axios.get(`${apiUri.apiUri.URI}/paymentRequest`)
      .then((response) => {
        console.log("----fetchAllPaymentRequest---",response);
        return response.data.data
        
      })
      .catch((error) => { notification.notifyMe(error) })
  },
}