import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import SwiperJs from "../components/Slider";

export default function SingleMoviePage() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { id } = useParams();
  const extracting = id.match(/\d+/g).join("");
  const Id = Number(extracting);
  const [fetchById, setFetchById] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [trailerLink, setTrailerLink] = useState(null);
  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const response = await axios.get(
          `https://movie-cube-server.onrender.com/title?${Id}`
        );
        const data = response.data.data
        const videos = data.videos.results;
        const trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerLink(`https://www.youtube.com/embed/${trailer.key}`);
        }
        await setFetchById(data);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    fetchFunction();
  }, []);
  return (
    <>
      {isFetching ? (
        <div className=" w-screen h-screen bg-black flex items-center justify-center">
          <Loader color={"red"} />
        </div>
      ) : (
        <main className=" h-screen overflow-x-hidden w-[100%] ">
          <div className="bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    {fetchById.original_title}
                  </h1>
                  <p className=" m-0 p-0 text-2xl font-bold text-gray-500">
                    {fetchById.tagline}
                  </p>
                  <p className="mt-4 text-lg text-gray-300">
                    {fetchById.overview}
                  </p>
                  <div className="mt-6 flex justify-center items-center space-x-4">
                    {fetchById.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="inline-block bg-gray-800 hover:border-2 hover:border-red-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-300"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 text-xl text-gray-300">
                    <span className="font-semibold">Release Date:</span>{" "}
                    {fetchById.release_date} |{" "}
                    <span className="font-semibold">Runtime:</span>{" "}
                    {fetchById.runtime} min
                  </div>
                  <div className="mt-8">
                    {trailerLink ? (
                      <iframe
                        src={trailerLink}
                        title="Movie-Trailer"
                        className="w-full h-96 rounded-lg shadow-lg"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        alt="trailer"
                        className="w-full h-96 rounded-lg shadow-lg"
                        src={`https://image.tmdb.org/t/p/w500${
                          fetchById.backdrop_path || fetchById.poster_path
                        }`}
                      />
                    )}
                  </div>
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white">Casts</h2>
                    <div className=" mt-2 w-5/6 mx-auto ">
                      <SwiperJs casts={fetchById.credits.cast} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
