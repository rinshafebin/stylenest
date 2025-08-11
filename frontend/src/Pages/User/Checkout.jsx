import { User, Phone, MapPin, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useState } from 'react';



export default function Checkout() {

  const navigate = useNavigate()
  const [fullname,setFullName] = useState('');
  const [phone,setPhone] = useState('')
  const [pincode,setPincode] = useState('')
  const [city,setCity] =useState('')
  const []


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-5">
            <Link to={'/cart'}>
              <button className="text-sm mb-2 flex items-center gap-1 opacity-90 hover:opacity-100">
                ← Back to Cart
              </button>
            </Link>

            <h2 className="text-xl font-bold">Shipping Address</h2>
            <p className="text-sm opacity-90">Where should we deliver your order?</p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-4">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <User className="text-rose-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Phone className="text-rose-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Pincode, State, City */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <MapPin className="text-rose-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <MapPin className="text-rose-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <MapPin className="text-rose-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* House No / Building */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Home className="text-rose-500 mr-2" size={18} />
              <input
                type="text"
                placeholder="House No"
                className="w-full focus:outline-none"
              />
            </div>

            {/* Street / Area */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <MapPin className="text-rose-500 mr-2" size={18} />
              <input
                type="text"
                placeholder="Building"
                className="w-full focus:outline-none"
              />
            </div>

            {/* Submit */}
            <Link to={'/ordersummary'}>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Continue to Payment →
              </button>
            </Link>

          </form>
        </div>
      </main>
    </div>
  );
}