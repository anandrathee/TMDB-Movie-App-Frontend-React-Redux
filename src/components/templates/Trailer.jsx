import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../NotFound'


const Trailer = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const category = pathname.includes("movie") ? "movie" : "tv" ;
  const ytvideo = useSelector((state) => state[category].info.videos)
  return  (
    <div className='absolute z-100 bg-[rgba(0,0,0,.8)] top-0 left-0 w-screen h-screen flex items-center justify-center'>
      
      <Link
          onClick={() => navigate(-1)}
          className="ri-close-fill mr-2  font-semibold text-zinc-100 text-2xl absolute right-5 top-5"
        ></Link>

{ytvideo ?   <ReactPlayer height={580} width={1200} controls url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/> : <NotFound/> }
    
    </div>
  )
}

export default Trailer