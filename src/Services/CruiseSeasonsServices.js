import axios from '../axios'
import notification from '../assets/utils/notify'
const apiUri = require('../Helpers/URI')  
export default {

  async addCruiseSeason (cruiseseason)  {
    console.log(cruiseseason);
    return await axios.post(`${apiUri.apiUri.URI}/season/add`, cruiseseason)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateCruiseSeason (cruiseseason) {
    
    return await axios.put(`${apiUri.apiUri.URI}/season/updateSeason/${cruiseseason._id}`, cruiseseason)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) ; console.log(cruiseseason); })
  },
  
  async fetchCruiseSeasons () {
    // 'http://localhost:7878/api/v1/vessel'
    console.log('dasdasd', apiUri.apiUri.URI)
    return await axios.get(`${apiUri.apiUri.URI}/season`)
      .then((response) => {
        // commit('SET_VESSELS', response.data.data)
        return response.data.data
        //   this.vessels = response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  }
}