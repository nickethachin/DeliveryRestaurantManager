import { iconClasses } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
};

export const formDataSlice = createSlice({
	name: 'formData',
	initialState,
	reducers: {
		reset: (state) => initialState,
		addData: (state, { payload }) => {
			state.data = payload;
		},
	},
});

export const { reset, addData } = formDataSlice.actions;
export default formDataSlice.reducer;
