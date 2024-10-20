import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  // console.log(data)
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.profile_path
        })`,
        
        backgroundPosition: 'cover',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="w-full h-[60vh] flex flex-col justify-end items-start p-[5%] text-white"
    >
      <h1 className="w-[70%] text-5xl font-bold">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] mt-2">
        {data.overview ? `${data.overview.slice(0, 230)}...` : "No description available"}
        {data.overview && (
          <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400"> more</Link>
        )}
      </p>
      <p className="mt-2">
        <i className="ri-megaphone-fill text-yellow-500"></i>{" "}
        {data.release_date || "No Information"}
        <i className="ri-album-fill text-yellow-500 ml-5"></i>{" "}
        {data.media_type ? data.media_type.toUpperCase() : "No Media Type"}
      </p>

      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="mt-5 p-3 rounded font-semibold bg-[#6556CD]"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
