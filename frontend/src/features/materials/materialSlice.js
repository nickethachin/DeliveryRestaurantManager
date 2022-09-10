import {
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import materialService from './materialService';

const initialState = {
	materials: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	isEditing: false,
	message: '',
	editingData: {
		isEditing: false,
		_id: '',
		name: '',
		type: '',
		unit: '',
	},
};

export const getMaterials = createAsyncThunk(
	'materials/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await materialService.getMaterials(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const createMaterial = createAsyncThunk(
	'materials/create',
	async (materialData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await materialService.createMaterial(
				materialData,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const deleteMaterial = createAsyncThunk(
	'materials/delete',
	async (materialId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await materialService.deleteMaterial(
				materialId,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const updateMaterial = createAsyncThunk(
	'materials/update',
	async (materialData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await materialService.updateMaterial(
				materialData,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

const getError = (error) => {
	return (
		(error.response &&
			error.response.data &&
			error.response.data.message) ||
		error.message ||
		error.toString()
	);
};

export const materialSlice = createSlice({
	name: 'material',
	initialState,
	reducers: {
		reset: (state) => initialState,
		openEditor: (state, { payload }) => {
			const { _id, name, type, unit } = payload;
			state.editingData.isEditing = true;
			state.editingData._id = _id;
			state.editingData.name = name;
			state.editingData.type = type;
			state.editingData.unit = unit;
		},
		closeEditor: (state) => {
			state.editingData.isEditing = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMaterials.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMaterials.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.materials = action.payload;
			})
			.addCase(getMaterials.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		builder
			.addCase(createMaterial.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				createMaterial.fulfilled,
				(state, action) => {
					state.isLoading = false;
					state.isSuccess = true;
					state.materials.push(action.payload);
				}
			)
			.addCase(createMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		builder
			.addCase(deleteMaterial.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				deleteMaterial.fulfilled,
				(state, action) => {
					state.isLoading = false;
					state.isSuccess = true;
					state.materials = state.materials.filter(
						(material) => material._id !== action.payload
					);
				}
			)
			.addCase(deleteMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		builder
			.addCase(updateMaterial.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				updateMaterial.fulfilled,
				(state, action) => {
					state.isLoading = false;
					state.isSuccess = true;
					const index = state.materials.findIndex(
						(material) =>
							material._id === action.payload._id
					);
					state.materials[index] = {
						...state.materials[index],
						...action.payload,
					};
				}
			)
			.addCase(updateMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset, openEditor, closeEditor } =
	materialSlice.actions;
export default materialSlice.reducer;
