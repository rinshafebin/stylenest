import React from "react";
import { Menu, Bell, Search, User } from "lucide-react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor store performance</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
