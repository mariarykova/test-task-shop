import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div className="bg-dark w-[500px] p-6 relative top-1/4 left-1/4 middle">
      <div className="text-center text-light font-normal text-sm leading-[18px]">
        Log In
      </div>

      <form
        className="mt-6 flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            autoComplete="off"
            {...register("email", { required: "Please, provide yout email" })}
            className="w-full bg-[#212123] rounded-lg text-[var(--light)] p-3.5"
          />
          <div className="mt-1 text-sm text-red-500">
            {Boolean(errors.email?.message) && errors.email?.message}
          </div>
        </div>

        <div>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            autoComplete="off"
            {...register("password", {
              required: "Please, provide yout password",
            })}
            className="w-full bg-[#212123] rounded-lg text-[var(--light)] p-3.5"
          />
          <div className="mt-1 text-sm text-red-500">
            {Boolean(errors.password?.message) && errors.password?.message}
          </div>
        </div>

        <Link to="/register">
          <div className="mt-6 text-center text-sm text-dark-sea cursor-pointer hover:text-light">
            Create an account
          </div>
        </Link>

        <button
          type="submit"
          className="bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] cursor-pointer hover:bg-violet"
        >
          Login
        </button>

        <Link
          to={"/"}
          className="bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] cursor-pointer hover:bg-violet"
        >
          Return to store
        </Link>
      </form>
    </div>
  );
};
