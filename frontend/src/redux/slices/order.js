import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchOrdersByUser = createAsyncThunk(
  "orders/fetchOrdersByUser",
  async (params) => {
    const { data } = await axios.get("/orders", params);
    return data;
  }
);

const initialState = {
  orders: [],
  status: "loading",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.status = "loading";
        state.orders = [];
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.status = "loaded";
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUser.rejected, (state) => {
        state.status = "error";
        state.orders = [];
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
