import React from 'react'
import {  BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home'
import Register from './pages/Register'
import Facilities from './pages/Facilities'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Community from './pages/Community'
import Payments from './pages/Payments' 
import Dashboard from './pages/Dashboard'
import UserFacilities from './pages/UserFacilities'
import UserPayments from './pages/UserPayments'
import ProtectedRoute from './components/ProtectedRoute'



const App = () => {
  return (
    <>
    <BrowserRouter>
     <Toaster />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/user-facilities" element={<ProtectedRoute><UserFacilities/></ProtectedRoute>} />
        <Route path="/user-payments" element={<ProtectedRoute><UserPayments/></ProtectedRoute>} />
        <Route path="/facilities" element={<Facilities/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/payments" element={<ProtectedRoute><Payments/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App