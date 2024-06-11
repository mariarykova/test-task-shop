import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { cardsReducer } from "./slices/cards";
import { apiSlice } from "./slices/api";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
