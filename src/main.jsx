import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// pages
import App from "./App";
import Index from "./Page/Login/Index";
import ErrorPage from "./Page/ErrorPage";
import Login from "./Page/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:id",
        element: <App />,
      },
    ],
  },
  {
    path: "/login",
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login/account",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
