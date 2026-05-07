import { Star } from 'lucide-react'
import React from 'react'

const Card = (props) => {
  return (
    <div className='w-70 h-70 sm:w-45 sm:h-70 flex flex-col  rounded-xl '>
        <div className="flex w-full h-50 bg-amber-400 items-center justify-center  rounded-xl">
            <p className='text-6xl font-bold text-yellow-500 '>{props.title.slice(0,2)}</p>
        </div>
        <div className="flex flex-col w-full gap-0.5">
            <div className="flex font-bold">{props.title.slice(0,15)}..</div>
            <div className="flex text-xs font-bold">{props.subCode}</div>
            <div className="flex text-xs text-blue-400 font-bold">{props.author}</div>
            <div className="flex">
                <div className="flex w-full justify-between gap-20 items-center text-center">
                    <div className="flex items-center text-center ">{props.rating} <Star size={16} fill='black'/> </div>
                    <div className="flex bg-amber-400 px-3 rounded-sm text-center" >{props.rate}</div>
                </div>
            </div>
        </div> 
        
    </div>
  )
}

export default Card
