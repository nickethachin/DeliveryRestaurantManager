import {
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import { getError } from '../frequentFunction';
import expenseService from './expenseService';

const initialState = {
	expenses: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getExpenses = createAsyncThunk(
	'expenses/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await expenseService.getExpenses(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const createExpense = createAsyncThunk(
	'expenses/create',
	async (expenseData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return {
				createdData: await expenseService.createExpense(
					expenseData,
					token
				),
				newList: await expenseService.getExpenses(token),
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const updateExpense = createAsyncThunk(
	'expenses/update',
	async (expenseData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return {
				updatedData: await expenseService.updateExpense(
					expenseData,
					token
				),
				newList: await expenseService.getExpenses(token),
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const deleteExpense = createAsyncThunk(
	'expenses/delete',
	async (expenseId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await expenseService.deleteExpense(
				expenseId,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const expenseSlice = createSlice({
	name: 'expense',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		// Get expenses
		builder
			.addCase(getExpenses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getExpenses.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getExpenses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.expenses = action.payload;
			});

		// Create expense
		builder
			.addCase(createExpense.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createExpense.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createExpense.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.expenses = action.payload.newList;
				// state.expenses.push(action.payload.createdData);
			});

		// Update expense
		builder
			.addCase(updateExpense.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateExpense.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateExpense.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.expenses = action.payload.newList;
				// const index = state.expenses.findIndex(
				// 	(expense) => expense._id === action.payload._id
				// );
				// state.expenses[index] = {
				// 	...state.expenses[index],
				// 	...action.payload,
				// };
			});

		// Delete expense
		builder
			.addCase(deleteExpense.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteExpense.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(
				deleteExpense.fulfilled,
				(state, { payload }) => {
					state.isLoading = false;
					state.isSuccess = true;
					state.expenses = state.expenses.filter(
						(expense) => expense._id !== payload.id
					);
				}
			);
	},
});

export const { reset } = expenseSlice.actions;
export default expenseSlice.reducer;
