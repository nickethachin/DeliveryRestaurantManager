import {
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import itemService from './itemService';

const initialState = {
	items: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	isEditing: false,
	message: '',
	editingData: {
		isEditing: false,
		_id: '',
		name: '',
		materials: [
			{
				matId: '',
				amount: 0,
				usage: 0,
				output: 0,
			},
		],
	},
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

export const getItems = createAsyncThunk(
	'items/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await itemService.getItems(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const createItem = createAsyncThunk(
	'items/create',
	async (itemData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await itemService.createItem(itemData, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const updateItem = createAsyncThunk(
	'items/update',
	async (itemData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await itemService.updateItem(itemData, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const deleteItem = createAsyncThunk(
	'items/delete',
	async (itemId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await itemService.deleteItem(itemId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		reset: (state) => initialState,
		openEditor: (state, { payload }) => {
			const { _id, name, materials } = payload;
			state.editingData._id = _id;
			state.editingData.name = name;
			state.editingData.materials = materials;
			state.editingData.isEditing = true;
		},
		closeEditor: (state) => {
			state.editingData.isEditing = false;
		},
		editName: (state, { payload }) => {
			const index = state.items.findIndex(
				(item) => item._id == payload._id
			);
			state.items[index].name = payload.name;
		},
		editMaterial: (state, { payload }) => {
			const itemIndex = state.items.findIndex(
				(item) => item._id == payload._id
			);
			state.items[itemIndex].materials[
				payload.materialIndex
			] = payload.material;
		},
		addMaterial: (state, { payload }) => {
			const itemIndex = state.items.findIndex(
				(item) => item._id == payload._id
			);
			state.items[itemIndex].materials.push({
				matId: null,
				amount: 0,
			});
		},
		removeMaterial: (state, { payload }) => {
			const itemIndex = state.items.findIndex(
				(item) => item._id == payload._id
			);
			state.items[itemIndex].materials.splice(
				payload.index,
				1
			);
		},
		addBlank: (state) => {
			state.items.push({
				_id: 'blank',
				name: null,
				materials: [],
			});
		},
	},
	extraReducers: (builder) => {
		// Get items
		builder
			.addCase(getItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getItems.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.items = action.payload;
			});

		// Create item
		builder
			.addCase(createItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.items.push(action.payload);
			});

		// Update item
		builder
			.addCase(updateItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const index = state.items.findIndex(
					(item) => item._id === action.payload._id
				);
				state.items[index] = {
					...state.items[index],
					...action.payload,
				};
			})
			.addCase(updateItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		// Delete item
		builder
			.addCase(deleteItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.items = state.items.filter(
					(item) => item._id !== action.payload.id
				);
			});
	},
});

export const {
	reset,
	openEditor,
	closeEditor,
	editName,
	editMaterial,
	addMaterial,
	removeMaterial,
	addBlank,
} = itemSlice.actions;
export default itemSlice.reducer;
