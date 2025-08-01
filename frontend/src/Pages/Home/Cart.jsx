import React, { useEffect, useState } from 'react';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';
import axiosInstance from '../../api/axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get('/cart/addtocart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = cartItems.length > 0 ? 40 : 0;
  const tax = subtotal*0.05;
  const total=subtotal+shipping+tax;


  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is currently empty.</p>
            ) : (
              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4 items-center border-b pb-4">
                    <img
                      src={`http://localhost:8000${item.image}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl border"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-500'}`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </p>
                      <div className="mt-2 flex items-center space-x-3">
                        <button onClick={() => updateQuantity(item.id, 'decrease')} className="bg-rose-200 px-2 py-1 rounded hover:bg-rose-300">-</button>
                        <span className="px-3 py-1 border rounded bg-white">{item.quantity}</span>
                        <button className="bg-rose-200 px-2 py-1 rounded hover:bg-rose-300">+</button>
                      </div>
                    </div>
                    <div className="text-right text-gray-800 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                      <button className="block text-red-500 text-sm mt-2 hover:underline">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex justify-between">
              <button className="text-rose-600 hover:underline flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" /> Continue Shopping
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium">
                Update Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-base text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 text-white py-3 rounded-xl font-medium flex justify-center items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
