import { useState } from "react";
import { Link } from "react-router-dom";
export default function LoginPage({ href }) {
  const [userInfoState, setUserInfoState] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordInputted, setPasswordInputted] = useState(false);
  const [toggleVisible, setToggleVisible] = useState(false);
  const [check, setCheck] = useState(true);

  //Creating a regex to determine if userinput is valid or not based on the input
  const regex = userInfoState
    ? /[0-9]{11}/gi
    : /^[a-z]+[\d]*@[a-z]{5,}[.][a-z]{2,4}/gi;
  const [regexDesign, setRegexDesign] = useState(null);
  const [submitValid, setSubmitValid] = useState(true);

  //creating password function
  const passwordFunction = (e) => {
    const password = e.target.value;
    password.length >= 6 && password.length <= 40
      ? setPasswordValid(true)
      : setPasswordValid(false);
    password.length >= 1
      ? setPasswordInputted(true)
      : setPasswordInputted(false);
  };

  //creating email input onChange function to determine the input type by manipulating states
  const changeInputType = (e) => {
    const convertToNumber = parseInt(e.target.value);
    if (!isNaN(convertToNumber)) {
      setUserInfoState(true);
    } else {
      setUserInfoState(false);
    }
    const inputValue = e.target.value;
    inputValue.length >= 1 ? setCheck(false) : setCheck(true);
    regex.test(inputValue) ? setRegexDesign(true) : setRegexDesign(false);
  };
  //Creating a submit function
  const submitFunction = () => {
    passwordValid && regexDesign ? setSubmitValid(true) : setSubmitValid(false);
  };
  return (
    <div className=" h-screen w-screen bg-black ">
      <div className=" hidden sm:visible w-full h-full z-0 relative sm:block  bg-black text-black">
        <img
          className="h-full w-full bg-black text-black opacity-50"
          src="Login-bg-img.jpg"
          alt="Background image"
        />
      </div>
      <div className=" absolute top-0 left-0 flex gap-1">
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
      <div className=" top-[10%] md:top-[20%] sm:left-[15%] sm:top-[32%] sm:w-4/6 absolute bg-black sm:bg-[rgba(0,0,0,.75)] p-4 sm:p-8 flex flex-col gap-2 sm:rounded-xl md:left-1/3 w-screen  md:w-2/6">
        <h1 className="text-white text-3xl mb-2 sm:text-2xl font-semibold justify-self-start">
          Sign In
        </h1>
        <form className="flex flex-col gap-6" action="/movies">
          <div>
            <input
              className={` bg-[rgb(51,51,51)] w-full px-2 py-3 rounded-md text-[#9CA3AF] outline-none  ${
                regexDesign
                  ? "border-b-2 border-b-green-600"
                  : !regexDesign && !check
                  ? "border-b-2 border-b-red-600"
                  : null
              }`}
              onChange={changeInputType}
              type={userInfoState ? "number" : "email"}
              placeholder="Email or Phone Number"
              required
            />
            <p
              className={`text-red-600 text-sm ${
                !regexDesign && !check ? "visible" : "hidden"
              }`}
            >
              Please enter a valid {userInfoState ? "phone number" : "email"}
            </p>
          </div>
          <div>
            <div
              className={` bg-[rgb(51,51,51)] w-full py-3 rounded-md px-2 flex gap-1 items-center ${
                passwordValid
                  ? "border-b-2 border-b-green-600"
                  : !passwordValid && passwordInputted
                  ? "border-b-2 border-b-red-600"
                  : "border-none"
              }`}
            >
              <input
                className="bg-[rgb(51,51,51)] outline-none w-5/6  text-[#9CA3AF]"
                type={toggleVisible ? "text" : "password"}
                placeholder="Password"
                onChange={passwordFunction}
              />
              <button
                className=" text-[rgb(140,140,140)] font-normal "
                type="button"
                onClick={() => setToggleVisible(!toggleVisible)}
              >
                {toggleVisible ? "Hide" : "Show"}
              </button>
            </div>
            <p
              className={` text-red-600 text-sm mb-0 ${
                passwordValid
                  ? " hidden"
                  : !passwordValid && passwordInputted
                  ? "visible"
                  : "hidden"
              } `}
            >
              Your password must have more than 6 characters
            </p>
          </div>
          <div>
            <Link to={passwordValid && regexDesign ? href : null}>
              <button
                className=" w-full px-2 py-3 rounded-md text-white bg-[#e50914] mt-0"
                type="submit"
                onClick={submitFunction}
              >
                Sign in
              </button>
            </Link>
            <p
              className={` text-red-700 text-sm ${
                !submitValid ? "visible" : "hidden"
              }`}
            >
              Please validate your form and resubmit
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
            New to Movie Cube?{"  "}
            <Link to={'sign-up'} className=" font-bold hover:cursor-pointer">Sign up now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
