import React from 'react'
import { useParams } from 'react-router-dom';

const NoteDetail = () => {
    const id = useParams()
    console.log(id);

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
  ,
  {
    "title": "Computer Networks",
    "subCode": "CSC-320",
    "author": "Pratik Basnet",
    "rating": 4.8,
    "rate": 140
  }
]
  return (
    <div className='w-full'>
      
      
        
    </div>
  )
}

export default NoteDetail
