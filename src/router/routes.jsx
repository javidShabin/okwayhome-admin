import { createBrowserRouter } from "react-router-dom";

import SignupPage from "../pages/Signup";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/Login";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout/>,

    children: [
      {
        path: "/",
        element: <Dashboard/>
      },
      {
        path: "register",
        element: <SignupPage/>
      },
      {
        path: "login",
        element: <LoginPage/>
      }
    ]
  },
]);
