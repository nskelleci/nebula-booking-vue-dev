import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addAgency (agency)  {
    return await axios.post(`${apiUri.apiUri.URI}/agency/create`, agency)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateAgency (agency) {
    return await axios.put(`${apiUri.apiUri.URI}/agency/update/${agency._id}`, agency)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },

  async fetchAgencies () {
    return await axios.get(`${apiUri.apiUri.URI}/agency/all`)
      .then((response) => {
        return response.data.data
        
      })
      .catch((error) => { notification.notifyMe(error) })
  },

  async getAgency (agencyid) {
    return await axios.get(`${apiUri.apiUri.URI}/agency/${agencyid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { return (error) })
  }
}