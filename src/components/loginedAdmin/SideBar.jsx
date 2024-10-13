import { UserCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/admin/product-list"
              className="text-gray-600 hover:text-indigo-600"
            >
              Products
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/order-list" className="text-gray-600 hover:text-indigo-600">
              Orders
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/user-list" className="text-gray-600 hover:text-indigo-600">
              Users
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/admin/chat"
              className="text-gray-600 hover:text-indigo-600"
            >
              Messages
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/settings"
              className="text-gray-600 hover:text-indigo-600"
            >
              Settings
            </Link>
          </li>
          <li className="mb-4 ">
            <Link to="/settings">
              <UserCircle className="text-black" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
