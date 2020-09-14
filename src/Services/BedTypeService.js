import axios from '@/axios.js'
import notification from '../assets/utils/notify'

  
export default {
  
  async addBedType (bedtype)  {
    return await axios.post('http://localhost:7878/api/v1/bedtype/add', bedtype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data        
      })
      .catch((error) => { return (error) })
  },

  async updateBedType (bedtype) {
    return await axios.put(`http://localhost:7878/api/v1/bedtype/update/${bedtype._id}`, bedtype)
      .then((response) => {
        notification.notifyMe(response.data)
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error)  })
   
  },
  async fetchBedTypes (vesselid) {
    return await axios.get(`http://localhost:7878/api/v1/bedtype/vessel/${vesselid}`)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => { notification.notifyMe(error) })
  }
}

