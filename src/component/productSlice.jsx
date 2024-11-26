// productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    
    fruits: [
      { id: 7, src: "/images/f1.webp", name: "Banana", price: 50, weight: "6Pc", discount: "28% off" },
      { id: 8, src: "/images/f2.webp", name: "Kiwi", price: 120, weight: "3pc", discount: "28% off" },
      { id: 9, src: "/images/f3.webp", name: "Coconut/Daab", price: 48, weight: "1Pc", discount: "28% off" },
      { id: 10, src: "/images/f4.webp", name: "Grapes", price: 52, weight: "500g", discount: "28% off" },
      { id: 11, src: "/images/f5.webp", name: "Pomogranate", price: 150, weight: "250g", discount: "28% off" },
      { id: 12, src: "/images/f6.webp", name: "Coconut", price: 30, weight: "1Pc", discount: "28% off" }
    ],
    hotProducts: [
        { id: 13, src: "/images/urad-dal-badi.webp", name: "Urad Dal Badi", price: 150, weight: "1kg", discount: "29% off" },
        { id: 14, src: "/images/rajma.webp", name: "Rajma", price: 88, weight: "500g", discount: "8% off" },
        { id: 15, src: "/images/mango-papad.webp", name: "Amawat", price: 56, weight: "200g", discount: "38% off" },
        { id: 16, src: "/images/saloni-mustard-oil.webp", name: "Mustard Oil", price: 140, weight: "1l", discount: "42% off" },
        { id: 17, src: "/images/amul-ghee.webp", name: "Cow Ghee", price: 324, weight: "500g", discount: "4% off" },
        { id: 18, src: "/images/haldiram-namkeen.webp", name: "Namkeen", price: 189, weight: "1kg", discount: "1% off" }
      ],
      vegetables:[
        { id: 1, src: "/images/m1.webp", name: "Red Capsicum", price: 50, weight: "250g" },
        { id: 2, src: "/images/m2.webp", name: "Red Lettuce", price: 99, weight: "250g" },
        { id: 3, src: "/images/m3.webp", name: "Raw Papaya", price: 55, weight: "1Kg" },
        { id: 4, src: "/images/m4.webp", name: "Brocoli", price: 61, weight: "1Pc" },
        { id: 5, src: "/images/m5.webp", name: "Baby Corn", price: 96, weight: "500g" },
        { id: 6, src: "/images/m6.webp", name: "Mushrooms", price: 55, weight: "250g" }
    ]
    // add other product categories if needed
  },
  reducers: {
    // Example reducer to add a new product
    addProduct: (state, action) => {
      const { category, product } = action.payload;
      if (state[category]) {
        state[category].push(product);
      }
    },
    // Example reducer to update a product
    updateProduct: (state, action) => {
      const { category, productId, newData } = action.payload;
      if (state[category]) {
        const productIndex = state[category].findIndex(p => p.id === productId);
        if (productIndex !== -1) {
          state[category][productIndex] = { ...state[category][productIndex], ...newData };
        }
      }
    },
  },
});

// Example selector for getting fruits
export const selectFruits = (state) => state.products.fruits;

// Example selector for getting hot products
export const selectHotProducts = (state) => state.products.hotProducts;
export const selectVegetable = (state) => state.products.vegetables;

// Exporting the actions to be used in components
export const { addProduct, updateProduct } = productsSlice.actions;

export default productsSlice.reducer;
