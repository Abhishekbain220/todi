import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Nav from './components/Nav'
import { UserContext } from './utils/UserContext'
import About from './components/About'
import { ToastContainer } from 'react-toastify'

const App = () => {
  let {token}=useContext(UserContext)

  return (
    <div >
      <ToastContainer/>
      {token ? (<Nav/> ):""}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        
      </Routes>
    </div>
  )
}

export default App