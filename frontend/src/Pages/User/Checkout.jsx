import React, { useEffect, useState } from "react";
import { CreditCard, Wallet, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderSummary, setOrderSummary] = useState({ subtotal: 0, shipping: 0, total_price: 0, items: [] });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCheckoutData();
  }, []);



  const getCartItems = async () => {
    const token = localStorage.getItem("access");
    try {
      const res = await axios.get(`${apiUrl}/cart/CartViewByUser/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);

      // ✅ Calculate total
      const totalAmount = res.data.reduce((sum, item) => {
        const offerPrice = item.product.offer_price ?? 0;
        const quantity = item.quantity ?? 1;
        return sum + offerPrice * quantity;
      }, 0);
      setTotal(totalAmount);
    } catch (e) {
      console.error("Error fetching cart data", e);
    }
  };

  const getAddress = async () => {
    const token = localStorage.getItem("access");
    try {
      const res = await axios.get(`${apiUrl}/orders/UseraddressGet`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddress(res.data[0]);
    } catch (e) {
      console.error("Failed to fetch address", e);
    }
  };

  const getProductDetails = async (id) => {
    const token = localStorage.getItem("access");
    try {
      const res = await axios.get(`${apiUrl}/products/ViewSpecificProduct/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(res.data);
    } catch (e) {
      console.error("Failed to fetch product", e);
    }
  };

  const handlePayClick = async () => {
    try {
      const amountToSend = cartid === "0" ? total : product.offer_price || 0;
      // const res = await axios.post("http://127.0.0.1:8000/payments/create-order/", {
      const res = await axios.post(`${apiUrl}/payments/create-order/`, {amount: amountToSend});

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Your Store Name",
        description: "Test Transaction",
        order_id: res.data.id,
        handler: async function (response) {
          
          // await axios.post("http://127.0.0.1:8000/payments/verify-payment/", response);
          await axios.post(`${apiUrl}/payments/verify-payment/`, response);
          console.log("Payment Verified");

          // Order API
          const token = localStorage.getItem("access");

          try {
            if (cartid !== "0") {

              await axios.post(`${apiUrl}/orders/OrderOneProductView/${cartid}/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("Your single product was ordered successfully.");
            } else {
              console.log('you carts orderes ',cartid)
              await axios.post(`${apiUrl}/orders/OrderProduct/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("All cart items were ordered successfully.");
            }

            navigate("/cartsection");
          } catch (e) {
            toast.error("Order failed after payment.");
          }
        },
        prefill: {
          name: address.nameofuser || "Customer",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment failed to initialize.");
    }
  };



const itemquantitybull = sessionStorage.getItem("itemquantitybull"); 
const cartitembull = sessionStorage.getItem("cartitembull");
console.log('cart item ',cartitembull,'itemquantity',itemquantitybull)
const quantitybull = itemquantitybull !== null ? Number(itemquantitybull) : 1;
const isCartItembull = cartitembull === "true";















  const fetchCheckoutData = async () => {
    try {
      const shippingRes = await axiosInstance.get("orders/shipping/");
      setShippingInfo(shippingRes.data);

      const summaryRes = await axiosInstance.get("orders/summary/");
      setOrderSummary(summaryRes.data);
    } catch (error) {
      console.error("Error fetching checkout data:", error);
      alert("Failed to load checkout details.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-10">
        
        {/* Shipping Address */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
          <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg">{shippingInfo?.name || "Loading..."}</p>
              <p className="text-gray-600 text-sm mt-1">{shippingInfo?.address}</p>
              <p className="text-gray-600 text-sm">+91 {shippingInfo?.phone}</p>
              <p className="text-gray-600 text-sm">
                {shippingInfo?.city}, {shippingInfo?.state} - {shippingInfo?.pincode}
              </p>
              <p className="text-gray-600 text-sm">{shippingInfo?.country}</p>
            </div>
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
          {orderSummary.items?.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b border-gray-200 py-4">
              <img
                src={`http://localhost:8000${item.product.image}`}
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
              className={`border rounded-xl p-6 cursor-pointer flex items-center gap-4 transition-all ${
                selectedPayment === "razorpay" ? "border-rose-500 bg-rose-50 shadow-md" : "border-gray-200"
              }`}
            >
              <CreditCard className="w-6 h-6 text-rose-500" />
              <div>
                <h3 className="font-semibold">Pay with Razorpay</h3>
                <p className="text-gray-500 text-sm">Secure online payment with cards, UPI, and wallets.</p>
              </div>
            </div>
            <div
              onClick={() => setSelectedPayment("cod")}
              className={`border rounded-xl p-6 cursor-pointer flex items-center gap-4 transition-all ${
                selectedPayment === "cod" ? "border-rose-500 bg-rose-50 shadow-md" : "border-gray-200"
              }`}
            >
              <Wallet className="w-6 h-6 text-rose-500" />
              <div>
                <h3 className="font-semibold">Cash on Delivery</h3>
                <p className="text-gray-500 text-sm">Pay when your order is delivered.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Place Order Button */}
        <div>
          <button
            disabled={!selectedPayment || loading}
            onClick={handlePlaceOrder}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition ${
              selectedPayment && !loading
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
  );
}
