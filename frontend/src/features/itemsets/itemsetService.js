import axios from 'axios';

const API_URL = '/api/itemsets/';
const config = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

// Create new itemset
const createItemset = async (itemsetData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(
		API_URL,
		itemsetData,
		config
	);

	return response.data;
};

// Get itemsets
const getItemsets = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

// Update itemset
const updateItemset = async (itemsetData, token) => {
	const response = await axios.put(
		API_URL + itemsetData._id,
		itemsetData,
		config(token)
	);
	console.log(response.data);
	return response.data;
};

// Delete itemset
const deleteItemset = async (itemsetId, token) => {
	const response = await axios.delete(
		API_URL + itemsetId,
		config(token)
	);
	return response.data;
};

const itemsetService = {
	createItemset,
	getItemsets,
	updateItemset,
	deleteItemset,
};

export default itemsetService;
