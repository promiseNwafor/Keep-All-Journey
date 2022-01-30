import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const ProtectedRoutes = () => {
  const [sidebarExpand, setSidebarExpand] = useState<boolean>(true);
  let currentUser = localStorage.getItem("user");

  const handleSidebarState = () => {
    setSidebarExpand(!sidebarExpand);
  };

  return currentUser ? (
    <>
      <Sidebar
        handleSidebarState={handleSidebarState}
        sidebarExpand={sidebarExpand}
      />
      <div className={`Routes ${sidebarExpand ? "" : "sidebar-compress"}`}>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="auth" />
  );
};

export default ProtectedRoutes;
