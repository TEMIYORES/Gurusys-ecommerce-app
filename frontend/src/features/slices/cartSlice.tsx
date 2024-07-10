import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../services/store";

const cartItemsJSON = localStorage.getItem("cartItems");
let initialState: Record<string, any>[] = [];

if (cartItemsJSON) {
  try {
    initialState = JSON.parse(cartItemsJSON);
    console.log({ initialState });
    // Ensure that initialState is an array
    if (!Array.isArray(initialState)) {
      initialState = [];
    }
  } catch (error) {
    console.error("Error parsing cart items:", error);
    // Handle parsing error here, like setting a default value or showing a message to the user
  }
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    RemoveFromCart: (state, action) => {
      const indexToRemove = state.findIndex(
        (product) => product._id === action.payload._id
      );
      console.log(JSON.stringify(indexToRemove));
      if (indexToRemove > -1) {
        state.splice(indexToRemove, 1);
      }
    },
    clearCart: () => {
      localStorage.setItem("cartItems", JSON.stringify([]));
      return [];
    },
  },
});

export const { AddToCart, RemoveFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const getCartProducts = (state: RootState) => state.cart;
export const getCartLength = (state: RootState) => state.cart.length;
