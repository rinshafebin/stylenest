import React, { useEffect, useState } from 'react';
import {
  PackageCheck,
  Truck,
  Calendar,
  CreditCard,
  ChevronRight,
  Loader2,
  ShoppingBag,
} from 'lucide-react';
import axiosInstance from '../../api/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get('/orders/my-orders/')
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status) => {
    const statusStyles = {
      Processing: 'bg-yellow-100 text-yellow-800',
      Pending: 'bg-orange-100 text-orange-800',
      Shipped: 'bg-blue-100 text-blue-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
          statusStyles[status] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin mb-3" />
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <ShoppingBag className="w-10 h-10 mb-3 text-gray-400" />
        <p className="text-lg font-medium">No orders found</p>
        <p className="text-sm text-gray-400">
          Start shopping to see your orders here.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-rose-600" />
                <span className="font-medium text-gray-800">
                  Order #{order.id}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(order.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 py-4 text-sm">
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Items:</span>{' '}
                  {order.items.length}
                </p>
                <p>
                  <span className="font-medium">Total:</span> ₹{order.total}
                </p>
              </div>

              <div className="space-y-1">
                <p className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-rose-500" />
                  {getStatusBadge(order.status)}
                </p>
                <p className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  {order.payment_method}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center sm:justify-end gap-3">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors">
                  View Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Orders;