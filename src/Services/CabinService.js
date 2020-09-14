import axios from '@/axios.js'
import notification from '../assets/utils/notify'

export default {

  async addCabin (cabin)  {
    return await axios.post('http://localhost:7878/api/v1/cabin/add', cabin)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateCabin (cabin) {
    return await axios.put(`http://localhost:7878/api/v1/cabin/update/${cabin._id}`, cabin)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
   
  },
  async fetchCabins (vesselid) {
    return await axios.get(`http://localhost:7878/api/v1/cabin/vessel/${vesselid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  }
}

