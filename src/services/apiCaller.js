import axios from 'axios'
import { BACKEND_BASE_URL } from '../constants'

export const apiCaller = (token = '') => {
  const headers = {
    'Content-Type': 'application/json'
  }

  // If token length is greater than 2, add Authorization header
  if (token && token.length > 0) {
    headers.Authorization = `Bearer ${token}`
  }

  return axios.create({
    baseURL: BACKEND_BASE_URL,
    timeout: 20000,
    headers
  })
}
