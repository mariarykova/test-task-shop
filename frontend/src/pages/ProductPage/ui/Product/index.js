import React, { useState, useCallback } from "react";
import "../../good.css";

export const Product = (item) => {
  console.log(item);
  const { title, price, description, sizes, colors, details } = item;
  const [currentImage, setCurrentImage] = useState(details[0].photo);
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("white");
  const [value, setValue] = useState(0);

  console.log("item", item);
  console.log("sizes", sizes);

  const maxQuantity = 10;

  const handleIncrement = () => {
    if (value < maxQuantity) {
      setValue(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= maxQuantity) {
      setValue(newValue);
    }
  };

  const renderSize = useCallback(
    (color) => {
      if (!item) return null;

      return item.details
        .filter((detail) => detail.color === color)
        .map((detail, index) => {
          const isDisabled = detail.quantity === 0;
          const isSelected = currentSize === detail.size;
          const buttonClass = isDisabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-500"
            : isSelected
            ? "selected border border-black"
            : "bg-white hover:bg-gray-100 border border-gray-500";
          return (
            <button
              onClick={() => setCurrentSize(detail.size)}
              key={index}
              disabled={isDisabled}
            >
              <div
                className={`w-10 h-7 rounded-md pointer ${buttonClass}
                `}
              >
                {detail.size.toLocaleUpperCase()}
              </div>
            </button>
          );
        });
    },
    [currentSize]
  );

  const addToCart = () => {
    //dispatch(addItemToCart(item));
  };
  return (
    <section className="product">
      <div className="images">
        <div
          className="current"
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className="images-list">
          {details[0].photo.map((image, i) => (
            <div
              key={i}
              className="image"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className="info">
        <div>
          <div>{title}</div>
          <div>{description}</div>
          <div>$ {price}</div>
          <div>
            <div>Quantity</div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="w-20 p-2 border rounded text-center"
                value={value}
                onChange={handleChange}
                min="1"
                max={maxQuantity}
              />
              <button
                className="flex items-center justify-center bg-white border rounded border-gray-500 text-gray-800 text-custom h-10 w-10 outline-none"
                onClick={handleDecrement}
              >
                -
              </button>
              <button
                className="flex items-center justify-center bg-white border rounded border-gray-500 text-gray-800 text-custom h-10 w-10 outline-none"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          </div>
          <div>Color: {currentColor} </div>
          <div className="flex gap-2">
            {colors.map((color, index) => {
              return (
                <button onClick={() => setCurrentColor(color)} key={index}>
                  <div
                    className={`w-5 h-5 rounded-full pointer ${
                      currentColor === color
                        ? "selected"
                        : "border border-black"
                    }`}
                    style={{ background: color }}
                  ></div>
                </button>
              );
            })}
          </div>
          <div>Size</div>
          <div className="flex gap-2">{renderSize(currentColor)}</div>
        </div>

        <div className="actions">
          <button onClick={addToCart} className="add" disabled={!currentSize}>
            Add to cart
          </button>
        </div>

        <div className="bottom">
          {/*<Link to={ROUTES.HOME}>Return to store</Link>*/}
        </div>
      </div>
    </section>
  );
};
