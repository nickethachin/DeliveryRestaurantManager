import axios from 'axios';
import { config } from '../frequentFunction';

const API_URL = '/api/expenses/';

const getExpenses = async (token) => {
	const response = await axios.get(API_URL, config(token));
	return response.data;
};

const createExpense = async (expenseData, token) => {
	const response = await axios.post(
		API_URL,
		expenseData,
		config(token)
	);
	return response.data;
};

const updateExpense = async (expenseData, token) => {
	const response = await axios.put(
		API_URL + expenseData._id,
		expenseData,
		config(token)
	);
	return response.data;
};

const deleteExpense = async (expenseId, token) => {
	const response = await axios.delete(
		API_URL + expenseId,
		config(token)
	);
	return response.data;
};

const expenseService = {
	getExpenses,
	createExpense,
	updateExpense,
	deleteExpense,
};

export default expenseService;
