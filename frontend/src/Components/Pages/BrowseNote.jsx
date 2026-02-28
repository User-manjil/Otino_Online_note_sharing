import React, { useState } from 'react'
import Card from '../reusable/Card'

const BrowseNote = () => {
    const [searchdata, setSearchData] = useState('Web Technology')
  return (
    <div className='w-full flex flex-col gap-10'>
        
        <h1>{`showing results of  ${searchdata}`}</h1>

        
      <Card />
    </div>
  )
}

export default BrowseNote
