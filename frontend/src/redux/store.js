import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { cardsReducer } from "./slices/cards";
import { ordersReducer } from "./slices/order";
import { apiSlice } from "./slices/api";
//import { userReducer } from "./slices/user";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer,
    //user: userReducer,
    orders: ordersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
