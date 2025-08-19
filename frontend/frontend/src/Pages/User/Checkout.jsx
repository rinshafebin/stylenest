import React, { useEffect, useState } from "react";
import { CreditCard, Wallet, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    total_price: 0,
    items: [],
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      const [shippingRes, summaryRes] = await Promise.all([
        axiosInstance.get("orders/shipping/"),
        axiosInstance.get("orders/summary/"),
      ]);
      setShippingInfo(shippingRes.data);
      setOrderSummary(summaryRes.data);
    } catch (error) {
      console.error("Error fetching checkout data:", error);
    }
  };

  const handleCOD = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("payment/create/", {
        payment_method: "cod",
        amount: orderSummary.total_price,
      });
      alert("Order placed successfully with COD!");
      navigate("/cart");
    } catch (error) {
      console.error("COD Order Error:", error);
      alert("Failed to place COD order");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpay = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("payment/create/", {
        payment_method: "razorpay",
        amount: orderSummary.total_price,
      });

      const { id: razorpayOrderId, key: razorpayKey, amount } = res.data;

      const options = {
        key: razorpayKey,
        amount: amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        order_id: razorpayOrderId,
        prefill: {
          name: shippingInfo?.name || "Customer",
          email: "user@example.com",
          contact: "9999999999",
        },
        handler: async function (response) {
          try {
            await axiosInstance.post("payment/verify/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert("Payment successful!");
            navigate("/cart");
          } catch {
            alert("Payment verification failed!");
          }
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed to initialize.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) return;
    selectedPayment === "cod" ? handleCOD() : handleRazorpay();
  };

  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-10">
          {/* Shipping Address */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
            {shippingInfo ? (
              <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">{shippingInfo.name}</p>
                  <p className="text-gray-600 text-sm mt-1">{shippingInfo.address}</p>
                  <p className="text-gray-600 text-sm">+91 {shippingInfo.phone}</p>
                  <p className="text-gray-600 text-sm">
                    {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}
                  </p>
                  <p className="text-gray-600 text-sm">{shippingInfo.country}</p>
                </div>
                <button
                  onClick={() => navigate("/shippingaddress")}
                  className="flex items-center gap-1 text-rose-500 font-medium hover:text-rose-600 transition text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Edit
                </button>
              </div>
            ) : (
              <p>Loading shipping address...</p>
            )}
          </section>

          {/* Order Summary */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            {orderSummary.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 border-b border-gray-200 py-4">
                <img
                  src={`${item.product.image}`}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">₹{item.subtotal}</p>
              </div>
            ))}
            <div className="space-y-3 text-sm text-gray-700 mt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">
                  {orderSummary.shipping === 0 ? "Free" : `₹${orderSummary.shipping}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 text-base">
                <span>Total</span>
                <span>₹{orderSummary.total_price}</span>
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
                  <p className="text-gray-500 text-sm">Cards, UPI, wallets</p>
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
                  <p className="text-gray-500 text-sm">Pay when delivered</p>
                </div>
              </div>
            </div>
          </section>

          {/* Place Order Button */}
          <div>
            <button
              disabled={!selectedPayment || loading}
              onClick={handlePlaceOrder}
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition ${selectedPayment && !loading
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90"
                  : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {loading
                ? "Processing..."
                : selectedPayment
                  ? `Place Order (${selectedPayment === "cod" ? "COD" : "Razorpay"})`
                  : "Select a Payment Method"}
            </button>
          </div>
        </div>
      </div>
      < Footer />
    </>
      );
}