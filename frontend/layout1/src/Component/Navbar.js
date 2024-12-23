import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-white font-bold text-lg">App</Link>

        <div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-white mx-4">Dashboard</Link>
              <Link to="/admin-dashboard" className="text-white mx-4">Admin Dashboard</Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-4">Login</Link>
              <Link to="/register" className="text-white mx-4">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
