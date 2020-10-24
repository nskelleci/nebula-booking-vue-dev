import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addCruiseType (cruisetype)  {
    return await axios.post(`${apiUri.apiUri.URI}/cruiseType/add`, cruisetype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateCruiseType (cruisetype) {
    return await axios.put(`${apiUri.apiUri.URI}/cruiseType/updateCruiseType/${cruisetype._id}`, cruisetype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },

  async fetchCruiseTypes () {
    // 'http://localhost:7878/api/v1/country'
    //console.log('dasdasd', apiUri.apiUri.URI)
    return await axios.get(`${apiUri.apiUri.URI}/cruiseType`)
      .then((response) => {
        return response.data.data
        
      })
      .catch((error) => { notification.notifyMe(error) })
  }
}