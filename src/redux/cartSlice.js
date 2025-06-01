import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item.productId === product.id);
      if (existing) existing.quantity++;
      else state.items.push({ productId: product.id, title: product.title,  image: product.image, price: product.price, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    incrementQty: (state, action) => {
      const item = state.items.find(i => i.productId === action.payload);
      if (item) item.quantity++;
    },
    decrementQty: (state, action) => {
      const item = state.items.find(i => i.productId === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, incrementQty, decrementQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
