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
}