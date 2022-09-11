import {
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import itemsetService from './itemsetService';

const initialState = {
	itemsets: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

const getError = (error) => {
	return (
		(error.response &&
			error.response.data &&
			error.response.data.message) ||
		error.message ||
		error.toString()
	);
};

// Create new itemset
export const createItemset = createAsyncThunk(
	'itemsets/create',
	async (itemsetData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await itemsetService.createItemset(
				itemsetData,
				token
			);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get itemset
export const getItemsets = createAsyncThunk(
	'itemsets/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await itemsetService.getItemsets(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Update itemset
export const updateItemset = createAsyncThunk(
	'itemsets/update',
	async (itemsetData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await itemsetService.updateItemset(
				itemsetData,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

// Delete itemset
export const deleteItemset = createAsyncThunk(
	'itemsets/delete',
	async (itemsetId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await itemsetService.deleteItemset(
				itemsetId,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const itemsetSlice = createSlice({
	name: 'itemset',
	initialState,
	reducers: {
		reset: (state) => initialState,
		editName: (state, { payload }) => {
			const index = state.itemsets.findIndex(
				(itemset) => itemset._id === payload._id
			);
			state.itemsets[index].name = payload.name;
		},
		editWorkCost: (state, { payload }) => {
			const index = state.itemsets.findIndex(
				(itemset) => itemset._id === payload._id
			);
			state.itemsets[index].workCost = payload.workCost;
		},
		editGasCost: (state, { payload }) => {
			const index = state.itemsets.findIndex(
				(itemset) => itemset._id === payload._id
			);
			state.itemsets[index].gasCost = payload.gasCost;
		},
		editItem: (state, { payload }) => {
			const itemsetIndex = state.itemsets.findIndex(
				(itemset) => itemset._id === payload._id
			);
			state.itemsets[itemsetIndex].items[
				payload.itemIndex
			] = payload.item;
		},
		addItem: (state, { payload }) => {
			const itemsetIndex = state.itemsets.findIndex(
				(itemset) => itemset._id === payload._id
			);
			state.itemsets[itemsetIndex].items.push({
				itemId: null,
				amount: 1,
			});
		},
		removeItem: (state, { payload }) => {
			const itemsetIndex = state.itemsets.findIndex(
				(itemset) => itemset._id === payload._id
			);
			state.itemsets[itemsetIndex].items.splice(
				payload.index,
				1
			);
		},
		addBlank: (state) => {
			state.itemsets.push({
				_id: 'blank',
				name: '',
				items: [],
				workCost: 0,
				gasCost: 0,
			});
		},
	},
	extraReducers: (builder) => {
		// Create new itemset
		builder
			.addCase(createItemset.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createItemset.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = 'Add new itemset successful';
				state.itemsets.push(action.payload);
			})
			.addCase(createItemset.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		// Get itemsets
		builder
			.addCase(getItemsets.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getItemsets.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.itemsets = action.payload;
			})
			.addCase(getItemsets.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		// Update itemset
		builder
			.addCase(updateItemset.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateItemset.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = 'Update itemset successful';
				const index = state.itemsets.findIndex(
					(itemset) => itemset._id === action.payload._id
				);
				state.itemsets[index] = {
					...state.itemsets[index],
					...action.payload,
				};
			})
			.addCase(updateItemset.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		// Delete itemset
		builder
			.addCase(deleteItemset.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteItemset.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteItemset.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = 'Delete itemset successful';
				state.itemsets = state.itemsets.filter(
					(itemset) => itemset._id !== action.payload.id
				);
			});
	},
});

export const {
	reset,
	editName,
	editWorkCost,
	editGasCost,
	editItem,
	addItem,
	removeItem,
	addBlank,
} = itemsetSlice.actions;
export default itemsetSlice.reducer;
