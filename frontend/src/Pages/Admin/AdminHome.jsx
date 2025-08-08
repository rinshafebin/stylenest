import React, { useState } from 'react';
import {
  Menu, Bell, Search, User, Home, Users, BarChart3, Settings, Package, ShoppingBag,
  CreditCard, Truck, Star, TrendingUp, TrendingDown, DollarSign, ShoppingCart,
  MoreHorizontal, Filter, RefreshCw
} from 'lucide-react';

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: ShoppingBag, label: 'Orders', badge: '12' },
    { icon: Package, label: 'Products', count: '2.4k' },
    { icon: Users, label: 'Customers', count: '892' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: CreditCard, label: 'Payments' },
    { icon: Truck, label: 'Shipping' },
    { icon: Star, label: 'Reviews' },
    { icon: Settings, label: 'Settings' }
  ];

  const statsCards = [
    {
      title: 'Total Sales',
      value: '$482,039',
      change: '+12.8%',
      trend: 'up',
      icon: DollarSign,
      color: 'rose',
      period: 'vs last month'
    },
    {
      title: 'Orders',
      value: '3,847',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'pink',
      period: 'vs last month'
    },
    {
      title: 'Customers',
      value: '18,239',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'gray',
      period: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: '4.8%',
      change: '-2.1%',
      trend: 'down',
      icon: BarChart3,
      color: 'amber',
      period: 'vs last month'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      rose: 'text-rose-600 bg-rose-50 border-rose-100',
      pink: 'text-pink-600 bg-pink-50 border-pink-100',
      gray: 'text-gray-600 bg-gray-50 border-gray-100',
      amber: 'text-amber-600 bg-amber-50 border-amber-100'
    };
    return colors[color] || colors.rose;
  };

  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">StyleNest</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, idx) => (
            <div key={idx} className={`group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              item.active
                ? 'bg-rose-50 text-rose-600 border border-rose-100 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-black'
            }`}>
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${item.active ? 'text-rose-600' : 'text-gray-400 group-hover:text-black'}`} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </div>
              {sidebarOpen && (item.badge || item.count) && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.badge
                    ? 'bg-rose-100 text-rose-600 font-semibold'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.badge || item.count}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
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
                  className="pl-10 pr-4 py-2 w-72 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Stats */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(card.color)}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {card.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-rose-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${card.trend === 'up' ? 'text-rose-600' : 'text-red-600'}`}>
                      {card.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm text-gray-500 font-medium">{card.title}</h3>
                <p className="text-2xl font-bold text-black">{card.value}</p>
                <p className="text-xs text-gray-400">{card.period}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
