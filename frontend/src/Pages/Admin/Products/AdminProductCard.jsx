import React from 'react';
import { Edit, Trash2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import toast from 'react-hot-toast';

export default function AdminProductCard({ product, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axiosInstance.delete(`/products/${product.id}/`);
      toast.success('Product deleted successfully');
      if (onDelete) onDelete(product.id);
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl"
      />

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
        <p className="text-indigo-600 font-bold mt-2">₹{product.price}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Link
          to={`/admin/products/edit/${product.id}`}
          className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
        >
          <Edit size={18} />
        </Link>
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
        >
          <Trash2 size={18} />
        </button>
        <button
          className={`p-2 rounded-lg ${
            product.is_featured
              ? 'bg-yellow-100 text-yellow-500'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <Star size={18} />
        </button>
      </div>
    </div>
  );
}
