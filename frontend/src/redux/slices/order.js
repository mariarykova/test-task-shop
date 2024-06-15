import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchOrdersByUser = createAsyncThunk(
  "orders/fetchOrdersByUser",
  async (params) => {
    const { data } = await axios.get("/orders", params);
    return data;
  }
);

//export const placeOrder = createAsyncThunk(
//  "auth/fetchAuthMe",
//  async (params) => {
//    const { data } = await axios.post("/products/order", params);
//    return data;
//  }
//);

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/products/order", params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const initialState = {
  order: null,
  history: [],
  status: "loading",
  error: null,
};

const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    emptyOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.status = "loading";
        state.history = [];
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.status = "loaded";
        state.history = action.payload;
      })
      .addCase(fetchOrdersByUser.rejected, (state) => {
        state.status = "error";
        state.history = [];
      });
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const selectIsBaught = (state) => Boolean(state.order?.items);

export const ordersReducer = ordersSlice.reducer;

export const { emptyOrder } = ordersSlice.actions;
