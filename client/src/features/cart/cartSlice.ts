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
    clearTotal: (state) => {
      state.cartTotal = null;
      localStorage.removeItem('cartTotal');
    },
  },
});

export const { addTotal, clearTotal } = cartSlice.actions;

export default cartSlice.reducer;
