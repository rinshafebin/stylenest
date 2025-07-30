import React from 'react';
import { Truck, RotateCcw, Shield, Heart, Star } from 'lucide-react';

const Category = () => {
  const products = [
    { id: 1, title: "Floral Summer Shirt", price: "₹499", color: "bg-pink-300" },
    { id: 2, title: "Denim Jacket", price: "₹899", color: "bg-blue-400" },
    { id: 3, title: "Casual Sneakers", price: "₹999", color: "bg-yellow-300" },
    { id: 4, title: "Kids Cotton T-shirt", price: "₹299", color: "bg-green-300" },
  ];

  return (
    <div className="bg-white">
      {/* Info Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center space-x-4">
          <Truck className="text-pink-500" />
          <div>
            <p className="font-medium text-gray-800">Free Shipping</p>
            <p className="text-sm text-gray-500">On orders over ₹999</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <RotateCcw className="text-pink-500" />
          <div>
            <p className="font-medium text-gray-800">Easy Returns</p>
            <p className="text-sm text-gray-500">Within 7 days</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Shield className="text-pink-500" />
          <div>
            <p className="font-medium text-gray-800">Secure Payment</p>
            <p className="text-sm text-gray-500">100% Secure</p>
          </div>
        </div>
      </div>

      {/* Category Title */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600">Trending Products</h2>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-12">
        {products.map((item) => (
          <div key={item.id} className="border rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <div className={`h-48 ${item.color} flex items-center justify-center`}>
              <Heart className="text-white w-6 h-6" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-700">{item.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-pink-600 font-bold">{item.price}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">
                Quick Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
