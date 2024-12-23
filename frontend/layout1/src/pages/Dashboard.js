import React from "react";
import { Navigate } from "react-router-dom";

function Dashboard() {

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <p className="mt-4">This is the user dashboard. You have limited access.</p>
    </div>
  );
}

export default Dashboard;
