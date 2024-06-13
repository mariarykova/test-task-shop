import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

import "./registration.css";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) return alert("Cannot sign up");

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="wrapper">
      <div className="title">Sign Up</div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="group">
          <input
            type="email"
            placeholder="Your email"
            name="email"
            //value={values.email}
            autoComplete="off"
            //onChange={handleChange}
            {...register("email", { required: "Please, provide yout email" })}
          />
          <div className="error">
            {Boolean(errors.email?.message) && errors.email?.message}
          </div>
        </div>

        <div className="group">
          <input
            type="name"
            placeholder="Your name"
            name="fullName"
            //value={values.name}
            autoComplete="off"
            //onChange={handleChange}
            {...register("fullName", { required: "Please, provide your name" })}
          />
          <div className="error">
            {Boolean(errors.fullName?.message) && errors.fullName?.message}
          </div>
        </div>

        <div className="group">
          <input
            type="password"
            placeholder="Your password"
            name="password"
            //value={values.password}
            autoComplete="off"
            //onChange={handleChange}
            {...register("password", {
              required: "Please, provide your password",
            })}
          />
          <div className="error">
            {Boolean(errors.password?.message) && errors.password?.message}
          </div>
        </div>

        <div className="group">
          <input
            type="avatar"
            placeholder="Your avatar"
            name="avatar"
            //value={values.avatar}
            autoComplete="off"
            //onChange={handleChange}
            //required
          />
        </div>

        <div
          className="link"
          //  onClick={() => toggleCurrentFormType("login")}
        >
          I already have an account
        </div>

        <button disabled={!isValid} type="submit" className="submit">
          Create an account
        </button>
      </form>
    </div>
  );
};
