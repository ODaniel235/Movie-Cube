import { useEffect, useState } from "react";
import Genre from "../components/GenreSelection";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
export default function LandingPage() {
  axios.defaults.withCredentials = true;
  const [cross, setCross] = useState(false);
  const [input, setInput] = useState("");
  const [apiData, setApiData] = useState([]);
  const [apiFetching, setApiFetching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  const [activeGenre, setActiveGenre] = useState(-1);

  const inputCross = (e) => {
    const inputValue = e.target.value;
    setInput(e.target.value);
    inputValue.length >= 1 ? setCross(true) : setCross(false);
  };

  const genreSelectFunction = (i, id) => {
    setActiveGenre(i);
    setSelectedGenre(id);
  };
  useEffect(() => {
    async function fetchDataById() {
      setApiFetching(true);
      setInput("");
      try {
        const response = await axios.get(
          `https://movie-cube-server.onrender.com/genre?${selectedGenre}`
        );
        const data = response.data.data
        setApiData(data.results);
      } catch (error) {
        console.log(error);
      }
      setApiFetching(false);
    }
    selectedGenre && fetchDataById();
  }, [selectedGenre]);
  useEffect(() => {
    async function fetchData() {
      setApiFetching(true);
      try {
        const response = await axios.get(
          "https://movie-cube-server.onrender.com/allmovies"
        );
        if (response.status === 200) {
          setApiFetching(false);
        }
        setApiData(response.data.data.results);
        
      } catch (error) {
        console.error();
      }
    }
    fetchData();
  }, []);

  const fetcByTitle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://movie-cube-server.onrender.com/search?${input}`
      );
      const data = response.data.data
      if (data.results.length > 0) {
        setApiData(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className=" sm:h-[12vh] w-screen bg-gradient-to-r from-black to-red-700 flex justify-center items-center sm:-ml-20 h-fit ">
        <form
          className=" w-4/6 flex justify-center -ml-12 gap-1 items-center"
          onSubmit={fetcByTitle}
        >
          <input
            type="text"
            placeholder="Search Movie"
            className=" text-gray-600 text-sm w-3/4 ml-6 h-12 rounded-lg px-3 outline-none"
            value={input}
            onChange={inputCross}
          />
          <button
            className={`animate-bounce -ml-11 ${cross ? "visible" : "hidden"}`}
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 -960 960 960"
              width="30"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </form>
      </header>
      <main className=" w-full items-center flex sm:inline-block h-screen bg-[#10141E] sm:py-6  flex-col">
        <div className=" w-[90vw] items-center mt-4 sm:w-full flex flex-wrap justify-center gap-1 sticky ">
          {genres.map((genre, index) => (
            <Genre
              key={genre.id}
              name={genre.name}
              addedClass={
                index == activeGenre
                  ? "bg-white text-black"
                  : "bg-red-500/20 text-white"
              }
              addClickFunction={() => {
                genreSelectFunction(index, genre.id);
              }}
            />
          ))}
        </div>
        <h1 className="text-red-600 text-center font-bold text-3xl mt-3">
          Genres
        </h1>
        <div className=" w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around h-auto">
          {apiFetching
            ? genres.map((genre, index) => (
                <div
                  className="card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl border-2 border-red-600 overflow-hidden flex justify-center items-center"
                  key={index}
                >
                  <Loader color={"red"} />
                </div>
              ))
            : apiData.map((api, index) => {
                if (api.poster_path) {
                  return (
                    <div
                      key={index}
                      className="card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden"
                    >
                      <button className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          viewBox="0 0 1024 1024"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                        </svg>
                      </button>
                      <div className="absolute bottom-0 w-full flex justify-between items-end p-3 z-20">
                        <h1 className="text-white text-xl font-semibold  break-normal break-words">
                          {api.original_title}
                        </h1>
                        <h1
                          className={`font-bold ${
                            api.vote_average <= 6
                              ? "text-red-600"
                              : api.vote_average >= 6 && api.vote_average <= 7
                              ? "text-orange-400"
                              : "text-green-600"
                          } p-2 bg-red-900 rounded-full`}
                        >
                          {`${api.vote_average.toFixed(1)}`}
                        </h1>
                      </div>{" "}
                      <Link
                        className=" h-full w-full shadow-lg absolute z-10"
                        to={`/movie/:${api.id}`}
                      >
                        <img
                          src={`
                        https://image.tmdb.org/t/p/w500${api.poster_path}`}
                          alt="Movie Poster"
                          className=" absolute h-full w-full hover:scale-125 transition ease-in-out 0.5s"
                        />
                      </Link>
                    </div>
                  );
                }
              })}
        </div>
      </main>
    </>
  );
}
