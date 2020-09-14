import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  

  
export default {
  
  async addBedType (bedtype)  {
    return await axios.post(`${apiUri.apiUri.URI}/bedtype/add`, bedtype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateBedType (bedtype) {
    return await axios.put(`${apiUri.apiUri.URI}/bedtype/update/${bedtype._id}`, bedtype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
   
  },
  async fetchBedTypes (vesselid) {
    return await axios.get(`${apiUri.apiUri.URI}/bedtype/vessel/${vesselid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  }
}

