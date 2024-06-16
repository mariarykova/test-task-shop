import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { Modal } from "../Modal";
import { AuthForm } from "../User";
import Button from "../Button";

import {
  selectIsAuth,
  logout,
  fetchAuth,
  fetchRegister,
  toggleFormType,
} from "../../redux/slices/auth";
import { emptyOrder } from "../../redux/slices/order";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const { user, cart, formType } = useSelector((state) => state.auth);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(emptyOrder());
    window.localStorage.removeItem("token");
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const total = useCallback(() => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [cart]);

  const onSubmitLogin = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) return alert("Cannot log in");

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    toggleModal();
  };

  const onSubmitRegister = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) return alert("Cannot sign up");

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }

    toggleModal();
  };

  return (
    <>
      <div className="p-8 flex justify-around items-center">
        <div className="flex gap-2">
          {isAuth ? (
            <button onClick={onLogout}>Log Out</button>
          ) : (
            <>
              <Button
                onClick={() => {
                  toggleModal();
                  dispatch(toggleFormType("login"));
                }}
              >
                Log In
              </Button>

              <Button
                onClick={() => {
                  toggleModal();
                  dispatch(toggleFormType("signup"));
                }}
              >
                Sign up
              </Button>
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
      {isModal && (
        <Modal
          title={formType === "signup" ? "Sign up" : "LogIn"}
          onClose={toggleModal}
          isOpen={isModal}
        >
          <AuthForm
            onSubmitRegister={onSubmitRegister}
            onSubmitLogin={onSubmitLogin}
          />
        </Modal>
      )}
    </>
  );
};
