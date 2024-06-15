import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const {
    id,
    title,
    description,
    price,
    category,
    mainPhotoUrl,
    hoverPhotoUrl,
    model,
  } = item;
  return (
    <>
      <Link to={`/products/${model}`}>
        <div key={id} className="max-w-xs text-center">
          <div className="relative w-64 h-64 group">
            <img
              src={mainPhotoUrl}
              alt="Front"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0 z-10"
            />
            <img
              src={hoverPhotoUrl}
              alt="Back"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
            />
          </div>
          <div className="font-medium text-sm text-orange-600 mb-2">
            {category}
          </div>
          <div className="font-bold text-xl text-[#f6f6f7] mb-4">{title}</div>
          <div className="font-normal text-xs text-gray-600 mb-4">
            {description}
          </div>
          <div className="font-bold text-xl leading-5 text-violet">
            ${price}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
