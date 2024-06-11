import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchDataUser = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataUser.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchDataUser.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchDataUser.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const authReducer = authSlice.reducer;
