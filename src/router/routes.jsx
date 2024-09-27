import { createBrowserRouter } from "react-router-dom";

import SignupPage from "../pages/Signup";
import AdminLayout from "../layout/AdminLayout";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout/>,

    children: [
      {
        path: "register",
        element: <SignupPage/>
      }
    ]
  },
]);
