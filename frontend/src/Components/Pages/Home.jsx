import React from 'react'
import Title from '../reusable/Title'
import Card from '../reusable/Card'
import { Link } from 'react-router-dom'

const Home = () => {
  const data =[
  {
    "title": "Fundamentals of Programming",
    "subCode": "CSC-112",
    "author": "Aarav Shrestha",
    "rating": 4.3,
    "rate": 120
  },
  {
    "title": "Database Management Systems",
    "subCode": "CSC-220",
    "author": "Sneha Bhandari",
    "rating": 4.7,
    "rate": 95
  },
  {
    "title": "Data Structures & Algorithms",
    "subCode": "CSC-210",
    "author": "Bikash Thapa",
    "rating": 4.9,
    "rate": 150
  },
  {
    "title": "Web Technology",
    "subCode": "CSC-318",
    "author": "Rijan Rai",
    "rating": 4.6,
    "rate": 80
  },
  {
    "title": "Operating Systems",
    "subCode": "CSC-314",
    "author": "Manish Karki",
    "rating": 4.2,
    "rate": 110
  },
  {
    "title": "Computer Networks",
    "subCode": "CSC-320",
    "author": "Pratik Basnet",
    "rating": 4.8,
    "rate": 140
  }
]
  const id=12
  return (
    <div className='w-full     '>
      <div className='w-full h-90 bg-yellow-400 rounded-xl'></div>
      <div className="flex flex-col">
        <Title heading="Featured Notes" />
        <div className="grid items-center content-center gap-10 lg:grid-cols-6 m-auto">
          {data.map((e)=>{
            return  <Link to={`/note/${id}`}>
          <Card 
        title={e.title}
        subCode={e.subCode}
        author={e.author}
        rating={e.rating}
        rate={e.rate}

         />
          </Link>
          })}
         
        
        </div>
       </div>
       <div className="flex flex-col">
        <Title heading="How it works" />
        <div className="flex w-full bg-amber-400 h-70 rounded-xl">
          <img src="..." alt="this is image" />

        </div>
       </div>

    </div>
  )
}

export default Home
