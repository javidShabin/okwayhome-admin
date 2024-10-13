import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/features/adminSlice";
import productReducer from "../redux/features/countSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    product: productReducer
  },
});
