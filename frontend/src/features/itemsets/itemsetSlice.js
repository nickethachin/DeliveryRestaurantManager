import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import itemsetService from './itemsetService'

const initialState = {
  itemsets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new itemset
export const createItemset = createAsyncThunk(
  'itemsets/create',
  async (itemsetData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await itemsetService.createItemset(itemsetData, token)
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

// Get user's itemset
export const getItemsets = createAsyncThunk(
  'itemsets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await itemsetService.getItemsets(token)
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

export const itemsetSlice = createSlice({
  name: 'itemset',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItemset.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createItemset.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.itemsets.push(action.payload)
      })
      .addCase(createItemset.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getItemsets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getItemsets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.itemsets = action.payload
      })
      .addCase(getItemsets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = itemsetSlice.actions
export default itemsetSlice.reducer
