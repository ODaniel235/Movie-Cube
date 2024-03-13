import { useState } from "react";
import Genre from "./GenreSelection";

export default function LandingPage() {
  const [cross, setCross] = useState(false);
  const [input, setInput] = useState("");
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
  const genreSelectFunction = (i) => {
    setActiveGenre(i);
  };
  return (
    <>
      <header className="w-screen bg-gradient-to-r from-black to-red-700 h-[20vh] flex justify-center items-center  -ml-20">
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
      <main className="w-full h-screen bg-[#10141E] p-12 px-16">
        <div className=" flex  flex-wrap justify-center gap-3">
          {genres.map((genre, index) => (
            <Genre
              key={index}
              name={genre}
              addedClass={
                index == activeGenre
                  ? "bg-white text-black"
                  : "bg-red-600 text-white"
              }
              addClickFunction={() => genreSelectFunction(index)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
