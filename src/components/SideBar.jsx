import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <h2 className="text-2xl text-justify font-bold text-gray-800 mb-6">Admin Panel</h2>
      <nav>
        <ul className="text-justify">
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
              to="/products"
              className="text-gray-600 hover:text-indigo-600"
            >
              Products
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/orders" className="text-gray-600 hover:text-indigo-600">
              Orders
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">
              Users
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/messages"
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
          <li className="mb-4">
            <Link
              to="/register"
              className="text-orange-600 text-[21px] font-semibold hover:text-orange-600"
            >
              join
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
