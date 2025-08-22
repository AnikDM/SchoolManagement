import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";

const TeacherLayout: React.FC = () => {
  const { user } = useAuth();
  return (
    <ProtectedRoute isAdmin={false}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar (fixed width or collapsible) */}
        <Sidebar role="teacher" />

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

export default TeacherLayout;
