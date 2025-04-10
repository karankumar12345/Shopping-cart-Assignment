
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Header from './pages/Header';
import { useEffect, useState } from 'react';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
   
  useEffect(()=>{
    const cart=JSON.parse(localStorage.getItem('cart'))||[];
    setCartItems(cart);

  },[])
  console.log(cartItems)

  return (
    <>
 <BrowserRouter>
 <Header cartCount={cartItems.length} />
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/product/:id' element={<ProductDetail/>}/>

 <Route path="/cart" element={<Cart />} />

 </Routes>
 </BrowserRouter>
    </>
  )
}

export default App
