import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/slice/allProductSlice";
import singleProductReducer from "../redux/slice/singleProductSlice";
import cartSliceReducer from "../redux/slice/addToCart";

export const store = configureStore({
  reducer: {
    product: productReducer,
    singleProduct: singleProductReducer,
    cartProdcut: cartSliceReducer,
  },
});
