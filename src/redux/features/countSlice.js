import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage or use default values
const initialState = {
  isProductCount: Number(localStorage.getItem("productCount")) || 0, // Load from localStorage or default to 0
  userCount: Number(localStorage.getItem("userCount")) || 0, // Load from localStorage or default to 0
  products: [],
};

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    productCount: (state, action) => {
      state.isProductCount = action.payload.length; // Update product count
      state.products = action.payload.products; // Store the products if needed

      // Save product count to localStorage
      localStorage.setItem("productCount", state.isProductCount);
    },
    addProduct: (state, action) => {
      // Add new product to the products array
      state.products.push(action.payload); // Add the new product

      // Update the product count
      state.isProductCount = state.products.length;

      // Save updated product count to localStorage
      localStorage.setItem("productCount", state.isProductCount);
    },
    setUserCount: (state, action) => {
      state.userCount = action.payload; // Update user count
      // Save updated user count to localStorage
      localStorage.setItem("userCount", state.userCount);
    },
  },
});

// Action creators are generated for each case reducer function
export const { productCount, addProduct, setUserCount } = countSlice.actions;

export default countSlice.reducer;
