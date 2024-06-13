import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, logout } from "../../redux/slices/auth";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const { user, cart } = useSelector((state) => state.auth);
  //  const { cart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  const total = useCallback(() => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [cart]);

  return (
    <div className="p-8 flex justify-around items-center">
      <div className="flex gap-2">
        {isAuth ? (
          <button onClick={onLogout}>Log Out</button>
        ) : (
          <>
            <Link to={"/login"}>
              <button className="bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] cursor-pointer hover:bg-violet">
                Log In
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] cursor-pointer hover:bg-violet">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>

      <div className="flex justify-between items-center gap-5">
        <div>{isAuth && user.fullName}</div>
        <div>
          {isAuth && (
            <Link to={"/history"}>
              <span>Order History</span>
            </Link>
          )}
        </div>
        <Link to={"/cart"} className="relative w-5 h-5">
          <FontAwesomeIcon icon={faShoppingCart} />{" "}
          <span className="absolute w-5 h-5 bg-violet right-[-9px] bottom-[9px] rounded-full font-bold text-[13px] text-light leading-[15px] pt-[2px] pl-[7px]">
            {!!cart.length ? <span className="count">{total()}</span> : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};
