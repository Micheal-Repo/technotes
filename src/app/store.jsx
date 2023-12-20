import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { ApiSlice } from './api/apiSlice'
import authSlice from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    auth:authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
  devTools:false
})


setupListeners(store.dispatch)