import axios from 'axios';
import { config } from '../frequentFunction';

const API_URL = '/api/expense/category/';

const getCategories = async (token) => {
	const response = await axios.get(API_URL, config(token));
	return response.data;
};

const createCategory = async (categoryData, token) => {
	const response = await axios.post(
		API_URL,
		categoryData,
		config(token)
	);
	return response.data;
};

const updateCategory = async (categoryData, token) => {
	const response = await axios.put(
		API_URL + categoryData._id,
		categoryData,
		config(token)
	);
	return response.data;
};

const deleteCategory = async (categoryId, token) => {
	const response = await axios.delete(
		API_URL + categoryId,
		config(token)
	);
	return response.data;
};

const categoryService = {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
};

export default categoryService;
