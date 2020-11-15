import axios from '../axios'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addMarket (market)  {
    return await axios.post(`${apiUri.apiUri.URI}/market/add`, market)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateMarket (market) {
    return await axios.put(`${apiUri.apiUri.URI}/market/updateMarket/${market._id}`, market)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },

  async fetchMarkets () {
    // 'http://localhost:7878/api/v1/country'
    //console.log('dasdasd', apiUri.apiUri.URI)
    return await axios.get(`${apiUri.apiUri.URI}/market`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  },

  async getMarket (marketid) {
    return await axios.get(`${apiUri.apiUri.URI}/market/${marketid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { return (error) })
  }
}