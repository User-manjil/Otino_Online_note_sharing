import React from 'react'
import Navbar from './Components/reusable/Navbar'
import Home from './Components/Pages/Home'
import Search from './Components/reusable/SearchBar'
import SearchBar from './Components/reusable/SearchBar'
import Footer from './Components/reusable/Footer'
import { Route, Routes } from 'react-router-dom'
import BrowseNote from './Components/Pages/BrowseNote'


const App = () => {
  return (
    <div className='w-full px-10 '>
     <Navbar />
     <SearchBar / >
      <Routes>
        <Route  path='/' element={<Home />} />
        <Route  path='/browse' element={<BrowseNote />} />
      </Routes>
      
      <Footer / >

    </div>
  )
}

export default App
