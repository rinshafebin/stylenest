// import React, { useEffect, useState } from 'react';
// import Navbar from '../../Components/Common/Navbar';
// import Footer from '../../Components/Common/Footer';
// import { Trash2 } from 'lucide-react';
// import axiosInstance from '../../api/axios';
// import { useNavigate } from 'react-router-dom';

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const fetchCartItems = async () => {
//     try {
//       const res = await axiosInstance.get('/cart/list/');
//       setCartItems(res.data);
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//     }
//   };

//   const handleQuantityChange = async (id, action) => {
//     try {
//       const item = cartItems.find((i) => i.id === id);
//       const newqty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;

//       if (newqty <= 0) return handleRemove(id);

//       await axiosInstance.put(`cart/update/${id}/`, {
//         quantity: newqty,
//       });
//       fetchCartItems();
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     }
//   };

//   const handleRemove = async (id) => {
//     try {
//       await axiosInstance.delete(`cart/remove/${id}/`);
//       fetchCartItems();
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.product.price * item.quantity,
//     0
//   );

//   return (
//     <>
//       <Navbar />
//       <section className="py-12 bg-white min-h-screen">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//             <div className="md:col-span-2 space-y-6">
//               {cartItems.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center text-center py-20">
//                   <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
//                   <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet.</p>
//                   <button
//                     onClick={() => navigate('/products')}
//                     className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
//                   >
//                     Start Shopping
//                   </button>
//                 </div>
//               ) : (
//                 cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm min-h-[8rem]"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={`http://localhost:8000${item.product.image}`}
//                         alt={item.product.name}
//                         className="w-24 h-30 rounded-xl object-cover border"
//                       />
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">
//                           {item.product.name}
//                         </h3>
//                         <p className="text-sm text-gray-600">₹{item.product.price}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       {/* Quantity Control */}
//                       <div className="flex items-center border border-rose-300 rounded-xl overflow-hidden">
//                         <button
//                           onClick={() => handleQuantityChange(item.id, 'decrease')}
//                           className="px-3 py-1 text-rose-500 font-bold hover:bg-rose-100 transition"
//                         >
//                           −
//                         </button>
//                         <span className="px-4 py-1 text-gray-800 bg-white">{item.quantity}</span>
//                         <button
//                           onClick={() => handleQuantityChange(item.id, 'increase')}
//                           className="px-3 py-1 text-rose-500 font-bold hover:bg-rose-100 transition"
//                         >
//                           +
//                         </button>
//                       </div>
//                       <button
//                         onClick={() => handleRemove(item.id)}
//                         className="text-rose-500 hover:text-rose-700 transition"
//                       >
//                         <Trash2 size={20} />
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Order Summary */}
//             <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
//               <div className="flex justify-between text-gray-700 mb-2">
//                 <span>Total Items</span>
//                 <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
//               </div>
//               <div className="flex justify-between text-gray-700 mb-6">
//                 <span>Total Price</span>
//                 <span>₹{totalPrice}</span>
//               </div>
//               <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import { ChevronRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Common/Navbar';
import Footer from '../../Components/Common/Footer';

import women from '../../Assets/women.jpg';
import men from '../../assets/men.jpg';
import kids from '../../assets/kids.jpg';
import hero1 from '../../Assets/hero1.jpg';
import hero2 from '../../Assets/hero2.jpg';
import hero3 from '../../Assets/hero3.jpg';

export default function Homepage() {
  const images = [hero1, hero2, hero3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-black mb-4">
              Style for Every{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                Story
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover curated fashion for every member of your family — from women’s elegance to men’s sophistication and kids’ playful styles.
            </p>
            <div className="flex space-x-4 mb-12">
              <Link to="/products">
                <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:opacity-90 flex items-center transition">
                  Shop Now <ChevronRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
              <button className="border-2 border-rose-500 text-rose-600 px-8 py-3 rounded-lg hover:bg-rose-100 transition">
                Explore Collections
              </button>
            </div>
            <div className="flex space-x-8">
              <div>
                <div className="text-2xl font-bold text-black">15K+</div>
                <div className="text-gray-600">Happy Families</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">1000+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-black">4.8</div>
                <div className="text-gray-600">Rating</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-lg">
              <div className="w-full h-96 rounded-2xl overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt="Hero slideshow"
                  className="w-full h-full object-cover transition-opacity duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Explore{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                Categories
              </span>
            </h2>
            <p className="text-gray-600">Find the perfect style</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: women, title: 'Women', link: 'women' },
              { img: men, title: 'Men', link: 'men' },
              { img: kids, title: 'Kids', link: 'kids' },
            ].map((cat, idx) => (
              <Link
                to={`/products/${cat.link}`}
                key={idx}
                className="relative group overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow cursor-pointer block"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-white text-2xl font-semibold mb-1">{cat.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              New{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                Arrivals
              </span>
            </h2>
            <p className="text-gray-600">Discover our most popular items</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[hero1, hero2, hero3, hero1].map((img, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
                <img src={img} alt="New Arrival" className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black">Product Name</h3>
                  <p className="text-rose-500 font-bold mt-2">$49.99</p>
                  <button className="mt-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg w-full hover:opacity-90">
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                StyleNest?
              </span>
            </h2>
            <p className="text-gray-600">
              We're committed to providing the best shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'Free shipping on orders over $50', bg: 'bg-rose-100', color: 'text-rose-600' },
              { icon: Shield, title: 'Secure Payment', desc: 'Your payment information is safe', bg: 'bg-blue-100', color: 'text-blue-500' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy', bg: 'bg-green-100', color: 'text-green-500' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here to help you', bg: 'bg-purple-100', color: 'text-purple-500' },
            ].map((item, i) => (
              <div className="text-center" key={i}>
                <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
