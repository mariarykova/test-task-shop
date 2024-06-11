import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/slices/api";
import { useDispatch } from "react-redux";
import { Product } from "./ui/Product/index";

import Gallery from "./ui/Gallery";
import "./good.css";

const data1 = {
  model: "1",
  title: "T-shirt 1",
  description: "T-shirt-1 Description",
  type: "men",
  price: 33,
  colors: ["white", "black"],
  sizes: ["s", "m", "l"],
  details: [
    {
      color: "white",
      size: "s",
      quantity: 0,
      photo: [
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/1,width=400,height=450.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/2/appearances/1,width=650,height=800,backgroundColor=f2f2f2,modelId=1549,crop=detail.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/1,width=650,height=800,backgroundColor=f2f2f2.png",
      ],
    },
    {
      color: "white",
      size: "m",
      quantity: 3,
      photo: [
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/1,width=400,height=450.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/2/appearances/1,width=650,height=800,backgroundColor=f2f2f2,modelId=1549,crop=detail.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/1,width=650,height=800,backgroundColor=f2f2f2.png",
      ],
    },
    {
      color: "white",
      size: "l",
      quantity: 3,
      photo: [
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/1,width=400,height=450.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/2/appearances/1,width=650,height=800,backgroundColor=f2f2f2,modelId=1549,crop=detail.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/1,width=650,height=800,backgroundColor=f2f2f2.png",
      ],
    },
    {
      color: "black",
      size: "s",
      quantity: 3,
      photo: [
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/2,width=650,height=800,backgroundColor=f2f2f2,modelId=1543,crop=detail.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/2,width=650,height=800,backgroundColor=f2f2f2.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/2/appearances/2,width=650,height=800,backgroundColor=f2f2f2,modelId=1549,crop=detail.png",
      ],
    },
    {
      color: "black",
      size: "m",
      quantity: 3,
      photo: [
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/2,width=650,height=800,backgroundColor=f2f2f2,modelId=1543,crop=detail.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/2,width=650,height=800,backgroundColor=f2f2f2.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/2/appearances/2,width=650,height=800,backgroundColor=f2f2f2,modelId=1549,crop=detail.png",
      ],
    },
    {
      color: "black",
      size: "l",
      quantity: 3,
      photo: [
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/2,width=650,height=800,backgroundColor=f2f2f2,modelId=1543,crop=detail.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/2,width=650,height=800,backgroundColor=f2f2f2.png",
        "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/2/appearances/2,width=650,height=800,backgroundColor=f2f2f2,modelId=1549,crop=detail.png",
      ],
    },
  ],
};

export const Good = () => {
  const { model } = useParams();
  const { data } = useGetProductQuery({ model });

  console.log(data);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <Product {...data} />
  );
};
