
import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='w-full border  p-2 rounded-3xl my-5'>
      <div className="flex justify-between">
        <input type="text" className='text-sm outline-0 px-1 w-full ' placeholder='Search Notes by semester , subjects'  />
        <button className='p-1'><Search size={20} /></button>
      </div>
    </div>
  )
}

export default SearchBar
