import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
export default function Upcoming() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [fetchdata, setFetchData] = useState([]);
  const genres = [1, 2, 3, 4];
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(
          `https://movie-cube-server.onrender.com/upcoming`
        );
        const data = response.data.data.results;
        setFetchData(data);
        setIsLoading(false);
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
        {isLoading
          ? genres.map((genre) => (
              <div
                key={genre}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:scale-105 flex justify-center items-center hover:shadow-2xl h-64 p-4 border-2 border-red-600 "
              >
                <Loader color={"red"} />
              </div>
            ))
          : fetchdata.map((movie) => (
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
