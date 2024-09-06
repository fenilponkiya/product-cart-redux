import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const productData = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response?.data;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(productData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
