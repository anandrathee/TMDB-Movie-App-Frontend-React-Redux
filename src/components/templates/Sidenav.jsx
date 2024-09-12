import axios from '../../Utils/axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {

  return <div className='w-[20%] h-full border-r-2 border-zinc-400 p-8'>

    <h1 className='text-2xl text-white font-bold'>        
        <i className="ri-tv-fill text-[#6556cd] mr-3"></i>
      <span className=''>TMDB</span>  
    </h1>

    <nav className='flex  flex-col text-zinc-400 text-lg gap-2'>

    <h1 className='text-white font-semibold text-xl mt-8 mb-5 '>
        New Feeds        
    </h1>

    <Link to="/trending" className='hover:bg-[#6556cd] p-3 hover:text-white rounded duration-300'>
    <i className="ri-fire-fill mr-2"></i> Trending
    </Link>
    <Link to="/popular" className='hover:bg-[#6556cd] p-3 hover:text-white rounded duration-300'>
    <i className="ri-bard-fill mr-2"></i> Popular
    </Link>
    <Link to="/movie" className='hover:bg-[#6556cd] p-3 hover:text-white rounded duration-300'>
    <i className="ri-movie-2-fill mr-2"></i> Movies
    </Link>
    <Link to="/tv" className='hover:bg-[#6556cd] p-3 hover:text-white rounded duration-300'>
    <i className="ri-tv-2-fill mr-2"></i> Tv Shows
    </Link>
    <Link to="/people" className='hover:bg-[#6556cd] p-3 hover:text-white rounded duration-300'>
    <i className="ri-team-fill mr-2"></i> People
    </Link>
    </nav>

    <hr className='mt-2 mb-2 border-none h-[1px] bg-zinc-400' />

    <nav className='flex  flex-col text-zinc-400 text-lg gap-2'>

    <h1 className='text-white font-semibold text-xl mt-5 mb-5 '>
        Website Information       
    </h1>

    <Link className='hover:bg-[#6556cd] p-3 hover:text-white rounded duration-300'>
    <i className="ri-information-fill mr-2"></i> About TMDB
    </Link>
    <Link className='hover:bg-[#6556cd] p-3 hover:text-white rounded duration-300'>
    <i className="ri-phone-fill mr-2"></i> Contact Us
    </Link>
   
    </nav>

  </div>
}

export default Sidenav