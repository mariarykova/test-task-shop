import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "./App.css";
import { Catalogue } from "./pages/Catalogue";
import { Good } from "./pages/ProductPage";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Catalogue /> },
    { path: "/products/:model", element: <Good /> },
    // Add more routes as needed
  ]);
  return routes;
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
