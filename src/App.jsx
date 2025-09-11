import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './Login'
import Register from './Register'
import ResetPassword from './reset-password'
import Code from './Code'
import Contact from './Contacts'
import Properties from './Properties'
import HouseAbout from './house.about'
import Favorite from './Favorite'

function App() {
  return (
    
    <BrowserRouter>
    
    <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/properties' element={<Properties/>} />
        <Route path='/house/about' element={<HouseAbout/>} />
        <Route path='/favorites' element={<Favorite/>} />



        <Route path='/contacts' element={<Contact/>} />

        <Route path="/code" element={<Code />} /> 
        <Route path="/reset_password" element={<ResetPassword />} /> 




    </Routes>


    </BrowserRouter>




  )
}

export default App