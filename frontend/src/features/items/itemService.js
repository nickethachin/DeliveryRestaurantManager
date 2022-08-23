import axios from 'axios';

const API_URL = '/api/items/';
const config = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const getItems = async (token) => {
	const response = await axios.get(API_URL, config(token));
	return response.data;
};

const createItem = async (itemData, token) => {
	const response = await axios.post(
		API_URL,
		itemData,
		config(token)
	);
	return response.data;
};

const updateItem = async (itemData, token) => {
	console.log(API_URL + itemData._id);
	const response = await axios.put(
		API_URL + itemData._id,
		itemData,
		config(token)
	);
	console.log(response.data);
	return response.data;
};

const deleteItem = async (itemId, token) => {
	const response = await axios.delete(
		API_URL + itemId,
		config(token)
	);
	return response.data;
};

const itemService = {
	getItems,
	createItem,
	updateItem,
	deleteItem,
};

export default itemService;
