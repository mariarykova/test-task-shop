import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Header } from "../../components/Header";

import { addItemToCart } from "../../redux/slices/auth";

export const Product = (item) => {
  const { title, price, description, colors, details } = item;
  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("white");
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    details.map((item) => {
      if (item.color === currentColor && item.size === currentSize) {
        return setMaxQuantity(item.quantity);
      }

      return 0;
    });
  }, [currentColor, currentSize, details]);

  useEffect(() => {
    if (!details.length) return;

    setCurrentImage(details[0].photo);
  }, [details]);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= maxQuantity) {
      setQuantity(newValue);
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
            ? "border-2 border-violet text-violet p-[5px]"
            : "border border-gray-500 p-[5px]";
          return (
            <button
              onClick={() => setCurrentSize(detail.size)}
              key={index}
              disabled={isDisabled}
            >
              <div className={`w-10 h-7 rounded-md pointer ${buttonClass}`}>
                {detail.size.toLocaleUpperCase()}
              </div>
            </button>
          );
        });
    },
    [currentSize]
  );

  const addToCart = () => {
    dispatch(
      addItemToCart({
        item,
        color: currentColor,
        size: currentSize,
        quantity,
      })
    );
  };
  return (
    <>
      <Header />
      <section className="flex p-6 gap-8 text-light w-full justify-center">
        <div className="flex gap-5">
          <div
            className="w-[375px] h-[375px] bg-center bg-no-repeat bg-cover rounded-md"
            style={{ backgroundImage: `url(${currentImage})` }}
          />
          <div className="flex flex-col gap-[5px]">
            {details[0].photo.map((image, i) => (
              <div
                key={i}
                className="w-[90px] h-[90px] bg-center bg-no-repeat bg-cover rounded-md cursor-pointer"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <div className="leading-[40px] text-[32px] mb-[10px] font-bold">
              {title}
            </div>
            <div className="mb-[10px]">{description}</div>
            <div className="flex mb-[10px] items-center">
              <div className="text-[30px] leading-[32px] text-white font-bold">
                $ {price}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="w-20 p-2 border rounded text-center"
                  value={quantity}
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
            <div className="mb-[10px]">Color: {currentColor} </div>
            <div className="flex gap-2 mb-[20px]">
              {colors.map((color, index) => {
                return (
                  <button onClick={() => setCurrentColor(color)} key={index}>
                    <div
                      className={`w-10 h-10 rounded-full pointer ${
                        currentColor === color
                          ? "border-2 border-violet"
                          : "border border-black"
                      }`}
                      style={{ background: color }}
                    ></div>
                  </button>
                );
              })}
            </div>
            <div className="mb-[10px]">Size</div>
            <div className="flex gap-2">{renderSize(currentColor)}</div>
          </div>

          <div className="mt-5 flex gap-2.5">
            <button
              onClick={addToCart}
              className={`bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] ${
                !currentSize || quantity === 0
                  ? "cursor-not-allowed bg-gray-400"
                  : "cursor-pointer hover:bg-violet"
              }`}
              disabled={!currentSize || quantity === 0}
            >
              Add to cart
            </button>

            <Link
              to={"/"}
              className="bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] cursor-pointer hover:bg-violet"
            >
              Return to store
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
