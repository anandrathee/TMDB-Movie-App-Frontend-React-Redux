import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from '../components/templates/HorizontalCards'

const Moviedetails = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,

        backgroundPosition: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[172vh] px-[10%]"
    >
      {/* Part 1 navigation */}
      <nav className="w-full relative h-[10vh] items-center text-zinc-100 flex gap-10 text-xl font-semibold">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line mr-2 text-2xl font-semibold text-zinc-100"
        ></i>

        <a target="_blank" href={info.detail.homepage}>
          <i class="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i class="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          IMDb
        </a>
      </nav>

      {/* Part 2 Poster and details */}

      <div className="w-full flex">
        <img
          className="h-[55vh] object-cover"
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-10 text-zinc-100">
          <h1 className="text-4xl mb-3 font-bold text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-2xl text-zinc-200 font-bold ">
           ({info.detail.release_date.split("-")[0]})
          </small>
          </h1>

          
          <div className="flex mt-3 mb-2 text-zinc-200 items-center gap-x-5">
          <span className=" text-white w-[5vh] mt-3 mb-3 text-sm font-semibold h-[5vh] flex items-center justify-center bg-yellow-600 rounded-full">
            {(info.detail.vote_average * 10).toFixed()} <sup className="font-semibold text-xs">%</sup>
          </span>
          <h1 className="font-semibold text-2xl w-[60px] leading-6">User Score</h1>
          <h1>{info.detail.release_date}</h1>
          <h1>{info.detail.genres.map((g, i)=> g.name).join(" | ")}</h1>
          <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-xl font-semibold text-zinc-200 italic">{info.detail.tagline}</h1>


          <h1 className="text-2xl mt-5 mb-1 font-semibold text-zinc-200">Overview</h1>
          <p className="text-sm">{info.detail.overview}</p>


          <h1 className="text-2xl mt-5 mb-1 font-semibold text-zinc-200">Languages</h1>
          <p className="text-sm mb-5 ">{info.translations.join("  | ")}</p>

          <Link className=" flex items-center justify-center w-24 h-12 rounded bg-[#6556CD]" to={`${pathname}/trailer`}><i className="ri-play-fill text-2xl"></i> Trailer</Link>
          
        

          
        </div>
      </div>

      {/* Part 3 Available on Platform */}

      <div className="w-[80%] flex flex-col gap-y-5 mt-5 mb-5">
        {info.watchproviders && info.watchproviders.flatrate && ( 
          <div className="flex items-center text-white  gap-3">
            <h1>Available On</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[7vh] h-[7vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex items-center text-white  gap-5">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[7vh] h-[7vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex items-center text-white  gap-5">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[7vh] h-[7vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

<hr className="mt-5 mb-5 border-none h-[2px] bg-zinc-500" />
      {/* Part 4 Recommendations */}


        <h1 className="text-2xl font-semibold text-white mb-2 mt-5">Recommendations & Similar stuff</h1>
        <HorizontalCards 
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
          }
          />

          <Outlet/>
      
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
