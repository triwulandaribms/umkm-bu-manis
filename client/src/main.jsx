import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import ErrorPageACust from "./pages/ErrorPageCust.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import DetailProduct from "./pages/DetailProduct.jsx";
import Login from "./pages/Login.jsx";
import RegisterCustomer from "./pages/RegisterCustomer.jsx";
import RegisterAdmin from "./pages/RegisterAdmin.jsx";
import ErrorPageAdmin from "./pages/ErrorPageAdmin.jsx";
import CartCustomer from "./pages/CartCustomer.jsx";
import DashboardAdmin from "./pages/DashboardAdmin.jsx";
import ProfileAdmin from "./pages/ProfileAdmin.jsx";
import ShopProduct from "./pages/ShopProduct.jsx";
import CustUserAdmin from "./pages/CustUserAdmin.jsx";
import Cashier from "./pages/Cashier.jsx";
import SalesReport from "./pages/SalesReport.jsx";
import ProductAdmin from "./pages/ProductAdmin.jsx";
import ProfileCustomer from "./pages/ProfileCustomer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPageACust />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register-customer",
        element: <RegisterCustomer />,
      },
      {
        path: "/register-admin",
        element: <RegisterAdmin />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/product/:id",
        element: <DetailProduct />,
      },
      {
        path: "/cart",
        element: <CartCustomer />,
      },
      {
        path: "/shop",
        element: <ShopProduct />,
      },
      {
        path: "/profile",
        element: <ProfileCustomer />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPageAdmin />,
    children: [
      {
        index: true,
        element: <DashboardAdmin />,
      },
      {
        path: "profile",
        element: <ProfileAdmin />,
      },
      {
        path: "customer-user",
        element: <CustUserAdmin />,
      },
      {
        path: "cashier",
        element: <Cashier />,
      },
      {
        path: "sales-report",
        element: <SalesReport />,
      },
      {
        path: "product",
        element: <ProductAdmin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
