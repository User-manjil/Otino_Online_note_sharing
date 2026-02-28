import { Star } from 'lucide-react'
import React from 'react'

const Card = (props) => {
  return (
    <div className='w-50 h-70 flex flex-col  rounded-xl '>
        <div className="flex w-full h-50 bg-amber-400 rounded-xl"></div>
        <div className="flex flex-col w-full">
            <div className="flex font-bold">{props.title}</div>
            <div className="flex text-xs font-bold">{props.subCode}</div>
            <div className="flex text-xs">{props.author}</div>
            <div className="flex">
                <div className="flex w-full justify-between gap-20">
                    <div className="flex items-center ">{props.rating} <Star size={20} fill='black'/> </div>
                    <div className="flex bg-amber-400 px-2">{props.rate}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card
