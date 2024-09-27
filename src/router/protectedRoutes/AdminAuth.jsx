import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminAuth = () => {
  const { isAdminExist } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  if (!isAdminExist) {
    navigate("/login");
  }
  return isAdminExist ? <Outlet /> : null;
};

export default AdminAuth;
