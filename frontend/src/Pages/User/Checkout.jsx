import React, { useEffect, useState } from "react";
import { CreditCard, Wallet, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderSummary, setOrderSummary] = useState({ subtotal: 0, shipping: 0, total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      const shippingRes = await axiosInstance.get("orders/shipping");
      setShippingInfo(shippingRes.data);

      const summaryRes = await axiosInstance.get("orders/summary"); // Change endpoint if different
      setOrderSummary(summaryRes.data);
    } catch (error) {
      console.error("Error fetching checkout data:", error);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) return;
    // API call to place order
    console.log(`Placing order with ${selectedPayment}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      {/* Back / Edit Button */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-10">
        {/* Shipping Address */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
          <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-start">
            {/* Address Info */}
            <div>
              <p className="font-semibold text-lg">{shippingInfo?.name || "Loading..."}</p>
              <p className="text-gray-600 text-sm mt-1">{shippingInfo?.address}</p>
              <p className="text-gray-600 text-sm">+91 {shippingInfo?.phone}</p>
              <p className="text-gray-600 text-sm">
                {shippingInfo?.city}, {shippingInfo?.state} - {shippingInfo?.pincode}
              </p>
              <p className="text-gray-600 text-sm">{shippingInfo?.country}</p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => navigate("/shippingaddress")}
              className="flex items-center gap-1 text-rose-500 font-medium hover:text-rose-600 transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Edit
            </button>
          </div>
        </section>

        {/* Order Summary */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{orderSummary.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">{orderSummary.shipping === 0 ? "Free" : `₹${orderSummary.shipping}`}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 text-base">
              <span>Total</span>
              <span>₹{orderSummary.total}</span>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedPayment("razorpay")}
              className={`border rounded-xl p-6 cursor-pointer flex items-center gap-4 transition-all ${selectedPayment === "razorpay"
                ? "border-rose-500 bg-rose-50 shadow-md"
                : "border-gray-200"
                }`}
            >
              <CreditCard className="w-6 h-6 text-rose-500" />
              <div>
                <h3 className="font-semibold">Pay with Razorpay</h3>
                <p className="text-gray-500 text-sm">
                  Secure online payment with cards, UPI, and wallets.
                </p>
              </div>
            </div>

            <div
              onClick={() => setSelectedPayment("cod")}
              className={`border rounded-xl p-6 cursor-pointer flex items-center gap-4 transition-all ${selectedPayment === "cod"
                ? "border-rose-500 bg-rose-50 shadow-md"
                : "border-gray-200"
                }`}
            >
              <Wallet className="w-6 h-6 text-rose-500" />
              <div>
                <h3 className="font-semibold">Cash on Delivery</h3>
                <p className="text-gray-500 text-sm">
                  Pay when your order is delivered.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Place Order Button */}
        <div>
          <button
            disabled={!selectedPayment}
            onClick={handlePlaceOrder}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition ${selectedPayment
              ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            {selectedPayment
              ? `Place Order (${selectedPayment === "cod" ? "COD" : "Razorpay"})`
              : "Select a Payment Method"}
          </button>
        </div>
      </div>
    </div>
  );
}
