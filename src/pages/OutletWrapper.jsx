import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MovieIcon from "../components/MovieIcon";
const asideGenre = [
  { name: "Genres", link: "/genres" },
  { name: "Trending", link: "/trending" },
  { name: "Upcoming", link: "/upcoming" },
];
const opeMenu =
  "M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z";

const closeMenu =
  "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z";
export default function OutletWrapper(props) {
  const [menuIsOpend, setMenuIsOpened] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [justLoaded, setJustLoaded] = useState(false);
  const [asideIndex, setAsideIndex] = useState(
    parseInt(localStorage.getItem("currentLocation"), 10) || 0
  );

  const location = useLocation();
  useEffect(() => {
    if (activeLink === "/genres") {
      setAsideIndex(0);
      localStorage.setItem("currentLocation", asideIndex);
    } else if (activeLink === "/trending") {
      setAsideIndex(1);
      localStorage.setItem("currentLocation", asideIndex);
    } else if (activeLink === "/upcoming") {
      setAsideIndex(2);
      localStorage.setItem("currentLocation", asideIndex);
    } else if (activeLink === "/home") {
      setAsideIndex(0);
      localStorage.setItem("currentLocation", asideIndex);
    }
  }, [activeLink, asideIndex]);
  useEffect(() => {
    setActiveLink(location.pathname);
    localStorage.setItem("activeLink", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("currentLocation", asideIndex);
  }, [asideIndex]);

  return (
    <div className=" w-screen flex flex-row">
      <aside className=" h-screen hidden w-[25%] px-2 sm:flex flex-col gap-3 items-center bg-black md:px-2">
        <MovieIcon className={" mt-6 "} />
        <h2 className="text-[#6E727B] text-2xl font-bold text-nowrap mb-2">
          Movie-Cube
        </h2>
        {asideGenre.map((genre, index) => (
          <Link
            to={genre.link}
            className={`text-center mb-1 text-white text-md font-medium w-5/6 py-[0.4rem] hover:border-2 hover:border-red-600  transition ease-in-out 1s hover:bg-red-500/20 rounded-md ${
              index === asideIndex
                ? "border-red-600 bg-red-500/20 border-2"
                : " bg-gray-500/20 border-2 border-gray-600"
            }`}
            key={index}
            onClick={() => {
              setAsideIndex(index);
            }}
          >
            {genre.name}
          </Link>
        ))}
      </aside>
      <nav
        className={` ${
          !justLoaded ? "hidden " : "flex"
        } z-50 w-2/3 flex-col md:hidden top-[15vh] justify-center items-center left-[15vw] border-2 border-red-600 rounded-lg = bg-black opacity-90  absolute h-2/3 ${
          menuIsOpend ? "open-menu" : "close-menu"
        }`}
      >
        <MovieIcon className={'w-32 m-0'} />
        {asideGenre.map((genre, index) => (
          <Link
            to={genre.link}
            key={genre.name}
            className={`text-center mb-1 text-white text-md  font-medium w-5/6 py-[0.4rem] hover:border-2 hover:border-red-600  transition ease-in-out 1s hover:bg-red-500/20 rounded-md ${
              index === asideIndex
                ? "border-red-600 bg-red-500/20 border-2"
                : " bg-gray-500/20 border-2 border-gray-600"
            }`}
            onClick={() => {
              setMenuIsOpened(false);
              setAsideIndex(index);
            }}
          >
            {genre.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => {
          setMenuIsOpened(!menuIsOpend);
          setJustLoaded(true);
        }}
        className={`visible h-20 w-20 rounded-full bg-red-800 bottom-7 right-10 md:hidden z-50 absolute ${
          menuIsOpend ? "nav-animate" : "nav-close"
        } flex p-1 justify-center items-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="45"
          viewBox="0 -960 960 960"
          width="45"
          fill="white"
        >
          <path d={menuIsOpend ? closeMenu : opeMenu} />
        </svg>
      </button>
      <main className=" h-screen overflow-x-hidden w-[100%] bg-[#10141E]">
        {props.children}
      </main>
    </div>
  );
}
