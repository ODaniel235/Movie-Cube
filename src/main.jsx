import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Layout from "./pages/Layout";
import Loader from "./components/Loader";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Layout />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/loading",
    element: <Loader />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
