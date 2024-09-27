import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { axiosInstants } from "../config/axiosinstents";

const AdminLayout = () => {
  const checkAdmin = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/admin/check-admin"
      })
      console.log(response)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    checkAdmin()
  },[])
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sticky Sidebar */}
      <aside className="bg-gray-50 text-white shadow-lg p-8 w-64 sticky top-0 h-screen flex-shrink-0">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
