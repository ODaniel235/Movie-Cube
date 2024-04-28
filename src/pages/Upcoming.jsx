import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Upcoming() {
  const navigate = useNavigate();
  const [fetchdata, setFetchData] = useState([]);
  const myApiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?${myApiKey}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch");
        }
        const data = await response.json();
        setFetchData(data.results);
        console.log(fetchdata);
      } catch (error) {
        console.log("This is an error message: " + error);
      }
    };
    fetchApiData();
  }, []);
  const fetchById = (id) => {
    navigate(`/movie/:${id}`);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Upcoming Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {fetchdata.map((movie) => (
          <div
            onClick={() => fetchById(movie.id)}
            key={movie.id}
            className="bg-gray-900 rounded-lg cursor-pointer overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
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
                Release Date: {movie.release_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
