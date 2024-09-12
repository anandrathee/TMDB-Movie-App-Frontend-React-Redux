import React from "react";
import { Link } from "react-router-dom";
import NoImg from "../../../public/NoImg.png";

const Cards = ({ data, title }) => {
  // console.log(title)
  return (
    <div className="flex flex-wrap w-full h-full px-11 bg-[#1F1E24]  item-center justify-start mb-5 mt-8">
      {data.map((data, i) => (
        <Link to={`/${data.media_type || title}/details/${data.id}`}
          className="relative w-[26vh] rounded-md ml-11 mb-12  shadow-xl "
          key={i}
        >
          <img
            className="h-[40vh] object-cover"
            src={data.backdrop_path || data.poster_path || data.profile_path ? `https://image.tmdb.org/t/p/original${
              data.backdrop_path || data.poster_path || data.profile_path
            }` : NoImg
          }
            alt=""
          />

          <h1 className="text-zinc-300 text-base whitespace-nowrap overflow-hidden text-ellipsis  font-semibold mt-2 mb-1">
            {data.name ||
              data.title ||
              data.original_name ||
              data.original_title}
          </h1>

          {data.vote_average && 
          
          <div className="absolute bottom-[18%] right-[-10%] text-white w-[5vh] text-sm font-semibold h-[5vh] flex items-center justify-center bg-yellow-600 rounded-full">
            {(data.vote_average * 10).toFixed()} <sup className="font-semibold text-xs">%</sup>
          </div>
          }
          
        </Link>
      ))}
    </div>
  );
};

export default Cards;
