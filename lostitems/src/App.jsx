import { useState } from 'react'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ItemContextProvider } from "./Context/ItemContext";
import { AuthContextProvider } from './Context/AuthContext';
import Home from './Pages/Home';
import Category from './Pages/Category';
import Add from './Pages/Add';
import ContactUs from './Pages/ContactUs';
import About from './Pages/About';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';

function App() {

  return (
    <>
    <AuthContextProvider>
    <ItemContextProvider>
      <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/category/:category' element={<Category/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/contact-us' element={<ContactUs/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/loginsignup' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </ItemContextProvider>
    </AuthContextProvider>
      </>
    
  )
}

export default App
