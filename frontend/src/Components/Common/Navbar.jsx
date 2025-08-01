import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Wishlist from '../../Pages/Home/wishlist';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
    if (accessToken && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null)
    }
  }, [location]);

  const handleLogout = () => {
    navigate('/logout');
  };


  const handleLogin = () => {
    navigate('/login');
  };


  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SN</span>
            </div>
            <span className="text-xl font-bold text-black">StyleNest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {['New Arrivals', 'Women', 'Men', 'Kids'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-black hover:text-rose-600 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-black cursor-pointer hover:text-rose-700 transition-colors hidden sm:block" />
            <User className="w-5 h-5 text-black cursor-pointer hover:text-rose-700 transition-colors hidden sm:block" />
            <Link to="/Wishlist">
              <Heart className="w-5 h-5 text-  black cursor-pointer hover:text-rose-700 transition-colors" />
            </Link>
            <Link to="/cart">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-black cursor-pointer hover:text-rose-700 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>

            </Link>

            {/* Auth Buttons */}
            {user ? (
              <>
                <span className="hidden sm:block text-black text-sm">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-black hover:text-red-600 text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="text-black hover:text-rose-700 text-sm font-medium"
                >
                  Login
                </button>

                {/* <Link
                  to="/register"
                  className="text-black hover:text-rose-700 text-sm font-medium"
                >
                  Register
                </Link> */}
              </>
            )}


          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
