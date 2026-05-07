import React from 'react'

const Banner = () => {
     const dataStat = [
        {data:"500+", subTitle:"premium"},
        {data:"500+", subTitle:"premium"},
        {data:"500+", subTitle:"premium"},
     ]
  return (
    <div className='w-full bg-amber-400 flex flex-col h-full p-20'>
      
        <div className="flex  bg-white/40 border border-white font-medium  text-black  w-fit px-4 mx-auto rounded-full ">Nepal 1st Study Notes Platform</div>
        <div className="flex flex-col mx-auto  text-6xl font-bold max-w-4xl">
            Study Smarter with 
            <span className='text-white'>Premium Notes</span>
        </div>
        <div className="flex font-medium mx-auto">Browse 500+ curated notes from top students across Nepal's universities and colleges</div>
        
        <div className="flex gap-10 mx-auto">
            {dataStat.map((el,index)=>{
                return <div className='text-2xl font-bold'>{el.data} <span className='text-xs text-black/50'>{el.subTitle}</span></div>
            })}
        </div>
        <div className="flex"></div>
    </div>
  )
}

export default Banner
