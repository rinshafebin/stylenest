import React, { useEffect, useState } from 'react';
import { Heart, ChevronLeft } from 'lucide-react';
import Navbar from '../../Components/Common/Navbar';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Common/Footer'


const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get('/wishlist/items/');
        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleSubmit = () => {
    navigate('/products');
  };

  const handleAddToCart = async (productId) => {
    try {
      await axiosInstance.post('/cart/add/', { product_id: productId });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleMoveAllToCart = async () => {
    try {
      for (const item of wishlistItems) {
        await axiosInstance.post('/cart/add/', { product_id: item.id });
      }
      alert('All items moved to cart!');
    } catch (error) {
      console.error('Error moving items:', error);
    }
  };

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
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90"
            >
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
                    <button  on cliclassName="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                      <Heart className="w-5 h-5 text-rose-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-3">${item.price.toFixed(2)}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        disabled={!item.inStock}
                        className={`flex-1 py-2 rounded-lg text-white ${
                          item.inStock
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90'
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-between items-center">
              <button onClick={handleSubmit} className="text-rose-600 hover:text-pink-600 flex items-center">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </button>
              <button
                onClick={handleMoveAllToCart}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                Move All to Cart
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
