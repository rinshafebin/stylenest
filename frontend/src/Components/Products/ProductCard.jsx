import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300 flex flex-col">
      <div className="relative">
        <img
          src={`http://localhost:8000${product.image}`}
          alt={product.name}
          className="w-full h-100 object-cover rounded-xl"
        />
        <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-pink-100">
          <Heart size={18} className="text-rose-500" />
        </button>
      </div>

      <div className="mt-3 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-black-400">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-rose-500">₹{product.price}</span>
          <button className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl shadow">
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
