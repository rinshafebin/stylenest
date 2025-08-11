import React, { useEffect, useState } from 'react';
import AdminProductCard from './AdminProductCard';
import axiosInstance from '../../api/axios';

export default function AdminProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get('/products/').then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
