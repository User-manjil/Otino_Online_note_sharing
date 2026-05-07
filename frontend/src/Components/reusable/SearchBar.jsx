
import { Search, Target } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'

const SearchBar = () => {
  const { inputData, setInputData } = useContext(UserContext)

  useEffect(() => {
    console.log(inputData)
  }, [inputData])

  return (
    <div className='w-full border  p-2 rounded-3xl my-5'>
      <div className="flex justify-between">
        <input type="text" className='text-sm outline-0 px-1 w-full ' onChange={(e)=>setInputData(e.target.value)} placeholder='Search Notes by Code , subjects'  />
        <button className='p-1' ><Search size={20} onClick={()=>window.location.href='/browse'} /></button>
      </div>
    </div>
  )
}

export default SearchBar
