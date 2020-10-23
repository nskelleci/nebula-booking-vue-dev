import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addCountry (country)  {
    return await axios.post(`${apiUri.apiUri.URI}/country/addCountry`, country)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateCountry (country) {
    return await axios.put(`${apiUri.apiUri.URI}/country/updateCountry/${country._id}`, country)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
   
  },
  async fetchCountries () {
    // 'http://localhost:7878/api/v1/country'
    console.log('dasdasd', apiUri.apiUri.URI)
    return await axios.get(`${apiUri.apiUri.URI}/country`)
      .then((response) => {
        return response.data.data
        
      })
      .catch((error) => { notification.notifyMe(error) })
  },

  async getCountry (countryid) {
    return await axios.get(`${apiUri.apiUri.URI}/country/${countryid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { return (error) })
  }
}