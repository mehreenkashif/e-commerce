import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    deletedIds: [],
  },
  reducers: {
    deleteProduct: (state, action) => {
      state.deletedIds.push(action.payload);
    },
    
   removeProduct: (state, action) => {
  state.products = state.products.filter(p => p.id !== action.payload);
},
  },
});

export const { deleteProduct } = productSlice.actions;
export default productSlice.reducer;
