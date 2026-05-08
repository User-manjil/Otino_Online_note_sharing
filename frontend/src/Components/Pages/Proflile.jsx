import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext';

const Proflile = () => {
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
    console.log(user.loggedIn);
  },[user.loggedIn]);
    
  return (
    <div className='w-full flex'>
      <div className="flex w-full h-70 bg-yellow-200 items-center justify-center">
        <p className='border border-5 border-black px-5 py-4 h-fit rounded-full m-10 font-black text-5xl'>D</p>
        <div className="flex">demo@gmail.com</div>
      </div>
     
    </div>
  )
}

export default Proflile
