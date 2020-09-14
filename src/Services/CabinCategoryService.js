import axios from '@/axios.js'
import notification from '../assets/utils/notify'

export default {

  async addCabinCategory (cabincategory)  {
    return await axios.post('http://localhost:7878/api/v1/cabinCategories/add', cabincategory)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateCabinCategory (cabincategory) {
    return await axios.put(`http://localhost:7878/api/v1/cabinCategories/update/${cabincategory._id}`, cabincategory)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
   
  },
  async fetchCabinCategories (vesselid) {
    return await axios.get(`http://localhost:7878/api/v1/cabinCategories/vessel/${vesselid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  }
}

