import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = () => {
    // This should be replaced with actual login logic
    const dummyUser = { name: 'Pathu' };
    setUser(dummyUser);
    localStorage.setItem('user', JSON.stringify(dummyUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Optionally: notify backend about logout
  };

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SN</span>
            </div>
            <span className="text-xl font-bold text-black">StyleNest</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {['New Arrivals', 'Women', 'Men', 'Kids', 'Accessories'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-black hover:text-rose-600 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
            <a href="#" className="text-red-600 hover:text-red-700 transition-colors font-medium">
              Sale
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-black cursor-pointer hover:text-rose-700 transition-colors hidden sm:block" />
            <User className="w-5 h-5 text-black cursor-pointer hover:text-rose-700 transition-colors hidden sm:block" />
            <Heart className="w-5 h-5 text-black cursor-pointer hover:text-rose-700 transition-colors" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-black cursor-pointer hover:text-rose-700 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>

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
                <a
                  href="/register"
                  className="text-black hover:text-rose-700 text-sm font-medium"
                >
                  Register
                </a>
              </>
            )}

            {/* Hamburger for mobile */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-black" />
              ) : (
                <Menu className="w-5 h-5 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4 pt-4">
              {['New Arrivals', 'Women', 'Men', 'Kids', 'Accessories'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-black hover:text-rose-700 transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
              <a href="#" className="text-red-600 hover:text-red-700 transition-colors font-medium">
                Sale
              </a>
              <div className="flex items-center space-x-4 pt-2">
                <Search className="w-5 h-5 text-black hover:text-rose-700 transition-colors" />
                <User className="w-5 h-5 text-black hover:text-rose-700 transition-colors" />
              </div>
              <div className="pt-4 flex gap-4">
                {user ? (
                  <>
                    <span className="text-black text-sm">Hi, {user.name}</span>
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
                    <a
                      href="/register"
                      className="text-black hover:text-rose-700 text-sm font-medium"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
