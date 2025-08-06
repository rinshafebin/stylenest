import React, { useEffect } from 'react'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Homepage from './Pages/Home/HomePage'
import Logout from './Pages/Auth/Logout'
import ChangePassword from './Pages/Auth/ChangePassword'
import Cart from './Pages/Home/Cart'
import Wishlist from './Pages/Home/wishlist'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Allproducts from './Pages/Home/AllProducts'
import ProductbyCategory from './Pages/Home/ProductsbyCategory'
import { AuthProvider, useAuth } from './context/AuthContext'
import { setUpInterceptors } from './api/axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgetPassword from './Pages/Auth/ForgetPassword'

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
            <Route path = '/forgetpassword' element={< ForgetPassword/>} />

          </Routes>
        </div>

      </div >
    </BrowserRouter >
  )
}

