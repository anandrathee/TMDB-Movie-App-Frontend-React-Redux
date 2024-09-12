import axios from '../Utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './templates/Topnav';
import DropDown from './templates/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

const Popular = () => {

  

  const navigate = useNavigate();
  const [category, setcategory] = useState("movie")
  const [popular, setpopular] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  document.title ="TMDB | Popular "+ `${category}`
  


  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
    //   console.log(data)

    //   settrending(data.results);
      if(data.results.length > 0){
        setpopular((prev)=> [...prev, ...data.results])
        setpage(page + 1)
      } else{
        sethasMore(false)
      }
      
    } catch (error) {
      console.log("Error", error);
    }
  };


  const refreshHandler =()=>{
    if(popular.length === 0){
        GetPopular()
    } else{
        setpage(1)
        setpopular([])
        GetPopular()
    }
  }

  useEffect(()=>{
    refreshHandler();
    GetPopular();
  }, [category])

//   console.log(trending)
  return popular.length > 0 ? (
    <div className=" w-full h-full  ">
      <div className="w-full h-[10vh] px-10 flex items-center">        
        <h1 className="text-2xl text-zinc-400 font-semibold">
        <i  onClick={() => navigate(-1)} className="ri-arrow-left-line mr-2 hover:text-[#6556cd] text-2xl font-semibold text-zinc-400"></i>
            Popular
            </h1>

            <Topnav/>
            <DropDown  title="Category"
            options={["tv", "movie",]}
            func={(e) => setcategory(e.target.value)}/>

      </div>

        <InfiniteScroll loader={<Loading/>} dataLength={popular.length} next={GetPopular} hasMore={hasMore}>
        
        <Cards data={popular} title={category}/>
        </InfiniteScroll>

    </div>
  ): <Loading/>
};


export default Popular