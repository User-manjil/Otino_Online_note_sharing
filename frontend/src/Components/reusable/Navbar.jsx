import React from 'react'
import { User } from "lucide-react";
const Navbar = () => {
  return (
    <div className='w-full flex justify-between  bg-transparent rounded-2xl  py-5 backdrop-blur-xl  h-[57px]'>
      <div className="flex font-bold">Otino</div>
      <div className="flex">
        <ul className='flex gap-5 text-[14px] font-medium'>
            <li><a href="">Home</a></li>
            <li><a href="">Browse Notes</a></li>
            <li><a href="">Library</a></li>
            <li><a href=""><User size={20}/></a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
