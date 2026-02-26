import React from 'react'
import Navbar from './Components/reusable/Navbar'
import Home from './Components/Pages/Home'
import Search from './Components/reusable/SearchBar'
import SearchBar from './Components/reusable/SearchBar'

const App = () => {
  return (
    <div className='w-full px-10'>
     <Navbar />
     <SearchBar / >
      <Home / >
    </div>
  )
}

export default App
