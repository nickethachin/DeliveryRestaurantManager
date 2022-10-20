import axios from 'axios';

const API_URL = '/api/riders/';

// Create new rider
const createRider = async (riderData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(
		API_URL,
		riderData,
		config
	);

	return response.data;
};

// Get user's riders
const getRiders = async (token, query = null) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(
		API_URL + `?${query}`,
		config
	);

	return response.data;
};

// Delete user's rider
const deleteRider = async (riderId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(
		API_URL + riderId,
		config
	);

	return response.data;
};

// Update Price
const updatePrice = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(
		API_URL + 'price',
		data,
		config
	);

	return response.data;
};
const riderService = {
	createRider,
	getRiders,
	deleteRider,
	updatePrice,
};

export default riderService;
