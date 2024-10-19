import React from "react";
import { Link } from "react-router-dom";
import NoImg from "../../../public/NoImg.png";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full flex overflow-x-auto overflow-y-hidden gap-3 mb-3 px-4">
      {data.length > 0 ? (
        data.map((data, i) => (
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            key={i}
            className="h-[52vh] flex flex-col gap-3 min-w-[19%] mb-3 bg-zinc-700 rounded overflow-hidden"
          >
            <img
              className="h-[23vh]"
              src={
                data.backdrop_path || data.poster_path
                  ? `https://image.tmdb.org/t/p/original${
                      data.backdrop_path || data.poster_path
                    }`
                  : NoImg
              }
              alt=""
            />
            <div className="p-2 text-white">
              <div className="h-16 overflow-hidden">
                <h1 className="text-lg font-bold mt-2 ">
                  {data.name ||
                    data.title ||
                    data.original_name ||
                    data.original_title}
                </h1>
              </div>
              <p className="mt-2">
                {data.overview
                  ? `${data.overview.slice(0, 80)}...`
                  : "No description available"}
                {data.overview && <span className="text-zinc-400"> more</span>}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-semibold text-center mt-5">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
