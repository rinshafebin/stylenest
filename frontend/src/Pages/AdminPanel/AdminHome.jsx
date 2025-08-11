// pages/AdminHome.js
import React, { useState, useEffect } from "react";
import Sidebar from '../../Components/Admin/Sidebar';
import Header from "../../Components/Admin/Header";
import StatsCard from '../../Components/Admin/StatsCard';
import { DollarSign, ShoppingCart, Users, BarChart3 } from "lucide-react";
import axiosInstance from "../../api/axios"; 

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/dashboard-stats/")
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map((card, i) => (
                  <StatsCard key={i} {...card} />
                ))}
              </div>
            ) : (
              <p>Loading dashboard stats...</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
