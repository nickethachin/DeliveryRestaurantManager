import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import riderService from './riderService'

const initialState = {
  riders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new rider
export const createRider = createAsyncThunk(
  'riders/create',
  async (riderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await riderService.createRider(riderData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user's rider
export const getRiders = createAsyncThunk(
  'riders/getAll',
  async (query = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await riderService.getRiders(token, query)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const riderSlice = createSlice({
  name: 'rider',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRider.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRider.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.riders.push(action.payload)
      })
      .addCase(createRider.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRiders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRiders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.riders = action.payload
      })
      .addCase(getRiders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = riderSlice.actions
export default riderSlice.reducer
