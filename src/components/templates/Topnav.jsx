import axios from "../../Utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from '../../../public/NoImg.png'

const Topnav = () => {
  const [query, setQuery] = useState("");

  const [searches, setsearches] = useState([])

  const GetSearches = async()=>{
    try{

        const {data} = await axios.get(`/search/multi?query=${query}`)
        // console.log(data)
        setsearches(data.results)

    } catch (error){
        console.log("Error", error);
    }
}

useEffect(()=>{
    GetSearches()
},[query])

  return (
    <div className="w-[90%] h-[10vh] relative flex pl-[5%] items-center">
      <i className="ri-search-line text-zinc-400 text-2xl"></i>

      <input
        onChange={(e)=> setQuery(e.target.value)}
        value={query}
        className="w-[50%] mx-5 p-2  text-md outline-none hover:border-b-[1px] bg-transparent text-zinc-200"
        type="text"
        placeholder="Movies , Tv Shows and Favourite Casts"
      />

      {query.length > 0 && (          
          <i onClick={()=> setQuery("")} className="ri-close-fill  right-0  text-zinc-400 text-2xl"></i>
      )}


      <div className="w-[47%] max-h-[65vh] bg-zinc-200 absolute top-[90%] left-[10%] mt-2 overflow-auto z-[100]">  {/*search items show when we searh something on input*/}

      {searches.map((s,i)=>(
        <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 duration-300  w-full p-3 flex  gap-5 justify-start items-center border-b-2 border-zinc-100">
        <img
        className="w-[15vh] h-[12vh] ml-3 rounded object-fit shadow-xl"
         src={
            s.backdrop_path ||
            s.profile_path ? `https://image.tmdb.org/t/p/original${
            s.backdrop_path || s.profile_path
          }` : noimage
        }
             alt="" />
        <span>{s.name || s.title || s.original_name || s.original_title}</span>
      </Link>
      ))}       
       
      </div>
    </div>
  );
};

export default Topnav;
