import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext';

const Proflile = () => {
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
    console.log(user.loggedIn);
  },[user.loggedIn]);
    
  return (
    <div>
      <h1>Hello {user.name}</h1>
      <p>{user.loggedIn ? 'Logged In' : 'Logged Out'}</p>

      <button className='border border-black px-2 py-1 ' onClick={()=>setUser({ ...user,loggedIn: !user.loggedIn})}>Log Out </button>
      
    </div>
  )
}

export default Proflile
