import React from "react";
import { Link } from "react-router-dom";
import { User, Phone, MapPin, Home, Building } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        {/* Back to Cart */}
        <div className="mb-4">
          <Link
            to="/cart"
            className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left - Shipping Form */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-6">Shipping Details</h2>
            <form className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Phone Number */}
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Pincode */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* State */}
              <div className="relative">
                <Building className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* City */}
              <div className="relative">
                <Home className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Building */}
              <div className="relative">
                <Home className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Building"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Street */}
              <div className="relative">
                <Home className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Street"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Continue to Payment */}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Continue to Payment
              </button>
            </form>
          </div>

          {/* Right - Order Summary */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {/* Product Item */}
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="text-gray-700 font-medium">Product Name</p>
                  <p className="text-sm text-gray-500">Qty: 1</p>
                </div>
                <p className="text-gray-700 font-semibold">₹999</p>
              </div>

              {/* Another Product */}
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="text-gray-700 font-medium">Another Product</p>
                  <p className="text-sm text-gray-500">Qty: 2</p>
                </div>
                <p className="text-gray-700 font-semibold">₹1,499</p>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between pt-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800 font-medium">₹2,498</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800 font-medium">₹50</span>
              </div>

              {/* Total */}
              <div className="flex justify-between border-t pt-2 text-lg font-bold">
                <span>Total</span>
                <span>₹2,548</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
