import React from 'react'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import StyleNestHomepage from './Pages/Auth/StyleNestHomePage'
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
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>

          </Routes>
        </div>

      </div >
    </BrowserRouter >

  )
}

export default App