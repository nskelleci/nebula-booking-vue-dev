import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  


export default {

  async addCabinCategory (cabincategory)  {
    return await axios.post(`${apiUri.apiUri.URI}/cabinCategories/add`, cabincategory)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateCabinCategory (cabincategory) {
    return await axios.put(`${apiUri.apiUri.URI}/cabinCategories/update/${cabincategory._id}`, cabincategory)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
   
  },
  async fetchCabinCategories (vesselid) {
    return await axios.get(`${apiUri.apiUri.URI}/cabinCategories/vessel/${vesselid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  }
}

