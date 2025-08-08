import React, { useState } from 'react';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', form);
    // You can replace this with API call later
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-8 border border-rose-100">
      <h2 className="text-2xl font-bold text-rose-500 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-rose-500 focus:border-rose-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-rose-500 focus:border-rose-500"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-rose-500 focus:border-rose-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-rose-500 focus:border-rose-500"
          >
            <option value="">Select category</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-rose-500 text-white px-5 py-2 rounded-md hover:bg-rose-600 transition"
          >
            Add Product
          </button>
          <button
            type="reset"
            className="border border-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
