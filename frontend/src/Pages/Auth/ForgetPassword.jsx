import React, { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom'


const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")
    const navigate = useNavigate();


    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('auth/send-otp/', { email })
            setMessage(res.data.message);
            setTimeout(() => navigate('/verify-otp'), 1500);

        } catch (error) {
            setMessage(err.response?.data?.error || 'Something went wrong');
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-rose-500 mb-6">Forgot Password</h2>
                <form onSubmit={handleSendOtp} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute top-3 left-3 text-rose-400" size={20} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white py-2 rounded-xl transition duration-200"
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
}

export default ForgetPassword