import axios from '../axios'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addBlockedCabin (booking)  {
    return await axios.post(`${apiUri.apiUri.URI}/blockedCabin/add`, booking)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },
  async updateBlockedCabin(booking) {
    return await axios.put(`${apiUri.apiUri.URI}/blockedCabin/update/${booking._id}`, booking)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },
  async getAllBlockedCabinsbyCruise (cruiseid) {
    return await axios.get(`${apiUri.apiUri.URI}/blockedCabin/cruise/${cruiseid}`)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },
  async getAllBlockedCabins () {
    return await axios.get(`${apiUri.apiUri.URI}/blockedCabin/getAll/`)
      .then((response) => {
        notification.notifyMe(response.data)
        console.log(response.data.data);
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },
  async getBlockedCabin (params) {
    return await axios.post(`${apiUri.apiUri.URI}/blockedCabin/cabin/`,params)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },
}