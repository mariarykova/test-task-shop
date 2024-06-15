import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { cardsReducer } from "./slices/cards";
import { ordersReducer } from "./slices/order";
import { apiSlice } from "./slices/api";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer,
    order: ordersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
