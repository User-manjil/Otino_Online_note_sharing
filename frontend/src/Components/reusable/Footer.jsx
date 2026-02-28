import React from 'react'

const Footer = () => {
  return (
    <div className='w-full flex  flex-col justify-between  gap-6 mt-10'>
        <div className="flex gap-10">
             <div className="flex flex-col">
                <h1 className='text-xl font-bold'>Otino</h1>
                <p  className='text-xs w-1/4'> Otino is a simple online platform where students can share, buy, and sell quality study notes. It makes learning easier while helping creators earn from their knowledge. </p>
            </div>
        <div className="flex text-sm">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Browse Notes</a></li>
                <li><a href="#">library</a></li>
            </ul>
        </div>

        <div className="flex text-sm">
            <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Linkedin</a></li>
            </ul>
        </div>
        </div>
    <div className="flex  w-full  justify-rounded gap-10 text-center items-center text-xs">
        <div className="flex items-center gap-2 text-center bg-amber-100 p-2 rounded-lg "><div className="flex w-2 h-2 bg-green-400 rounded-full"></div> All function Operational</div>
        <div className="flex text-center">© 2026 all right reserved </div>
        <div className="flex">Privacy Policy</div>
        <div className="flex">Term of Service</div>
    </div>
    </div>
  )
}

export default Footer
