import axios from '../axios'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addCruise (cruise)  {
    return await axios.post(`${apiUri.apiUri.URI}/cruise/add`, cruise)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateCruise (cruise) {
    return await axios.put(`${apiUri.apiUri.URI}/cruise/updatecruise/${cruise._id}`, cruise)
      .then((response) => {
        notification.notifyMe(response.data)
        console.log(response.data.data);
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },

  async fetchCruises () {
    return await axios.get(`${apiUri.apiUri.URI}/cruise/GetAll/`, {
      withCredentials:true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  },

  async getCruiseDetail (cruiseid) {
    return await axios.get(`${apiUri.apiUri.URI}/cruise/detail/${cruiseid}`)
      .then((response) => {
        return response.data.data[0]
      })
      .catch((error) => { return (error) })
  },

  async getCruisesbyCruiseType (cruisetype) {
    return await axios.get(`${apiUri.apiUri.URI}/cruise/getCruisesbyCruiseType/${cruisetype}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { return (error) })
  },
}