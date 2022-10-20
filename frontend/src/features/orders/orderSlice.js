import {
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import orderService from './orderService';

const getError = (error) => {
	return (
		(error.response &&
			error.response.data &&
			error.response.data.message) ||
		error.message ||
		error.toString()
	);
};

const initialState = {
	orders: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	isEditing: false,
	message: '',
};

export const getOrders = createAsyncThunk(
	'orders/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await orderService.getOrders(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const createOrder = createAsyncThunk(
	'orders/create',
	async (orderData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await orderService.createOrder(
				orderData,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const deleteOrder = createAsyncThunk(
	'orders/delete',
	async (orderId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await orderService.deleteOrder(orderId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(getError(error));
		}
	}
);

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
			})
			.addCase(getOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		builder
			.addCase(createOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders.push(action.payload);
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});

		// Delete order
		builder
			.addCase(deleteOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(
				deleteOrder.fulfilled,
				(state, { payload }) => {
					state.isLoading = false;
					state.isSuccess = true;
					state.orders = state.orders.filter(
						(order) => order._id !== payload.id
					);
				}
			);
	},
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
