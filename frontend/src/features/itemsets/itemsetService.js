import axios from 'axios'

const API_URL = '/api/itemsets/'

// Create new itemset
const createItemset = async (itemsetData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, itemsetData, config)

  return response.data
}

// Get user's itemsets
const getItemsets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const itemsetService = {
  createItemset,
  getItemsets,
}

export default itemsetService
