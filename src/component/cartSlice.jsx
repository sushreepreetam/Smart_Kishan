import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      state.totalQuantity++;
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.src,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.id !== itemId);
      }
    },
    incrementQuantity(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity++;
      }
    },
    decrementQuantity(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity--;
        
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(item => item.id !== itemId);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;{/*Lazy Loading */}

export default cartSlice.reducer;{/*Eager Loading */}
