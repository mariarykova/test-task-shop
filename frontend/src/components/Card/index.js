import React from "react";
import "./card.css";

const Card = ({ item }) => {
  const {
    id,
    title,
    description,
    price,
    category,
    mainPhotoUrl,
    hoverPhotoUrl,
  } = item;
  return (
    <>
      <div key={id} className="card">
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
        <div className="good_category">{category}</div>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        <div className="price">${price}</div>
      </div>
    </>
  );
};

export default Card;
