import React from 'react'
import { User } from "lucide-react";
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='w-full flex justify-between  bg-transparent rounded-2xl  py-5 backdrop-blur-xl   h-[57px]'>
      <div className="flex font-bold">Otino</div>
      <div className="flex">
        
        <ul className='flex gap-5 text-[14px] font-medium'>
            <Link to={'/'}>Home</Link>
            <Link to={'/browse'}>Browse Notes</Link>
            <Link to={'/library'}>Library</Link>
            <Link to={'/user'}><User size={20}/></Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
