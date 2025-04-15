import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  product: {
    _id: string;
    name: string;
    category: {
      name: string;
    };
    price: number;
    quantity: number;
    createdAt: Date;
  };
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '[]')
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product._id === newItem.product._id
      );

      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Item doesn't exist, add it to the cart
        state.cartItems.push(newItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
