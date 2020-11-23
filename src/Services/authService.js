import axios from '../axios'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async login (agencyCode, password)  {
    return await axios.post(`${apiUri.apiUri.URI}/auth/login`, {agencyCode, password}, 
      {
        withCredentials:true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }})
      .then(response => {                
        notification.notifyMe(response.data)

        return response
      })
      .catch((error) => { return (error) })
  }

}