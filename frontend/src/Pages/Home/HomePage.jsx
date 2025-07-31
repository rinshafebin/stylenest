import React from 'react';
import { ChevronRight, Star, Heart, ShoppingBag, Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-black mb-4">
                Style Your{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                  Nest
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover curated fashion for every member of your family.
                From women's elegance to men's sophistication and kids'
                playful styles.
              </p>

              {/* Buttons */}
              <div className="flex space-x-4 mb-12">
                <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:opacity-90 flex items-center">
                  Shop Now <ChevronRight className="ml-2 w-4 h-4" />
                </button>
                <button className="border-2 border-rose-500 text-rose-600 px-8 py-3 rounded-lg hover:bg-rose-50">
                  Explore Collections
                </button>
              </div>

              {/* Stats */}
              <div className="flex space-x-8">
                <div>
                  <div className="text-2xl font-bold text-black">15K+</div>
                  <div className="text-gray-600">Happy Families</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">1000+</div>
                  <div className="text-gray-600">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">4.8</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Side Visual */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="w-full h-96 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mx-auto mb-4"></div>
                    <div className="text-rose-600 font-semibold">Featured Model</div>
                    <div className="text-rose-400">Spring Collection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find the perfect style for everyone in your family</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-8 h-64 flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-black">Women</h3>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-black mb-2">Women's Collection</h4>
                <p className="text-gray-600">Elegant and sophisticated styles</p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-64 flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-black">Men</h3>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-black mb-2">Men's Collection</h4>
                <p className="text-gray-600">Classic and contemporary fashion</p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 h-64 flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-black">Kids</h3>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-black mb-2">Kids Collection</h4>
                <p className="text-gray-600">Fun and playful designs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our most popular items</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl"></div>
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-black mb-2">Product Name</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">(24 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-black">$49.99</span>
                      <span className="text-gray-400 line-through">$69.99</span>
                    </div>
                    <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-2 rounded-lg transform hover:scale-105 transition-all duration-200">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Why Choose StyleNest?</h2>
            <p className="text-gray-600">We're committed to providing the best shopping experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-black mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-black mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is safe</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-black mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-semibold text-black mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
    
  );
}

