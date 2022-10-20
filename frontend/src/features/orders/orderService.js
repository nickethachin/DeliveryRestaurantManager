import axios from 'axios';

const API_URL = '/api/orders/';
const getConfig = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const getOrders = async (token) => {
	const config = getConfig(token);
	const response = await axios.get(API_URL, config);
	return response.data;
};

const createOrder = async (orderData, token) => {
	const config = getConfig(token);
	const response = await axios.post(
		API_URL,
		orderData,
		config
	);
	return response.data;
};

const deleteOrder = async (orderId, token) => {
	const config = getConfig(token);
	const response = await axios.delete(
		API_URL + orderId,
		config
	);
	return response.data;
};

const orderService = {
	getOrders,
	createOrder,
	deleteOrder,
	// updateOrder,
};

export default orderService;
