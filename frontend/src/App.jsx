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
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgetPassword from './Pages/Auth/ForgetPassword'
import Verifyotp from './Pages/Auth/Verifyotp'
import Profile from './Pages/User/Profile'
import Orders from './Pages/User/Orders'
import AdminHome from './Pages/Admin/AdminHome'
import AddProduct from './Pages/Admin/AddProduct'
import ProductSearch from './Components/Common/ProductSearch'

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
        <ToastContainer
          position="bottom-right"
          autoClose={200}
        />

        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={< Register />} />
            <Route path='/products' element={<Allproducts />} />
            <Route path='/products/:category' element={<ProductbyCategory />} />
            <Route path='/change-password' element={< ChangePassword />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/forgetpassword' element={< ForgetPassword />} />
            <Route path='/verifyotp' element={<Verifyotp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/adminpanel' element={<AdminHome />} />
            <Route path='/addproduct' element={< AddProduct/>} />
            <Route path='/searchproduct' element={< ProductSearch />} />


          </Routes>
        </div>

      </div >
    </BrowserRouter >
  )
}

