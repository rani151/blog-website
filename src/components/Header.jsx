import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './../assets/images/Logo.png'
function Header() {
    const navigate=useNavigate();
  return (
    <div className='flex justify-between items-center bg-white'>
    <img src={logo} className='w-[70px] ml-4' />
    <ul className='hidden md:flex gap-4 md:gap-14  text-black'>
        <li className='hover:font-bold cursor-pointer' onClick={()=>navigate('/')}>Home</li>
        <li className='hover:font-bold cursor-pointer' >About Us</li>
        <li className='hover:font-bold cursor-pointer'>Contact Us</li>
    </ul>
    <button className='bg-gray-400 rounded-full text-black flex items-center text-[14px]  mr-6'>
        My Blogs </button>
</div>
  )
}

export default Header
