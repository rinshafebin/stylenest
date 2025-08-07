import React from 'react';
import {
  PackageCheck,
  Truck,
  Calendar,
  CreditCard,
  ChevronRight,
} from 'lucide-react';

const Orders = () => {
  const dummyOrders = [
    {
      id: '10234',
      date: 'August 1, 2025',
      items: 3,
      total: 1899,
      status: 'Shipped',
      paymentMethod: 'Credit Card',
    },
    {
      id: '10212',
      date: 'July 28, 2025',
      items: 1,
      total: 2999,
      status: 'Delivered',
      paymentMethod: 'UPI',
    },
    {
      id: '10189',
      date: 'July 20, 2025',
      items: 2,
      total: 1299,
      status: 'Processing',
      paymentMethod: 'Cash on Delivery',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>

      <div className="space-y-6">
        {dummyOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <PackageCheck className="w-5 h-5 text-rose-600" />
                <span className="text-sm text-gray-700 font-medium">
                  Order #{order.id}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{order.date}</span>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Items:</span> {order.items}
                </p>
                <p>
                  <span className="font-medium">Total:</span> ₹{order.total}
                </p>
              </div>

              <div className="space-y-1">
                <p className="flex items-center">
                  <Truck className="w-4 h-4 mr-1 text-rose-500" />
                  {order.status}
                </p>
                <p className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-1 text-gray-500" />
                  {order.paymentMethod}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="flex justify-end mt-4">
              <button className="text-sm font-medium text-rose-600 hover:underline flex items-center">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Orders;
