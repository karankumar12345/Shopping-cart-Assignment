import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Header = ({ cartCount }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem('token');
        navigate("/login")
    }

  return (
 <>
 <header className='bg-gray-900 text-white shadow-md p-4 flex justify-between items-center'>
    <h1 className='text-xl font-bold text-blue-600'>
        <Link to="/">🛒 ShopMate</Link>
    </h1>
    <nav className='flex gap-4 items-center'>
        <Link to="/" className='hover:text-blue-500 font-medium'>
        Home</Link>
        <Link to="/cart" className='hover:text-blue-500 font-medium'>
        Cart  
    
          {cartCount}
        </Link>
        
        <button onClick={handleClick}
        className='text-red-500 hover:text-blue-800 font-medium'
        >
            
            Logout

        </button>
         </nav>
 </header>
 </>
  )
}

export default Header