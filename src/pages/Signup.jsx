import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
export default function SignupPage() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const emailRegex = /^[a-z]{1,}[0-9]{0,}[a-z]{0,}[@][a-z]{4,9}[.][a-z]{2,3}/gi;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState(null);
  const submitFunction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://movie-cube-server.onrender.com/signup",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        console.log("User is Authorized");
        navigate("/login");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Login Error: " + error);
      setErrorMessage(error?.response?.data?.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <>
        <div className=" hidden sm:visible w-full h-full  z-0 relative sm:block overflow-hidden  bg-black text-black">
          <img
            className="h-full w-full bg-black text-black overflow-hidden opacity-50 "
            src="Login-bg-img.jpg"
            alt="Background image"
          />
        </div>
        <div className=" absolute p-0 overflow-hidden top-0 left-0 flex gap-1">
          <svg
            className="  ml-3 mt-3"
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 -960 960 960"
            width="40"
            fill="red"
          >
            <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z" />
          </svg>
          <h1 className=" mt-3 font-bold text-3xl  text-[#e50914] sm:text-3xl mx-auto">
            Movie Cube
          </h1>
        </div>
        <div className=" top-[10%] md:top-[20%] sm:left-[15%] sm:top-[32%] overflow-hidden sm:w-4/6 absolute bg-black sm:bg-[rgba(0,0,0,.75)] p-4 sm:p-8 flex flex-col gap-2 sm:rounded-xl md:left-1/3 w-screen  md:w-2/6">
          <h1 className="text-white text-3xl mb-2 sm:text-2xl font-semibold justify-self-start">
            Create Account
          </h1>
          <form className="flex flex-col gap-6 overflow-hidden">
            <div>
              <input
                className={`bg-[rgb(51,51,51)] w-full px-2 py-3 rounded-md text-[#9CA3AF] outline-none ${
                  emailValid
                    ? "border-b-2 border-green-600"
                    : !emailValid && email !== ""
                    ? "border-b-2 border-red-600"
                    : "border-0"
                } `}
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  emailRegex.test(e.target.value)
                    ? setEmailValid(true)
                    : setEmailValid(false);
                }}
                required
              />
            </div>

            <div className=" bg-[rgb(51,51,51)] w-full py-3 rounded-md px-2 flex gap-1 items-center">
              <input
                className={`bg-[rgb(51,51,51)] outline-none w-5/6  text-[#9CA3AF]`}
                type={visible ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className=" text-[rgb(140,140,140)] font-normal "
                type="button"
                onClick={() => setVisible(!visible)}
              >
                {visible ? "Hide" : "Show"}
              </button>
            </div>
            <div>
              <button
                className={` w-full px-2 text-center flex justify-center py-3 rounded-md text-white mt-0 ${
                  isLoading ? "bg-red-500" : "bg-red-700"
                }`}
                type="submit"
                onClick={submitFunction}
              >
                {isLoading ? <Loader color={"black"} /> : "Sign Up"}
              </button>
              <p className=" text-red-700 text-md text-center">
                {errorMessage}
              </p>
            </div>
            <div className=" w-full h-fit py-2 bg-inherit flex justify-between">
              <section className=" flex gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked
                  className="accent-[#9CA3AF] "
                />{" "}
                <label
                  htmlFor="remember"
                  className=" flex items-center gap-2 text-sm text-[#9CA3AF]"
                >
                  Remember me
                </label>
              </section>
            </div>
            <p className=" text-[#9CA3AF]">
              Already have an account?{"  "}
              <Link to={"/login"}>Sign in now</Link>
            </p>
          </form>
        </div>
      </>
    </div>
  );
}
