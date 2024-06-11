import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const { data } = await axios.get("/cards");
  return data;
});

const initialState = {
  data: {
    cards: [],
    status: "loading",
  },
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.data.status = "loading";
        state.data.cards = [];
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.data.status = "loaded";
        state.data.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state) => {
        state.data.status = "error";
        state.data.cards = [];
      });
  },
});

export const cardsReducer = cardsSlice.reducer;
