import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`products/getproduct/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.log("Failed to fetch product ", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post("/cart/add/", {
        product_id: product.id,
        quantity: 1,
        size: selectedSize || null,
      });
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("You need to be logged in to add to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await axiosInstance.post("/wishlist/items/", { product_id: product.id });
      toast.success("Product added to wishlist!");
    } catch (error) {
      toast.error("You need to be logged in to use wishlist.");
    }
  };

  if (!product) {
    return (
      <div>
        <Navbar />
        <p className="text-center my-10 text-gray-500">Loading product...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Container */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Product Image */}
        <div className="flex justify-center">
          <img
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
            className="rounded-2xl shadow-lg max-h-[500px] object-contain bg-white p-4"
          />
        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mt-4 space-x-2">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="text-gray-600">
              {product.rating || 0} / 5 ({product.reviews || 0} Reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-pink-600">
              ₹{product.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          {Array.isArray(product.sizes) && product.sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-gray-700 font-semibold mb-2">Select Size</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 rounded-lg transition ${
                      selectedSize === size
                        ? "border-pink-500 bg-pink-100"
                        : "border-gray-300 hover:border-pink-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 shadow-lg"
            >
              <ShoppingBag className="mr-2" /> Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="p-3 border border-gray-300 rounded-xl hover:border-pink-500"
            >
              <Heart />
            </button>
          </div>
        </div>
      </div>

      {/* More Details */}
      {Array.isArray(product.details) && product.details.length > 0 && (
        <div className="container mx-auto px-6 py-10 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {product.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </div>
  );
}
