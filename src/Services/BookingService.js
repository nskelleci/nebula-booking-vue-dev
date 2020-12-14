import axios from '../axios'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addBooking (booking)  {
    return await axios.post(`${apiUri.apiUri.URI}/booking/createBooking`, booking)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },
  async updateBooking (booking) {
    return await axios.put(`${apiUri.apiUri.URI}/booking/updateBooking/${booking._id}`, booking)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },
  async getAllbookingsbyagency () {
    return await axios.get(`${apiUri.apiUri.URI}/booking/mybookings/`)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data
      })
      .catch((error) => { notification.notifyMe(error)  })
  },
  async getBookingbyId (bookingid) {
    return await axios.get(`${apiUri.apiUri.URI}/booking/getBooking/${bookingid}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => { 
        console.log(error);
      })
  },

  async getBookingsByCruise (cruiseid) {
    return await axios.get(`${apiUri.apiUri.URI}/booking/getBookingsByCruise/${cruiseid}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => { 
        console.log(error);
      })
  },
}