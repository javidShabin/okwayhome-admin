import { createBrowserRouter } from "react-router-dom";

import SignupPage from "../pages/Signup";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import AdminAuth from "./protectedRoutes/AdminAuth";
import UserList from "../pages/loginedAdmin/UserList";
import ProductList from "../pages/loginedAdmin/ProductList";
import OrderList from "../pages/loginedAdmin/OrderList";
import ChatPage from "../pages/loginedAdmin/ChatPage";
import CreateProduct from "../components/loginedAdmin/CreateProduct";



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
      },

      {
        path: "admin",
        element: <AdminAuth/>,

        children: [
          {
            path: "user-list",
            element: <UserList/>
          },
          {
            path: "product-list",
            element: <ProductList/>
          },
          {
            path: "order-list",
            element: <OrderList/>
          },
          {
            path: "chat",
            element: <ChatPage/>
          },
          {
            path: "create-product",
            element: <CreateProduct/>
          }
        ]
      }
    ]
  },
]);
