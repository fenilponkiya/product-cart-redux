import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: JSON.parse(localStorage.getItem("cart"))?.count || 0,
  cartData: JSON.parse(localStorage.getItem("cart"))?.cartData || [],
};

const AddToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addToCartReducer: (state, action) => {
      if (action.payload.type === "INCREMENT") {
        state.count++;
        const existingProductIndex = state.cartData.findIndex(
          (item) => item.id === action.payload.payload.id
        );
        if (existingProductIndex === -1) {
          state.cartData.push({ ...action.payload.payload, quantity: 1 });
        } else {
          state.cartData[existingProductIndex].quantity += 1;
        }

        localStorage.setItem(
          "cart",
          JSON.stringify({ cartData: state.cartData, count: state.count })
        );
      }
    },

    removeFromCartReducer: (state, action) => {
      if (action.payload.type === "DECREMENT") {
        const existingProductIndex = state.cartData.findIndex(
          (item) => item.id === action.payload.payload.id
        );

        if (existingProductIndex !== -1) {
          const product = state.cartData[existingProductIndex];
          if (product.quantity > 1) {
            product.quantity -= 1;
            state.count--;
          }
        }

        localStorage.setItem(
          "cart",
          JSON.stringify({ cartData: state.cartData, count: state.count })
        );
      }
    },

    removeProductFromCartReducer: (state, action) => {
      const updatedCartData = state.cartData.filter(
        (item) => item.id !== action.payload
      );

      state.cartData = updatedCartData;
      state.count = state.cartData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0);

      localStorage.setItem(
        "cart",
        JSON.stringify({ cartData: state.cartData, count: state.count })
      );
    },
  },
});
export const {
  addToCartReducer,
  removeFromCartReducer,
  removeProductFromCartReducer,
} = AddToCartSlice.actions;
export default AddToCartSlice.reducer;
