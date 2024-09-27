import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstants } from "../config/axiosinstents";
import Header from "../components/loginedAdmin/Header";


const AdminLayout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      await axiosInstants({
        method: "GET",
        url: "/user/check-user",
      });
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg bg-gradient-to-r from-yellow-500 to-orange-600 "></span>
      </div>
    ); // Optionally show a loading indicator
  }
  return (
    <div>
      <Header/>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
