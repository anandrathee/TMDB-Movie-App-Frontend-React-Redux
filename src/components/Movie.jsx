import axios from '../Utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './templates/Topnav';
import DropDown from './templates/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

const Movie = () => {

  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing")
  const [movie, setmovie] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  document.title ="TMDB | Movies "+ `${category}`


  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
    //   console.log(data)

    //   settrending(data.results);
      if(data.results.length > 0){
        setmovie((prev)=> [...prev, ...data.results])
        setpage(page + 1)   
      } else{
        sethasMore(false)
      }
      
    } catch (error) {
      console.log("Error", error);
    }
  };


  const refreshHandler =()=>{
    if(movie.length === 0){
        GetMovie()
    } else{
        setpage(1)
        setmovie([])
        GetMovie()
    }
  }

  useEffect(()=>{
    refreshHandler();
    GetMovie();
  }, [category])

//   console.log(trending)


  return movie.length > 0 ? (
    <div className=" w-full h-full">
      <div className="w-full h-[10vh] px-10 flex items-center">        
        <h1 className="text-2xl text-zinc-400 font-semibold">
        <i  onClick={() => navigate(-1)} className="ri-arrow-left-line mr-2 hover:text-[#6556cd] text-2xl font-semibold text-zinc-400"></i>
            Movies 
            </h1>

            <Topnav/>
            <DropDown  title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}/>

      </div>

        <InfiniteScroll loader={<Loading/>} dataLength={movie.length} next={GetMovie} hasMore={hasMore}>
        
        <Cards data={movie} title="movie"/>
        </InfiniteScroll>

    </div>
  ): <Loading/>
}

export default Movie