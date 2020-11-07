import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  

export default {

  async addCabin (cabin)  {
    return await axios.post(`${apiUri.apiUri.URI}/cabin/add`, cabin)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateCabin (cabin) {
    return await axios.put(`${apiUri.apiUri.URI}/cabin/update/${cabin._id}`, cabin)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
   
  },
  async fetchCabins (vesselid) {
    return await axios.get(`${apiUri.apiUri.URI}/cabin/vessel/${vesselid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  },
  async fetchAvaliableCabinsbyCabinCategoryCruise (params) {
    
    return await axios.get(`${apiUri.apiUri.URI}/cabin/cruise/${params.cruise}/cabinCategory/${params.cabinCategory}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  },
}

