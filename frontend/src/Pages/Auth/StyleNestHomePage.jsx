import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function StyleNestHomepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-100">
      <section className="relative min-h-screen overflow-hidden">
        {/* Decorative Background Circles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-0 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Style Your
                  <span className="block bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                    Nest
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                  Discover curated fashion for every member of your family. From women's elegance to men's sophistication and kids' playful styles.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-center space-x-2">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                <button className="border-2 border-pink-400 text-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-pink-400 hover:text-white transition-all duration-300">
                  Explore Collections
                </button>
              </div>

              {/* Stats */}
              <div className="flex justify-center lg:justify-start space-x-6 sm:space-x-8 pt-4">
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">15K+</div>
                  <div className="text-xs sm:text-sm text-gray-500">Happy Families</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-xs sm:text-sm text-gray-500">Products</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">4.8</div>
                  <div className="text-xs sm:text-sm text-gray-500">Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-pink-400 rounded-3xl blur-3xl opacity-30 transform rotate-6"></div>
              <div className="relative bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[3/4] bg-gradient-to-br from-white via-pink-50 to-rose-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-pink-500">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-pink-400 rounded-full mx-auto mb-4"></div>
                    <p className="text-sm">Featured Model<br />Spring Collection</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}


