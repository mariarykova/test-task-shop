import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async (params) => {
    const { data } = await axios.get("/auth/me");
    return data;
  }
);

export const placeOrder = createAsyncThunk(
  "auth/fetchAuthMe",
  async (params) => {
    const { data } = await axios.post("/products/order", params);
    return data;
  }
);

const initialState = {
  user: null,
  cart: [],
  order: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(
        (item) =>
          item.model === payload.model &&
          item.size === payload.size &&
          item.color === payload.color
      );

      if (found) {
        newCart = newCart.map((item) => {
          return item.model === payload.model &&
            item.size === payload.size &&
            item.color === payload.color
            ? { ...item, quantity: item.quantity + payload.quantity }
            : item;
        });
      } else {
        newCart.push({
          ...payload,
          quantity: payload.quantity,
          color: payload.color,
          size: payload.size,
        });
      }

      state.cart = newCart;
    },
    removeItemFromCart: (state, { payload }) => {
      console.log(payload);
      state.cart = state.cart.filter(
        (item) =>
          item.item.model !== payload.model ||
          item.size !== payload.size ||
          item.color !== payload.color
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.user = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.user = null;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.user = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.user = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.user = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.user = null;
      });
    //  .addCase(placeOrder.pending, (state) => {
    //    state.status = "loading";
    //  })
    //  .addCase(placeOrder.fulfilled, (state, action) => {
    //    state.status = "succeeded";
    //    state.order = action.payload;
    //  })
    //  .addCase(placeOrder.rejected, (state, action) => {
    //    state.status = "error";
    //    state.error = action.payload;
    //  });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.user);

export const authReducer = authSlice.reducer;

export const { logout, addItemToCart, removeItemFromCart } = authSlice.actions;
