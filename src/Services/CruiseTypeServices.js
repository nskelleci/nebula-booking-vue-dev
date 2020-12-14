import axios from '../axios'
import notification from '../assets/utils/notify'
import router from '../router'
const apiUri = require('../Helpers/URI')  
export default {

  async addCruiseType (cruisetype)  {
    return await axios.post(`${apiUri.apiUri.URI}/cruiseType/add`, cruisetype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { 
        router.push('/pages/login').catch(() => {});
        notification.notifyMe(error); 
    })
  },

  async updateCruiseType (cruisetype) {
    return await axios.put(`${apiUri.apiUri.URI}/cruiseType/updateCruiseType/${cruisetype._id}`, cruisetype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { 
        router.push('/pages/login').catch(() => {});
        notification.notifyMe(error); 
    })
  },

  async fetchCruiseTypesbyVessel (vesselid) {
  
    return await axios.get(`${apiUri.apiUri.URI}/cruiseType/vessel/${vesselid}`)
      .then((response) => {
        return response.data.data
        
      })
      .catch((error) => { 
        router.push('/pages/login').catch(() => {});
        notification.notifyMe(error); 
    })
  },

  async fetchCruiseTypes () {
  
    return await axios.get(`${apiUri.apiUri.URI}/cruiseType/`)
      .then((response) => {
        return response.data.data
        
      })
      .catch((error) => { 
        router.push('/pages/login').catch(() => {});
        notification.notifyMe(error); 
    })
  }
}