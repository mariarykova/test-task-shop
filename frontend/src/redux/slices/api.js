import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//import { buildUrl } from "../../utils/common";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4444" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ model }) => `/products/${model}`,
      providesTags: ["Product"],
    }),
    //getProducts: builder.query({
    //  query: (params) => buildUrl("/products", params),
    //  providesTags: ["Products"],
    //}),
  }),
});

export const { useGetProductQuery } = apiSlice;
