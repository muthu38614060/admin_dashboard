import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }
  
    setLoading(true); 
    setError("");
  
    const userData = {  email, password, role }; 
  
    try {
      const backendUrl = "http://localhost:5001"; 
  
      const response = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), 
      });
  
      const data = await response.json();
      
      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };
  
  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">Create Account</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2" htmlFor="role">
            Select Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          onClick={handleRegister}
          className={`w-full py-3 rounded-lg font-semibold text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} focus:ring-2 focus:ring-green-400 focus:outline-none`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>

      <div className="mt-6 text-center text-white">
        <p>
          Already have an account?{" "}
          <span className="font-medium text-indigo-300 cursor-pointer" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
