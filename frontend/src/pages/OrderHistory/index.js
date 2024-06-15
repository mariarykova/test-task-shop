import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchOrdersByUser } from "../../redux/slices/order";

import { Header } from "../../components/Header";

export const OrderHistory = () => {
  const { history } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(fetchOrdersByUser(user._id));
  }, [user, dispatch]);

  const Result = () => {
    return history.map((orders, index) => {
      let total = 0;
      return (
        <>
          <div className="bg-dark p-6 rounded-md" key={orders._id}>
            <div className="mb-[10px] text-violet-dark">
              Order # {index + 1}
            </div>
            {orders.items.map((order) => {
              const sum = order.price * order.quantity;
              const { title, quantity, color, size, price, _id } = order;
              total += sum;
              return (
                <>
                  <div className="flex justify-between mb-[10px]" key={_id}>
                    <div>{title}</div>
                    <div>Quantity: {quantity}</div>
                    <div>Color: {color}</div>
                    <div>Size: {size}</div>
                    <div>{price}$</div>
                  </div>
                </>
              );
            })}

            <div className="flex justify-end font-bold">Total: {total} </div>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <Header />
      <div className="text-center text-xl">Order History</div>
      <section className="flex flex-col p-6 gap-8 text-light w-full">
        {!history ? (
          <section className="flex-grow p-6 flex items-center justify-center">
            Loading...
          </section>
        ) : (
          Result()
        )}
        <div className="mt-5 flex gap-2.5">
          <Link
            to={"/"}
            className="bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] cursor-pointer hover:bg-violet"
          >
            Return to store
          </Link>
        </div>
      </section>
    </>
  );
};
