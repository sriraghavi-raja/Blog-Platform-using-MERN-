import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { api } from '../services/api'; // blog API
import { authApi } from '../services/auth'; // ✅ auth API

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer, // ✅ added
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, authApi.middleware), // ✅ added
});
