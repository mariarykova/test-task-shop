import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import "./login.css";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "test@test.ru",
      password: "test",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) return alert("Cannot log in");

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="wrapper">
      <div className="close">
        <svg className="icon">
          {/*<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />*/}
        </svg>
      </div>

      <div className="title">Log In</div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="group">
          <input
            type="email"
            placeholder="Your email"
            name="email"
            //  value={values.email}
            autoComplete="off"
            //  onChange={handleChange}
            {...register("email", { required: "Please, provide yout email" })}
          />
          <div className="error">
            {Boolean(errors.email?.message) && errors.email?.message}
          </div>
        </div>

        <div className="group">
          <input
            type="password"
            placeholder="Your password"
            name="password"
            //  value={values.password}
            autoComplete="off"
            //  onChange={handleChange}
            {...register("password", {
              required: "Please, provide yout password",
            })}
          />
          <div className="error">
            {Boolean(errors.password?.message) && errors.password?.message}
          </div>
        </div>

        <div
          //onClick={() => toggleCurrentFormType("signup")}
          className="link"
        >
          Create an account
        </div>

        <button type="submit" className="submit">
          Login
        </button>
      </form>
    </div>
  );
};
