import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Search, Menu, User, ArrowRight, Truck, Shield, RotateCcw, X } from 'lucide-react';

export default function StyleNestHomepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white text-sm py-2">
          <div className="container mx-auto px-4 text-center">
            <p className="hidden sm:block">Free shipping on orders over $50 • Use code: FREESHIP</p>
            <p className="sm:hidden">Free shipping over $50</p>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SN</span>
              </div>
              <span className="text-xl font-bold text-slate-800">StyleNest</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">New Arrivals</a>
              <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Women</a>
              <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Men</a>
              <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Kids</a>
              <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Accessories</a>
              <a href="#" className="text-red-600 hover:text-red-700 transition-colors font-medium">Sale</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-slate-600 cursor-pointer hover:text-slate-800 transition-colors hidden sm:block" />
              <User className="w-5 h-5 text-slate-600 cursor-pointer hover:text-slate-800 transition-colors hidden sm:block" />
              <Heart className="w-5 h-5 text-slate-600 cursor-pointer hover:text-slate-800 transition-colors" />
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-slate-600 cursor-pointer hover:text-slate-800 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-slate-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-600" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-4 pt-4">
                <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">New Arrivals</a>
                <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Women</a>
                <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Men</a>
                <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Kids</a>
                <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Accessories</a>
                <a href="#" className="text-red-600 hover:text-red-700 transition-colors font-medium">Sale</a>
                <div className="flex items-center space-x-4 pt-2">
                  <Search className="w-5 h-5 text-slate-600 cursor-pointer hover:text-slate-800 transition-colors" />
                  <User className="w-5 h-5 text-slate-600 cursor-pointer hover:text-slate-800 transition-colors" />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-slate-700 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-slate-800 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-0 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <span className="inline-block bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Spring Collection 2024
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                  Style Your
                  <span className="block bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                    Nest
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 max-w-lg mx-auto lg:mx-0">
                  Discover curated fashion for every member of your family. From women's elegance to men's sophistication and kids' playful styles.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-center space-x-2">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                <button className="border-2 border-slate-800 text-slate-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-slate-800 hover:text-white transition-all duration-300">
                  Explore Collections
                </button>
              </div>

              {/* Stats */}
              <div className="flex justify-center lg:justify-start space-x-6 sm:space-x-8 pt-4">
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">15K+</div>
                  <div className="text-xs sm:text-sm text-slate-600">Happy Families</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">1000+</div>
                  <div className="text-xs sm:text-sm text-slate-600">Products</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">4.8</div>
                  <div className="text-xs sm:text-sm text-slate-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600 rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-slate-300 rounded-full mx-auto mb-4"></div>
                    <p className="text-sm">Featured Model<br />Spring Collection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Shop by Category</h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Curated collections for every style and every member of your family
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Women Section */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4 h-80 sm:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-200 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-rose-400">
                    <div className="w-16 h-16 bg-rose-300 rounded-full mx-auto mb-4"></div>
                    <p className="text-sm font-medium">Women's Collection</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Women</h3>
                  <p className="text-slate-600 text-sm mb-4">Elegant & Modern Styles</p>
                  <button className="bg-white/90 backdrop-blur-sm text-slate-900 px-6 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    Shop Women
                  </button>
                </div>
              </div>
            </div>

            {/* Men Section */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4 h-80 sm:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-blue-400">
                    <div className="w-16 h-16 bg-blue-300 rounded-full mx-auto mb-4"></div>
                    <p className="text-sm font-medium">Men's Collection</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Men</h3>
                  <p className="text-slate-600 text-sm mb-4">Sophisticated & Sharp</p>
                  <button className="bg-white/90 backdrop-blur-sm text-slate-900 px-6 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    Shop Men
                  </button>
                </div>
              </div>
            </div>

            {/* Kids Section */}
            <div className="group cursor-pointer sm:col-span-2 lg:col-span-1">
              <div className="relative overflow-hidden rounded-2xl mb-4 h-80 sm:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-200 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-yellow-400">
                    <div className="w-16 h-16 bg-yellow-300 rounded-full mx-auto mb-4"></div>
                    <p className="text-sm font-medium">Kids Collection</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Kids</h3>
                  <p className="text-slate-600 text-sm mb-4">Fun & Comfortable</p>
                  <button className="bg-white/90 backdrop-blur-sm text-slate-900 px-6 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    Shop Kids
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Truck className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-slate-600 text-sm sm:text-base">Free shipping on all orders over $50. No hidden fees.</p>
            </div>
            <div className="text-center group">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <RotateCcw className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-slate-600 text-sm sm:text-base">30-day return policy. No questions asked.</p>
            </div>
            <div className="text-center group sm:col-span-2 lg:col-span-1">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-slate-600 text-sm sm:text-base">Your payment information is always protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Featured Products</h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Handpicked items from our latest collection. Quality meets style in every piece.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
                  <div className="absolute top-4 right-4">
                    <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-white hover:text-red-500 transition-colors drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <button className="w-full bg-white/90 backdrop-blur-sm text-slate-900 py-2 sm:py-3 rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm sm:text-base">
                      Quick Add
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Premium Cotton Tee</h3>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs sm:text-sm text-slate-500 ml-2">(24)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg sm:text-xl font-bold text-slate-900">$39</span>
                    <span className="text-sm text-slate-500 line-through">$59</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-slate-700 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Stay Styled</h2>
            <p className="text-lg sm:text-xl text-slate-200 mb-6 sm:mb-8">
              Subscribe to our newsletter and be the first to know about new collections and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-0 focus:ring-4 focus:ring-white/20 outline-none text-sm sm:text-base"
              />
              <button className="bg-white text-slate-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SN</span>
                </div>
                <span className="text-xl font-bold">StyleNest</span>
              </div>
              <p className="text-slate-400 text-sm sm:text-base">
                Fashion forward clothing for the modern family. Quality, style, and comfort in every piece.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <div className="space-y-2 text-slate-400 text-sm sm:text-base">
                <p className="hover:text-white cursor-pointer transition-colors">New Arrivals</p>
                <p className="hover:text-white cursor-pointer transition-colors">Women</p>
                <p className="hover:text-white cursor-pointer transition-colors">Men</p>
                <p className="hover:text-white cursor-pointer transition-colors">Kids</p>
                <p className="hover:text-white cursor-pointer transition-colors">Accessories</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-slate-400 text-sm sm:text-base">
                <p className="hover:text-white cursor-pointer transition-colors">Contact Us</p>
                <p className="hover:text-white cursor-pointer transition-colors">Size Guide</p>
                <p className="hover:text-white cursor-pointer transition-colors">Shipping Info</p>
                <p className="hover:text-white cursor-pointer transition-colors">Returns</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-slate-400 text-sm sm:text-base">
                <p className="hover:text-white cursor-pointer transition-colors">About Us</p>
                <p className="hover:text-white cursor-pointer transition-colors">Careers</p>
                <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
                <p className="hover:text-white cursor-pointer transition-colors">Terms of Service</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm sm:text-base">
            <p>&copy; 2024 StyleNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}