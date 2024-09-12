import React, { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import axios from "../Utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import DropDown from "./templates/DropDown";
import Loading from "./Loading";

const Home = () => {
  document.title = "TMDB | Homepage"; // this will show our webpage name on top of the browser

  const [wallpaper, setwallpaper] = useState(null);

  const [trending, settrending] = useState(null);

  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      // console.log(data)
      let randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setwallpaper(randomData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      // console.log(data)

      settrending(data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // console.log(wallpaper)
  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />

      <div className="w-[80%] h-full overflow-y-auto">
        <Topnav />
        <Header data={wallpaper} />

        <div className="mb-5 mt-5 flex justify-between px-2">
          <h1 className="text-2xl text-zinc-400 font-semibold ml-2">
            Trending
          </h1>
          <DropDown
            title="Category"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;
