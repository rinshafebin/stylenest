import React from 'react'

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-rose-50 text-gray-700 py-12 sm:py-16 border-t border-pink-100 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Brand Section */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-300 to-pink-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SN</span>
                </div>
                <span className="text-xl font-bold text-pink-600">StyleNest</span>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                Fashion forward clothing for the modern family. Quality, style, and comfort in every piece.
              </p>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="font-semibold mb-4 text-pink-600">Shop</h3>
              <div className="space-y-2 text-gray-500 text-sm sm:text-base">
                <p className="hover:text-pink-500 cursor-pointer transition-colors">New Arrivals</p>
                <p className="hover:text-pink-500 cursor-pointer transition-colors">Women</p>
                <p className="hover:text-pink-500 cursor-pointer transition-colors">Men</p>
                <p className="hover:text-pink-500 cursor-pointer transition-colors">Kids</p>
              </div>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4 text-pink-600">Support</h3>
              <div className="space-y-2 text-gray-500 text-sm sm:text-base">
                <p className="hover:text-pink-500 cursor-pointer transition-colors">Contact Us</p>
                <p className="hover:text-pink-500 cursor-pointer transition-colors">Shipping Info</p>
                <p className="hover:text-pink-500 cursor-pointer transition-colors">Returns</p>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4 text-pink-600">Company</h3>
              <div className="space-y-2 text-gray-500 text-sm sm:text-base">
                <p className="hover:text-pink-500 cursor-pointer transition-colors">About Us</p>
                <p className="hover:text-pink-500 cursor-pointer transition-colors">Privacy Policy</p>
                <p className="hover:text-pink-500 cursor-pointer transition-colors">Terms of Service</p>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-pink-100 mt-12 pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2025 StyleNest. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer