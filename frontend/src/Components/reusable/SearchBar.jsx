import { Search } from 'lucide-react'
import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const { inputData, setInputData } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSearch = () => {
    if (inputData.trim().length > 0) {
      navigate('/browse')   // ✔ go to browse page without reloading
    }
  }

  return (
    <div className='w-full border p-2 rounded-3xl my-5'>
      <div className="flex justify-between">
        <input
          type="text"
          className='text-sm outline-0 px-1 w-full'
          onChange={(e) => setInputData(e.target.value)}
          placeholder='Search Notes by Code, subjects'
        />
        <button className='p-1' onClick={handleSearch}>
          <Search size={20} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar