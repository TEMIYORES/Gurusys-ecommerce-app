import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/slices/productsSlice.tsx";
import cartReducer from "../features/slices/cartSlice.tsx";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
