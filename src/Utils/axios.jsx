import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",

  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzZlYTQwZjI3YWIwNGMwNzczN2U3ODQ3ZjZlZDljNSIsIm5iZiI6MTcyMjU5MzY2NC4zMTQyNjksInN1YiI6IjY2NGIzNGRmZjYwZmZlZWVmMjkyZDYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CWVNVCm5X0x-txPcBKTW-0_T2YWG1WmGS1-eHiWDcpA",
  },
});

export default instance;
