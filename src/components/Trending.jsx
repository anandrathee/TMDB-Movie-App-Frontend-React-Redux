import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import DropDown from "./templates/DropDown";
import axios from "../Utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from 'react-infinite-scroll-component';


const Trending = () => {

 
  
  const navigate = useNavigate();
  const [category, setcategory] = useState("all")
  const [duration, setduration] = useState("day")
  const [trending, settrending] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  document.title ="TMDB | Trending "+ `${category}`


  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      // console.log(data)

    //   settrending(data.results);
      if(data.results.length > 0){
        settrending((prev)=> [...prev, ...data.results])
        setpage(page + 1)
      } else{
        sethasMore(false)
      }
      
    } catch (error) {
      console.log("Error", error);
    }
  };


  const refreshHandler =()=>{
    if(trending.length === 0){
        GetTrending()
    } else{
        setpage(1)
        settrending([])
        GetTrending()
    }
  }

  useEffect(()=>{
    refreshHandler();
    GetTrending();
  }, [category, duration])

//   console.log(trending)

  return trending.length > 0 ? (
    <div className=" w-full h-full ">
      <div className="w-full h-[10vh] px-10 flex items-center">        
        <h1 className="text-2xl text-zinc-400 font-semibold">
        <i  onClick={() => navigate(-1)} className="ri-arrow-left-line mr-2 hover:text-[#6556cd] text-2xl font-semibold text-zinc-400"></i>
            Trending
            </h1>

            <Topnav/>
            <DropDown  title="Category"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}/>
            <div className="w-10"></div>

            <DropDown title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}/>
      </div>

        <InfiniteScroll loader={<Loading/>} dataLength={trending.length} next={GetTrending} hasMore={hasMore}>
        
        <Cards data={trending} title={category}/>
        </InfiniteScroll>

    </div>
  ): <Loading/>
};

export default Trending;
