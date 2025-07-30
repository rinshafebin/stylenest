import React from 'react'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import StyleNestHomepage from './Pages/Auth/StyleNestHomePage'

const App = () => {
  return (
    <div>
      <Register/>
      <Login/>
      <StyleNestHomepage/>
    </div>
  )
}

export default App