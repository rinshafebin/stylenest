import React from 'react'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Homepage from './Pages/Home/HomePage'
import Navbar from './Components/Common/Navbar'
import Footer from './Components/Common/Footer'
import Category from './Pages/Auth/Category'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={< Register />} />

          </Routes>
        </div>

      </div >
    </BrowserRouter >

  )
}

export default App