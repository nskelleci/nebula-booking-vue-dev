import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addAgencyType (agencytype)  {
    return await axios.post(`${apiUri.apiUri.URI}/agencytype/add`, agencytype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateAgencyType (agencytype) {
    return await axios.put(`${apiUri.apiUri.URI}/agencytype/updateAgencyType/${agencytype._id}`, agencytype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },

  async fetchAgencyTypes () {
    return await axios.get(`${apiUri.apiUri.URI}/agencytype`)
      .then((response) => {
        return response.data.data
        
      })
      .catch((error) => { notification.notifyMe(error) })
  },

  async getAgency (agencyid) {
    return await axios.get(`${apiUri.apiUri.URI}/agencytype/${agencyid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { return (error) })
  }
}