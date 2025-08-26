import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { user } = useAuth();
  return (
    <ProtectedRoute isAdmin={true}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar (fixed width or collapsible) */}
        <Sidebar role="admin" />

        {/* Main content (flex-1) */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header
            userName={user?.fullName}
            showNotifications={false}
            unreadNotifications={0}
            onToggleNotifications={() => {}}
          />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
