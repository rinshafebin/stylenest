import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';
import { Trash2 } from 'lucide-react';
import axiosInstance from '../../api/axios';


export default function Cart() {
  
  const[cartItems,setCartItems]=useState([])

  useEffect(()=>{
    fetchCartItems();
  },[])

  const fetchCartItems = async()=>{
    try{
      const res = await axiosInstance.get('')
    }catch(error){

    }
  }


  return (
    <>
      <Navbar />
      <section className="py-12 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">Shopping Cart</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm min-h-[8rem]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover border"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-rose-300 rounded-xl overflow-hidden">
                      <button className="px-3 py-1 text-rose-500 font-bold hover:bg-rose-100 transition">
                        −
                      </button>
                      <span className="px-4 py-1 text-gray-800 bg-white">{item.quantity}</span>
                      <button className="px-3 py-1 text-rose-500 font-bold hover:bg-rose-100 transition">
                        +
                      </button>
                    </div>
                    {/* Remove */}
                    <button className="text-rose-500 hover:text-rose-700 transition">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
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
              <button className="w-full bg-gradient-to-r from-rose-400 to-rose-500 text-white py-2 px-4 rounded-xl hover:opacity-90 transition">
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
