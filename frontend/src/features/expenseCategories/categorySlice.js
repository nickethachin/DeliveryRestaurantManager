import {
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import { getError } from '../frequentFunction';
import categoryService from './categoryService';

const initialState = {
	categories: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getCategories = createAsyncThunk(
	'categories/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await categoryService.getCategories(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const createCategory = createAsyncThunk(
	'categories/create',
	async (categoryData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await categoryService.createCategory(
				categoryData,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const updateCategory = createAsyncThunk(
	'categories/update',
	async (categoryData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await categoryService.updateCategory(
				categoryData,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const deleteCategory = createAsyncThunk(
	'categories/delete',
	async (categoryId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await categoryService.deleteCategory(
				categoryId,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		// Get categories
		builder
			.addCase(getCategories.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCategories.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.categories = action.payload;
			});

		// Create category
		builder
			.addCase(createCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(
				createCategory.fulfilled,
				(state, { payload }) => {
					state.isLoading = false;
					state.isSuccess = true;
					state.categories.push(payload);
					if (payload.parent !== null) {
						const index = state.categories.findIndex(
							(category) => category._id === payload.parent
						);
						state.categories[index].children.push(
							payload._id
						);
					}
				}
			);

		// Update category
		builder
			.addCase(updateCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				updateCategory.fulfilled,
				(state, action) => {
					state.isLoading = false;
					state.isSuccess = true;
					const index = state.categories.findIndex(
						(category) =>
							category._id === action.payload._id
					);
					state.categories[index] = {
						...state.categories[index],
						...action.payload,
					};
				}
			)
			.addCase(updateCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		// Delete category
		builder
			.addCase(deleteCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(
				deleteCategory.fulfilled,
				(state, { payload }) => {
					state.isLoading = false;
					state.isSuccess = true;
					if (payload.parent !== undefined) {
						const index = state.categories.findIndex(
							(category) => payload.parent === category._id
						);

						state.categories[index] = {
							...state.categories[index],
							children: state.categories[
								index
							].children.filter(
								(child) => child !== payload.id
							),
						};
					} else {
						state.categories = state.categories.filter(
							(category) =>
								!payload.id.includes(category._id)
						);
					}
				}
			);
	},
});
export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
