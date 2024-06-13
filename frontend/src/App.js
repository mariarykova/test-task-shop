import React, { useEffect } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "./App.css";
import { Catalogue } from "./pages/Catalogue";
import { Good } from "./pages/ProductPage";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Registration } from "./pages/Registration";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { OrderHistory } from "./pages/OrderHistory";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Catalogue /> },
    { path: "/products/:model", element: <Good /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Registration /> },
    { path: "/cart", element: <Cart /> },
    { path: "/history", element: <OrderHistory /> },
  ]);
  return routes;
};

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
