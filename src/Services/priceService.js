import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addPrice (price)  {
    return await axios.post(`${apiUri.apiUri.URI}/price/add`, price)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updatePrice (price) {
    return await axios.put(`${apiUri.apiUri.URI}/price/updatePrice/${price._id}`, price)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },

  async getPrices (filter) {
    // 'http://localhost:7878/api/v1/vessel'
    console.log('servise gelen filter ===', filter)
    // router.get("/vessel/:vessel/cruiseType/:cruiseType/market/:market/season/:season", getPrices)
    if (!filter.selectedVessel && !filter.selectedCruiseType && !filter.selectedMarket && !filter.selectedSeason) {
      return
    }
    return await axios.get(`${apiUri.apiUri.URI}/price/vessel/${filter.selectedVessel._id}/cruiseType/${filter.selectedCruiseType._id}/market/${filter.selectedMarket._id}/season/${filter.selectedSeason._id}`)
      .then((response) => {
        // commit('SET_VESSELS', response.data.data)
        return response.data.data
        //   this.vessels = response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  }
}