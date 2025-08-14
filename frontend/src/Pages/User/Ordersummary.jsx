import React, { useEffect, useState } from "react";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import axiosInstance from "../../api/axios";

export default function OrderSummary() {
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const shippingCost = 150;
  const tax = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartRes = await axiosInstance.get("/cart/list/");
        setCartItems(cartRes.data.items || []);

        const shippingRes = await axiosInstance.get("/orders/shipping-address/"); // check backend URL
        setShippingInfo(shippingRes.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMsg("No shipping address found. Please add one before placing an order.");
        } else {
          setErrorMsg("Error fetching data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost + tax;

  const handleProceedToPayment = async () => {
    if (!shippingInfo) {
      alert("Please add a shipping address before proceeding.");
      return;
    }
    try {
      const orderData = {
        shipping_address: shippingInfo.id,
        items: cartItems.map((item) => ({
          product: item.product.id,
          quantity: item.quantity
        }))
      };
      const res = await axiosInstance.post("/orders/create-order/", orderData);
      console.log("Order created:", res.data);
      // You can redirect to payment page here
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading...</p>;
  }

  if (errorMsg) {
    return (
      <div className="text-center mt-6">
        <p className="text-red-500">{errorMsg}</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 border border-rose-400 rounded-lg text-rose-500 hover:bg-rose-50 transition"
        >
          <ArrowLeft className="inline w-4 h-4 mr-2" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>

        {/* Product List */}
        <div className="divide-y divide-gray-200">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:8000${item.product.image}`}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                ₹{item.product.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>₹{shippingCost}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>₹{tax}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              ₹{total}
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
          <p className="text-gray-600">
            {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}
          </p>
          <p className="text-gray-600">Phone: {shippingInfo.phone}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 border border-rose-400 rounded-lg text-rose-500 hover:bg-rose-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={handleProceedToPayment}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:opacity-90 shadow-md font-medium"
          >
            Proceed to Payment <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
