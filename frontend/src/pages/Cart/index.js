import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  addItemToCart,
  selectIsAuth,
  removeItemFromCart,
  emptyCart,
} from "../../redux/slices/auth";
import { placeOrder, selectIsBaught } from "../../redux/slices/order";
import { Header } from "../../components/Header";

export const Cart = () => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector(({ auth }) => auth);
  const isAuth = useSelector(selectIsAuth);
  const [errorMessage, setErrorMessage] = useState("");

  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);

  const buyItems = async () => {
    const params = {
      user: {
        _id: user._id,
      },
      items: cart.map((item) => ({
        model: item.item.model,
        title: item.item.title,
        price: item.item.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      })),
    };

    try {
      await dispatch(placeOrder(params)).unwrap();
      setErrorMessage("");
      dispatch(emptyCart());
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };

  return (
    <>
      <Header />
      <section className=" bg-dark rounded-md mx-auto max-w-[1100px] p-6 lg:px-8 flex flex-col w-full h-screen">
        <h2 className="font-bold text-[30px] leading-[18px] text-white text-left font-roboto">
          Your cart
        </h2>

        {!cart.length ? (
          <div className="mt-6 text-[24px] leading-[30px] text-light">
            Here is empty
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-[8px] mt-[16px] mb-[24px]">
              {cart.map((item) => {
                const { title, details, price, id, model } = item.item;
                return (
                  <div
                    className="rounded-lg bg-bg w-full p-3 px-4 flex justify-between items-center h-[70px] bg-[#212123]"
                    key={id}
                  >
                    <div
                      className="bg-center bg-no-repeat bg-cover rounded-md h-full w-[100px]"
                      style={{ backgroundImage: `url(${details[0].photo[0]})` }}
                    />
                    <div className="ml-4 flex flex-col gap-1">
                      <h3 className="font-semibold text-[13px] leading-[16px]">
                        {title}
                      </h3>
                    </div>
                    <div className="text-[14px] leading-[18px]">
                      {item.color}
                    </div>
                    <div className="text-[14px] leading-[18px]">
                      {item.size}
                    </div>
                    <div className="text-[14px] leading-[18px]">{price}$</div>

                    <div className="flex items-center">
                      <div
                        className="bg-dark-sea rounded-md w-[25px] h-[25px] flex items-center justify-center cursor-pointer hover:bg-violet"
                        onClick={() => changeQuantity(item, -1)}
                      >
                        -
                      </div>

                      <span className="w-[40px] text-center text-[14px] leading-[17px]">
                        {item.quantity}
                      </span>

                      <div
                        className="bg-dark-sea rounded-md w-[25px] h-[25px] flex items-center justify-center cursor-pointer hover:bg-violet"
                        onClick={() => changeQuantity(item, 1)}
                      >
                        +
                      </div>
                    </div>

                    <div className="font-semibold text-[20px] leading-[24px] text-grey pl-[50px]">
                      {price * item.quantity}$
                    </div>

                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        removeItem({
                          model,
                          size: item.size,
                          color: item.color,
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {errorMessage && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}

        <div className="flex justify-between items-center mt-auto">
          <div className="font-semibold text-[20px] leading-[24px] text-grey pl-[50px]">
            TOTAL PRICE:{" "}
            <span className="text-white">
              {sumBy(cart.map(({ quantity, item }) => quantity * item.price))}$
            </span>
          </div>

          <Link
            to={"/"}
            className="bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] cursor-pointer hover:bg-violet"
          >
            Return to store
          </Link>

          <button
            className={`bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] ${
              !isAuth || cart.length === 0
                ? "cursor-not-allowed bg-gray-400"
                : "cursor-pointer"
            }`}
            disabled={!isAuth || cart.length === 0}
            onClick={buyItems}
          >
            Proceed to checkout
          </button>
        </div>
      </section>
    </>
  );
};
