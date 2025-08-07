import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('auth/send-otp/', { email });
      setMessage(res.data.message);
      setTimeout(() => navigate('/verify-otp'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your registered email address and we’ll send you a one-time password (OTP) to reset your account.
        </p>
        <form onSubmit={handleSendOtp} className="space-y-5">
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-rose-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <p className="text-xs text-gray-500 mt-1 ml-1">
              Make sure this is the email linked to your account.
            </p>
          </div>
          <button
            type="submit"
            onClick={() => navigate("/verifyotp")}
            className="w-full flex justify-center items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg transition duration-200"
          >
            Send OTP <ArrowRight size={18} />
          </button>
          {message && (
            <p className="text-sm text-center text-rose-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
