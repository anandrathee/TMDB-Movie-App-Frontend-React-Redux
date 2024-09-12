import axios from '../Utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './templates/Topnav';
import DropDown from './templates/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

const People = () => {

  const navigate = useNavigate();
  const [category, setcategory] = useState("popular")
  const [person, setPerson] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  document.title ="TMDB | Movies "+ category


  const Getperson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
    //   console.log(data)

    //   settrending(data.results);
      if(data.results.length > 0){
       setPerson((prev)=> [...prev, ...data.results])
        setpage(page + 1)   
      } else{
        sethasMore(false)
      }
      
    } catch (error) {
      console.log("Error", error);
    }
  };


  const refreshHandler =()=>{
    if(person.length === 0){
        Getperson()
    } else{
        setpage(1)
       setPerson([])
        Getperson()
    }
  }

  useEffect(()=>{
    refreshHandler();
    Getperson();
  }, [category])

//   console.log(trending)


  return person.length > 0 ? (
    <div className=" w-full h-full">
      <div className="w-full h-[10vh] px-10 flex items-center">        
        <h1 className="text-2xl whitespace-nowrap text-zinc-400 font-semibold">
        <i  onClick={() => navigate(-1)} className="ri-arrow-left-line mr-2 hover:text-[#6556cd] text-12xl font-semibold text-zinc-400"></i>
            Person
            </h1>

            <Topnav/>
            {/* <DropDown  title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setcategory(e.target.value)}/> */}

      </div>

        <InfiniteScroll loader={<Loading/>} dataLength={person.length} next={Getperson} hasMore={hasMore}>
        
        <Cards data={person} title="person"/>
        </InfiniteScroll>

    </div>
  ): <Loading/>
}

export default People