import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./Component/PrivateRoute"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
const role=localStorage.getItem('role')
const token=localStorage.getItem('token')

  useEffect(() => {
    
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          
          <Route
            path="/admin-dashboard"
            element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
          />

    

          <Route path="*" element={<Navigate to={role==='admin' ? "/admin-dashboard" : "/dashboard"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
