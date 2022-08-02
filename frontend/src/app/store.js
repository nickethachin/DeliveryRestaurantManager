import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import itemsetReducer from '../features/itemsets/itemsetSlice'
import riderReducer from '../features/riders/riderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    itemsets: itemsetReducer,
    riders: riderReducer,
  },
})
