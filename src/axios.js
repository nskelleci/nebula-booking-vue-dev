// axios
import axios from 'axios'

const baseURL = ''

export default axios.create({
  baseURL,
  // You can add your headers here

  withCredentials:true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
