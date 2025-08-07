import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('auth/verify-otp/', { otp });
      setMessage(res.data.message);
      setTimeout(() => navigate('/reset-password'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter the OTP sent to your registered email address.
        </p>
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="relative">
            <ShieldCheck className="absolute top-3 left-3 text-rose-400" size={20} />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg transition duration-200"
          >
            Verify OTP <ArrowRight size={18} />
          </button>
          {message && (
            <p className="text-sm text-center text-rose-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
