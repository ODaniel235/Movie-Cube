import { useEffect, useState } from "react";
import dotenv from "dotenv";
import Genre from "./GenreSelection";
import MovieClick from "./MovieClick";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [cross, setCross] = useState(false);
  const [input, setInput] = useState("");
  const [apiData, setApiData] = useState([]);
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
  ];
  const [activeGenre, setActiveGenre] = useState(0);

  const inputCross = (e) => {
    const inputValue = e.target.value;
    setInput(e.target.value);
    inputValue.length >= 1 ? setCross(true) : setCross(false);
  };
  const wipeInputFunction = (e) => {
    e.preventDefault();
    setInput("");
    setCross(false);
  };
  const [clickedMovie, setClickedMovie] = useState("look");
  const appendInfo = (i) => {
    const convertToNumber = parseInt(i);
    setClickedMovie(convertToNumber);
  };
  const genreSelectFunction = (i) => {
    setActiveGenre(i);
  };
  const myApiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?${myApiKey}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch data");
        }
        const data = await response.json();
        setApiData(data.results);
      } catch (error) {
        console.error();
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <header className=" sm:h-[12vh] w-screen bg-gradient-to-r from-black to-red-700 flex justify-center items-center sm:-ml-20 h-fit ">
        <form className=" w-4/6 flex justify-center -ml-12 gap-1 items-center">
          <input
            type="text"
            placeholder="Search Movie"
            className=" text-gray-600 text-sm w-3/4 h-12 rounded-lg px-3 outline-none"
            value={input}
            onChange={inputCross}
          />
          <button
            className={` -ml-11 ${cross ? "visible" : "hidden"}`}
            onClick={wipeInputFunction}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="red"
              height={22}
              width={22}
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
        </form>
      </header>
      <main className=" w-full items-center flex sm:inline-block h-screen bg-[#10141E] sm:py-6  flex-col">
        <div className=" w-[90vw] items-center mt-4 sm:w-full flex flex-wrap justify-center gap-1 sticky ">
          {genres.map((genre, index) => (
            <Genre
              key={index}
              name={genre}
              addedClass={
                index == activeGenre
                  ? "bg-white text-black"
                  : "bg-red-500/20 text-white"
              }
              addClickFunction={() => genreSelectFunction(index)}
            />
          ))}
        </div>
        <h1 className="text-red-600 text-center font-bold text-3xl mt-3">
          Genres
        </h1>
        <div className=" w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around h-auto">
          {apiData.map((api, index) => (
            <div
              key={index}
              className="card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden"
              onClick={() => appendInfo(index)}
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
                  {`${Math.round(api.vote_average)}.${Math.round(
                    Math.random() * 9
                  )}`}
                </h1>
              </div>{" "}
              <Link className=" h-full w-full shadow-lg absolute z-10" href="">
                <img
                  src={`
                        https://image.tmdb.org/t/p/w500${api.poster_path}`}
                  alt="Movie Poster"
                  className=" absolute h-full w-full hover:scale-125 transition ease-in-out 0.5s"
                />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
