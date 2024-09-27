import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import { axiosInstants } from "../config/axiosinstents";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../components/loginedAdmin/SideBar";
import { clearAdmin, saveAdmin } from "../redux/features/adminSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { isAdminExist } = useSelector((state) => state.admin);

  const checkAdmin = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/admin/check-admin",
      });
      dispatch(saveAdmin());
      console.log(response);
    } catch (error) {
      dispatch(clearAdmin());
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg bg-gradient-to-r from-yellow-500 to-orange-600 "></span>
      </div>
    ); // Optionally show a loading indicator
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sticky Sidebar */}
      {isAdminExist ? (
        <aside className="bg-gray-50 text-white shadow-lg p-8 w-64 sticky top-0 h-screen flex-shrink-0">
          <AdminSidebar />
        </aside>
      ) : (
        <aside className="bg-gray-50 text-white shadow-lg p-8 w-64 sticky top-0 h-screen flex-shrink-0">
          <SideBar />
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
