import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../services/store";
import { ProductType } from "../../utilities/Types";

const initialState: ProductType[] = [];

const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setProducts: (_state, action) => {
      console.log("action", action.payload);
      return action.payload;
    },
  },
});

export const { setProducts } = ProductsSlice.actions;
export default ProductsSlice.reducer;
export const getProducts = (state: RootState) => state.products;
