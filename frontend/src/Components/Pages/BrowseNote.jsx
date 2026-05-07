import React, { useContext, useEffect, useState } from 'react'
import Card from '../reusable/Card'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import FilterData from '../reusable/FilterData';

const BrowseNote = () => {

  const data = [
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
  ];

  const { inputData } = useContext(UserContext);

  const [filterData, setFilterData] = useState(data);

  useEffect(() => {
    const filtered = data.filter((e) =>
      e.title.toLowerCase().includes(inputData.toLowerCase())
    );

    setFilterData(filtered);
  }, [inputData]);


  return (
    <div className='w-full flex  gap-10 '>
      <div className="flex w-1/4 ">
        <FilterData/>
      </div>
      <div className="flex  flex-col w-full">
               {inputData.length > 0 && (
        <h1>Showing results for: <strong>{inputData}</strong></h1>
      )}

      <div className="grid  w-full items-center gap-50 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 m-auto">

        {filterData.map((e, index) => (
          <Link to={`/note/${e.title}`} key={index}>
            <Card
              title={e.title}
              subCode={e.subCode}
              author={e.author}
              rating={e.rating}
              rate={e.rate}
            />
          </Link>
        ))}

      </div>










      </div>
    
    
    
    </div>
  )
}

export default BrowseNote