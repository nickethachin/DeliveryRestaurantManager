import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import categoryReducer from '../features/expenseCategories/categorySlice';
import expenseReducer from '../features/expenses/expenseSlice';
import formDataReducer from '../features/formdatas/formDataSlice';
import goalReducer from '../features/goals/goalSlice';
import itemReducer from '../features/items/itemSlice';
import itemsetReducer from '../features/itemsets/itemsetSlice';
import materialReducer from '../features/materials/materialSlice';
import riderReducer from '../features/riders/riderSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		formData: formDataReducer,
		goals: goalReducer,
		itemsets: itemsetReducer,
		riders: riderReducer,
		materials: materialReducer,
		items: itemReducer,
		expenseCategory: categoryReducer,
		expense: expenseReducer,
	},
});
