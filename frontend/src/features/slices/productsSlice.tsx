import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../services/store";

export interface initialStateProps {
  _id: string | null;
  name: string | null;
  description: string | null;
  image: string | undefined;
  price: number | null;
  stock: number | null;
}
const initialState: initialStateProps[] = [];

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
