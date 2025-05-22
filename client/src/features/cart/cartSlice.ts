import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartTotal: localStorage.getItem('cartTotal')
    ? JSON.parse(localStorage.getItem('cartTotal') || '[]')
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTotal: (state, action) => {
      state.cartTotal = action.payload;
      localStorage.setItem('cartTotal', JSON.stringify(state.cartTotal));
    },
  },
});

export const { addTotal } = cartSlice.actions;

export default cartSlice.reducer;
