import { useNavigate, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import OutletWrapper from "./OutletWrapper";
import LandingPage from "./LandingPage";
import SingleMoviePage from "./SingleMovie";
import Trending from "./Trending";
import Upcoming from "./Upcoming";
export default function Layout() {
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const verifyFunction = async () => {
      setIsAuthorizing(true);
      try {
        const response = await axios.get(
          "https://movie-cube-server.onrender.com/authorize"
        );
        if (response.status === 200) {
          setIsAuthorizing(false);
        }else{
         navigate('/login')
         setIsAuthorizing(false);
}
      } catch (error) {
        console.log(error);
        navigate('/login')
        setIsAuthorizing(false);
      }
    };
    verifyFunction();
  }, []);
  return (
    <>
      {isAuthorizing ? (
        <div className=" w-screen h-screen bg-black flex items-center justify-center">
          <Loader color={"red"} />
        </div>
      ) : (
        <OutletWrapper>
          <Routes>
            <Route
              path="*"
              element={<LandingPage isAuthorizing={isAuthorizing} />}
            />
            <Route path="/trending" element={<Trending />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/movie/:id" element={<SingleMoviePage />} />
          </Routes>
        </OutletWrapper>
      )}
    </>
  );
}
