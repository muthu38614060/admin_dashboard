import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      setError(""); 

      try {
        const response = await fetch("http://localhost:5001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email, 
            password: password,
          }),
        });

        const data = await response.json();
        console.log("Response:", response);
        console.log("Data:", data);

        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);  

          setIsAuthenticated(true);

          if (data.role === "admin") {
            navigate("/admin-dashboard");  
          } else {
            navigate("/dashboard");
          }
        } else {
          setError(data.message || "Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill in both fields.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <button
          type="submit"
          className={`w-full py-2 rounded ${loading ? "bg-gray-500" : "bg-blue-600"} text-white hover:bg-blue-700`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
