import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. Your order is confirmed and will be shipped soon.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
