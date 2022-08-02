import axios from 'axios'

const API_URL = '/api/riders/'

// Create new rider
const createRider = async (riderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, riderData, config)

  return response.data
}

// Get user's riders
const getRiders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const riderService = {
  createRider,
  getRiders,
}

export default riderService
