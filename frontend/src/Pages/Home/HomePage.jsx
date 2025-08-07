import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';
import { Trash2 } from 'lucide-react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await axiosInstance.get('/cart/list/');
      setCartItems(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleQuantityChange = async (id, action) => {
    try {
      const item = cartItems.find((i) => i.id === id);
      const newqty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;

      if (newqty <= 0) return handleRemove(id);

      await axiosInstance.put(`cart/update/${id}/`, {
        quantity: newqty,
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(`cart/remove/${id}/`);
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <section className="py-12 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="md:col-span-2 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet.</p>
                  <button
                    onClick={() => navigate('/products')}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm min-h-[8rem]"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`http://localhost:8000${item.product.image}`}
                        alt={item.product.name}
                        className="w-24 h-30 rounded-xl object-cover border"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">₹{item.product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Quantity Control */}
                      <div className="flex items-center border border-rose-300 rounded-xl overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.id, 'decrease')}
                          className="px-3 py-1 text-rose-500 font-bold hover:bg-rose-100 transition"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-gray-800 bg-white">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 'increase')}
                          className="px-3 py-1 text-rose-500 font-bold hover:bg-rose-100 transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-rose-500 hover:text-rose-700 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Total Items</span>
                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-6">
                <span>Total Price</span>
                <span>₹{totalPrice}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
