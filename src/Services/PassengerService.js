import axios from '../axios'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addPassenger (passenger)  {
    return await axios.post(`${apiUri.apiUri.URI}/passenger/add`, passenger)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async getPassenger (passportNo)  {
    console.log(passportNo)
    return await axios.get(`${apiUri.apiUri.URI}/passenger/getPassenger`, passportNo)
      .then((response) => {
        console.log(response)
        return response.data
      })
      .catch((error) => { return (error) })
  },
}