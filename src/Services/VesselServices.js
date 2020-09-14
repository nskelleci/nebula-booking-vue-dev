import axios from '@/axios.js'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addVessel (vessel)  {
    return await axios.post(`${apiUri.apiUri.URI}/vessel/addVessel`, vessel)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateVessel (vessel) {
    return await axios.put(`${apiUri.apiUri.URI}/vessel/updateVessel/${vessel._id}`, vessel)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
   
  },
  async fetchVessels () {
    // 'http://localhost:7878/api/v1/vessel'
    console.log('dasdasd', apiUri.apiUri.URI)
    return await axios.get(`${apiUri.apiUri.URI}/vessel`)
      .then((response) => {
        // commit('SET_VESSELS', response.data.data)
        return response.data.data
        //   this.vessels = response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  },

  async getVessel (vesselid) {
      return await axios.get(`${apiUri.apiUri.URI}/vessel/${vesselid}`)
        .then((response) => {
          return response.data.data
        })
        .catch((error) => { reject(error) })
    }
}


