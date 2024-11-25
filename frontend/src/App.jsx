import { useState } from 'react'
import './App.css'
import Signup from './components/SignUp'
import { Toaster } from "react-hot-toast";
import {Routes, Route} from 'react-router-dom'
import Signin from './components/Signin'
import Chat from './components/Chat';
function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Signin />} />
        <Route path="/chat" element ={<Chat />} />
      </Routes>
    </>
  )
}

export default App
