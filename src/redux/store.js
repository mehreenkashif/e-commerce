import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: productReducer, 
    cart: cartReducer,        
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
