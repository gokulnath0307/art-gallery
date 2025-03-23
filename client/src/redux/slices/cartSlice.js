import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProduct: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProduct: (state, { payload }) => {
      state.cartProduct.push({ ...payload });
    },
  },
});
export const { setCartProduct } = cartSlice.actions;
export default cartSlice;
export const getCartSliceData = (state) => state.cart;
