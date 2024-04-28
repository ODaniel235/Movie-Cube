import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
export default function Trending() {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const genres = [1, 2, 3, 4];
  const [isLoading, setIsLoading] = useState(true);
  const fetchById = (id) => {
    navigate(`/movie/:${id}`);
  };
  const myApiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    const trending = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?${myApiKey}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch data");
        }
        const data = await response.json();
        await setTrendingMovies(data.results);
      } catch (error) {
        console.log("This is an error message: " + error);
      } 
      setIsLoading(false);
    };
    trending();
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Trending Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {isLoading
            ? genres.map((genre) => (
                <div
                  key={genre}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:scale-105 flex justify-center items-center hover:shadow-2xl h-64 p-4 border-2 border-red-600 "
                >
                  <Loader color={"red"} />
                </div>
              ))
            : trendingMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={()=>fetchById(movie.id)}
                  className="hover:cursor-pointer bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {movie.title}
                    </h2>
                    <p className="text-gray-400">
                      Release Year: {movie.release_date.substring(0, 4)}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
