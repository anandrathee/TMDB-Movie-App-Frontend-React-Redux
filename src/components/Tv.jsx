import axios from '../Utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './templates/Topnav';
import DropDown from './templates/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

const Tv = () => {

    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today")
    const [tv, settv] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
  
    document.title ="TMDB | Movies "+ category
  
  
    const GetTv = async () => {
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
      //   console.log(data)
  
      //   settrending(data.results);
        if(data.results.length > 0){
          settv((prev)=> [...prev, ...data.results])
          setpage(page + 1)   
        } else{
          sethasMore(false)
        }
        
      } catch (error) {
        console.log("Error", error);
      }
    };
  
  
    const refreshHandler =()=>{
      if(tv.length === 0){
          GetTv()
      } else{
          setpage(1)
          settv([])
          GetTv()
      }
    }
  
    useEffect(()=>{
      refreshHandler();
      GetTv();
    }, [category])
  
  //   console.log(trending)

  return  tv.length > 0 ? (
    <div className=" w-full h-full">
      <div className="w-full h-[10vh] px-10 flex items-center">        
        <h1 className="text-2xl whitespace-nowrap text-zinc-400 font-semibold">
        <i  onClick={() => navigate(-1)} className="ri-arrow-left-line mr-2 hover:text-[#6556cd] text-12xl font-semibold text-zinc-400"></i>
            Tv Shows
            </h1>

            <Topnav/>
            <DropDown  title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setcategory(e.target.value)}/>

      </div>

        <InfiniteScroll loader={<Loading/>} dataLength={tv.length} next={GetTv} hasMore={hasMore}>
        
        <Cards data={tv} title="tv"/>
        </InfiniteScroll>

    </div>
  ): <Loading/>
}

export default Tv