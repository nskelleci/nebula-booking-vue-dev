import axios from '../axios'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addPort (port)  {
    return await axios.post(`${apiUri.apiUri.URI}/port/addPort`, port)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updatePort (port) {
    return await axios.put(`${apiUri.apiUri.URI}/port/updatePort/${port._id}`, port)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },

  async fetchPorts () {
    // 'http://localhost:7878/api/v1/country'
    console.log('dasdasd', apiUri.apiUri.URI)
    return await axios.get(`${apiUri.apiUri.URI}/port`)
      .then((response) => {
        return response.data.data
        
      })
      .catch((error) => { notification.notifyMe(error) })
  },

  async getPort (portid) {
    return await axios.get(`${apiUri.apiUri.URI}/port/${portid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { return (error) })
  }
}