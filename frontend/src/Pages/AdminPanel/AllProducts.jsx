import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import axiosInstance from "../../api/axios";
import Sidebar from "../../Components/Admin/Sidebar";
import Header from "../../Components/Admin/Header";

export default function AllProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/adminside/allproducts/");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.detail || err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await axiosInstance.patch(`/adminside/product/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/adminside/deleteproduct/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">All Products</h1>

          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && products.length === 0 && (
            <p className="text-gray-500">No products found</p>
          )}

          {!loading && products.length > 0 && (
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{product.id}</td>

                      {/* Product Image */}
                      <td className="px-6 py-4">
                        {product.image ? (
                          <img
                            src={`http://localhost:8000${product.image}`}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />

                        ) : (
                          <span className="text-gray-400 italic">No image</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="flex items-center gap-3">
                          <button
                            className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                            onClick={() => alert(`Edit ${product.id}`)}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 flex items-center justify-center"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
