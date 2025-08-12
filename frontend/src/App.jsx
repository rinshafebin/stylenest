import React, { useEffect } from 'react'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Homepage from './Pages/Home/HomePage'
import Logout from './Pages/Auth/Logout'
import ChangePassword from './Pages/Auth/ChangePassword'
import Cart from './Pages/User/Cart'
import Wishlist from './Pages/User/Wishlist'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Allproducts from './Pages/Home/AllProducts'
import ProductbyCategory from './Pages/Home/ProductsbyCategory'
import { AuthProvider, useAuth } from './context/AuthContext'
import { setUpInterceptors } from './api/axios'
import { Toaster } from 'react-hot-toast'
import ForgetPassword from './Pages/Auth/ForgetPassword'
import Verifyotp from './Pages/Auth/Verifyotp'
import Profile from './Pages/User/Profile'
import Orders from './Pages/User/Orders'
import ProductDetails from './Pages/Home/ProductDetail'
import Checkout from './Pages/User/Checkout'
import OrderSummary from './Pages/User/Ordersummary'
import AdminHome from './Pages/AdminPanel/AdminDashboard'
import AddProduct from './Pages/AdminPanel/Addproduct'
import AdminDashboard from './Pages/AdminPanel/AdminDashboard'
import Customers from './Pages/AdminPanel/Customers'
import AllOrders from './Pages/AdminPanel/AllOrders'
import AllProducts from './Pages/AdminPanel/AllProducts'

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </ AuthProvider>
  )
}
const App = () => {
  const { token } = useAuth();

  useEffect(() => {
    setUpInterceptors(token)
  }, [token])

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Toaster position="bottom-right" reverseOrder={false} />

        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={< Register />} />
            <Route path='/products' element={<Allproducts />} />
            <Route path='/products/:category' element={<ProductbyCategory />} />
            <Route path='/changepassword' element={< ChangePassword />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/forgetpassword' element={< ForgetPassword />} />
            <Route path='/verifyotp' element={<Verifyotp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/productdetails/:id' element={<ProductDetails />} />
            <Route path='/checkout' element={<Checkout />} />
            {/* <Route path='/ordersummary' element={<OrderSummary />} /> */}



            {/* admin side  */}
            <Route path='/adminpanel' element={<AdminDashboard />} />
            <Route path='/addproduct' element={< AddProduct />} />
            <Route path='/allproducts' element={< AllProducts />} />

            <Route path='/allcustomers' element={< Customers />} />
            <Route path='/allorders' element={< AllOrders />} />



          </Routes>
        </div>

      </div >
    </BrowserRouter >
  )
}

