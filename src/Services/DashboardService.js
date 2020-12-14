import axios from '../axios'
import notification from '../assets/utils/notify'
import router from '../router'
const apiUri = require('../Helpers/URI')  
export default {
    async fetchCruiseListwithOccupancy () {
          return await axios.get(`${apiUri.apiUri.URI}/adminDashboard/cruiseList`)
          .then((response) => {
            return response.data.data
          })
          .catch((error) => { 
            router.push('/pages/login').catch(() => {});
            notification.notifyMe(error); 
        })
      }
}