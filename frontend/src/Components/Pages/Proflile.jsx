import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext';

const Proflile = () => {
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
    console.log(user.loggedIn);
  },[user.loggedIn]);

  const stat = [
    "Purchased:3",
   " Wishlist:0",
    "Total_Spent:459"

  ]
    
  return (
    <div className='w-full flex'>
      <div className="flex flex-col w-full h-70 bg-yellow-200 items-center justify-center">
        <p className='border-5 border-black px-5 py-4 h-fit rounded-full m-10 font-black text-5xl'>D</p>
        <div className="flex flex-col">
          <p className='font-bold text-2xl leading-3'>Demo Student</p>
          demo@gmail.com
          </div>

          <div className="flex gap-10 my-2">
            {stat.map((el,index)=>{
              return <div className='font-bold border-2 p-3'>{el}</div>
            })}
          </div>

      </div>
     
    </div>
  )
}

export default Proflile
