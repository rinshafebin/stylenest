import React from 'react'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Homepage from './Pages/Home/HomePage'
import Navbar from './Components/Common/Navbar'
import Footer from './Components/Common/Footer'
import ChangePassword from './Pages/Auth/ChangePassword'
import Cart from './Pages/Home/Cart'
import Wishlist from './Pages/Home/wishlist'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={< Register />} />
            <Route path='/change-password' element={< ChangePassword />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />


          </Routes>
        </div>

      </div >
    </BrowserRouter >



  )
}

export default App