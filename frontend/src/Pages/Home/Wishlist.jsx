import React, { useEffect, useState } from 'react';
import { Heart, ChevronLeft } from 'lucide-react';
import Navbar from '../../Components/Common/Navbar';
import axiosInstance from '../../api/axios'; // make sure this is correctly configured
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get('/wishlist/'); // adjust endpoint if needed
        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleSubmit = ()=>{
    navigate('/products')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🛍️</div>
            <h2 className="text-2xl font-semibold text-black mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite items to easily find them later</p>
            <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover rounded-t-2xl"
                    />
                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                      <Heart className="w-5 h-5 text-rose-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-3">${item.price.toFixed(2)}</p>
                    <div className="flex justify-between items-center">
                      <button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg hover:opacity-90">
                        Add to Cart
                      </button>
                    </div>
                    {!item.inStock && (
                      <p className="text-red-500 text-sm mt-2">Currently out of stock</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-between items-center">
              <button onClick={handlSubmit} className="text-rose-600 hover:text-pink-600 flex items-center">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </button>
              <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90">
                Move All to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
