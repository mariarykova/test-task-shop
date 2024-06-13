import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrdersByUser } from "../../redux/slices/order";

import { Header } from "../../components/Header";

export const OrderHistory = () => {
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(fetchOrdersByUser(user._id));
  }, [user]);

  console.log(orders);

  const Result = () => {
    return orders.map((orders, index) => {
      let total = 0;
      return (
        <>
          <div className="bg-grey p-6 rounded-md">
            <div className="mb-[10px] text-violet-dark">
              Order # {index + 1}
            </div>
            {orders.items.map((order) => {
              const sum = order.price * order.quantity;
              total += sum;
              return (
                <>
                  <div className="flex justify-between mb-[10px]">
                    <div className="font-bold">{order.title}</div>
                    <div className="text-dark font-bold">
                      Quantity: {order.quantity}
                    </div>
                    <div className="text-dark font-bold">
                      Color: {order.color}
                    </div>
                    <div className="text-dark font-bold">
                      Size: {order.size}
                    </div>
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
      <h2>Order History</h2>
      <section className="flex flex-col p-6 gap-8 text-light w-full">
        {!orders ? (
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
