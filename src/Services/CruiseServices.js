import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addCruise (cruise)  {
    return await axios.post(`${apiUri.apiUri.URI}/cruise/add`, cruise)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateCruise (cruise) {
    return await axios.put(`${apiUri.apiUri.URI}/cruise/updatecruise/${cruise._id}`, cruise)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },

  async fetchCruises () {
    return await axios.get(`${apiUri.apiUri.URI}/cruise/GetAll/`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  },

  async getCruise (cruiseid) {
    return await axios.get(`${apiUri.apiUri.URI}/cruise/getCruises/${cruiseid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { return (error) })
  },

  async getCruisesbyCruiseType (cruisetype) {
    return await axios.get(`${apiUri.apiUri.URI}/cruise/getCruisesbyCruiseType/${cruisetype}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { return (error) })
  }
}