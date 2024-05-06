import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Layout from "./pages/Layout";
import Loader from "./components/Loader";
import Alert from "./components/Alert";
import SendVerificationOTPPage from "./pages/SendOTP";
import OtpVerification from "./pages/VerifyOtp";
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
    path: "/home",
    element: <Layout />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/otp",
    element: <SendVerificationOTPPage />,
  },
  {
    path: "/verify",
    element: <OtpVerification />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
