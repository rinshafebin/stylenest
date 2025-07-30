import React from 'react'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import StyleNestHomepage from './Pages/Auth/StyleNestHomePage'
import Navbar from './Components/Common/Navbar'
import Footer from './Components/Common/Footer'
import Category from './Pages/Auth/Category'

const App = () => {
  return (
    <div>
      <Register/>
      <Login/>
      <Navbar />
      <StyleNestHomepage/>
      <Footer/>
      <Category/>
    </div>
  )
}

export default App