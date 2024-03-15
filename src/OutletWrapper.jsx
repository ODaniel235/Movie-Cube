import { Link } from "react-router-dom";
import { useState } from "react";
export default function OutletWrapper(props) {
  const wrapper = [
    { name: "Genres", href: "movies/genres" },
    { name: "Trending", href: "movies/trending" },
    { name: "Upcoming", href: "movies/upcoming" },
    { name: "Favorites", href: "movies/favorites" },
  ];
  const [indexState, setIndex] = useState(0);
  const changeIndexFunction = (i) => {
    setIndex(i);
  };
  return (
    <>
      <div className="flex">
        <aside className=" h-screen hidden w-[25%] px-2 sm:flex flex-col gap-3 items-center bg-black md:px-2">
          <svg
            className="  mt-6"
            xmlns="http://www.w3.org/2000/svg"
            height="60"
            viewBox="0 -960 960 960"
            width="60"
            fill="red"
          >
            <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z" />
          </svg>
          <h2 className="text-[#6E727B] text-2xl font-bold text-nowrap mb-2">
            Movie-Cube
          </h2>
          {wrapper.map((wrap, index) => (
            <Link
              to={index == 0 ? "/movies" : wrap.href}
              className={` text-center mb-1 ${
                indexState == index
                  ? "bg-red-500/20 border-2 border-red-600"
                  : "bg-gray-500/20"
              } text-white text-md font-medium w-5/6 py-[0.4rem] hover:border-2 hover:border-red-600  transition ease-in-out 1s hover:bg-red-500/20 rounded-md`}
              key={index}
              onClick={() => changeIndexFunction(index)}
            >
              {wrap.name}
            </Link>
          ))}
        </aside>

        <main className="h-screen overflow-x-hidden w-[100%]">
          {props.children}
        </main>
      </div>
    </>
  );
}
