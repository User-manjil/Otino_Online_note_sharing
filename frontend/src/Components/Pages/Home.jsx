import React from 'react'
import Title from '../reusable/Title'
import Card from '../reusable/Card'

const Home = () => {
  return (
    <div className='w-full   h-screen  '>
      <div className='w-full h-90 bg-yellow-400 rounded-xl'></div>
      <div className="flex flex-col">
        <Title heading="Featured Notes" />
        <div className="flex gap-10">
           <Card 
        title="Web Technolgy"
        subCode="CSC-318"
        author="Raju Rastogi"
        rating="5"
        rate="50"

         />
           <Card 
        title="Web Technolgy"
        subCode="CSC-318"
        author="Raju Rastogi"
        rating="5"
        rate="50"

         />
           <Card 
        title="Web Technolgy"
        subCode="CSC-318"
        author="Raju Rastogi"
        rating="5"
        rate="50"

         />
           <Card 
        title="Web Technolgy"
        subCode="CSC-318"
        author="Raju Rastogi"
        rating="5"
        rate="50"

         />
           <Card 
        title="Web Technolgy"
        subCode="CSC-318"
        author="Raju Rastogi"
        rating="5"
        rate="50"

         />
           <Card 
        title="Web Technolgy"
        subCode="CSC-318"
        author="Raju Rastogi"
        rating="5"
        rate="50"

         />
        </div>
       </div>
       <div className="flex">
        <Title heading="How it works" />
       </div>

    </div>
  )
}

export default Home
