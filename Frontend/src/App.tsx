import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDetails from "./components/StudentDetails";
import TeacherLayout from "./layout/TeacherLayout";
import Classrooms from "./components/Classrooms";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to={!user.isAdmin? "/teacher" : "/admin"} />
          ) : (
            <Login />
          )
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Teacher with nested routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="students" element={<StudentDetails />} />
        <Route path="classrooms" element={<Classrooms />} />
        {/* more teacher child routes can go here */}
      </Route>

      {/* Root redirect */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={user.isAdmin ? "/teacher" : "/admin"} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
