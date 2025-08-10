import React from "react";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";

export default function OrderSummary() {
  // Dummy data
  const cartItems = [
    {
      name: "Classic White Sneakers",
      quantity: 1,
      price: 1999,
      image: "https://via.placeholder.com/80x80.png?text=Shoes"
    },
    {
      name: "Blue Denim Jacket",
      quantity: 2,
      price: 1499,
      image: "https://via.placeholder.com/80x80.png?text=Jacket"
    }
  ];

  const shippingInfo = {
    name: "John Doe",
    address: "123 Fashion Street",
    city: "Kochi",
    zip: "682001"
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 150;
  const tax = 100;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl border border-gray-100">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        
        {/* Product List */}
        <div className="divide-y divide-gray-200">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" /> Shipping Address
          </h3>
          <p className="text-gray-600 mt-1">{shippingInfo.name}</p>
          <p className="text-gray-600">{shippingInfo.address}</p>
          <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.zip}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button 
            onClick={() => alert("Go back to shipping")}
            className="flex items-center gap-2 px-4 py-2 border border-rose-400 rounded-lg text-rose-500 hover:bg-rose-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button 
            onClick={() => alert("Proceed to payment")}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:opacity-90 shadow-md font-medium"
          >
            Proceed to Payment <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
