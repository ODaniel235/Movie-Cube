export default function LoginPage() {
  return (
    <div className=" h-screen w-screen bg-[aliceblue] ">
      <div className="w-full h-full z-0 relative block  bg-black text-black">
        <img
          className="h-full w-full bg-black text-black opacity-50"
          src="Login-bg-img.jpg"
          alt="Background image"
        />
      </div>
      <div className=" absolute top-0 left-0 flex gap-1">
        <svg
          className=" ml-3 mt-3"
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          viewBox="0 -960 960 960"
          width="40"
          fill="red"
        >
          <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z" />
        </svg>
        <h1 className=" mt-3 font-bold text-3xl text-red-600">Movie Cube</h1>
      </div>
      <div className=" top-1/4 left-[30%] absolute bg-[rgba(0,0,0,.75)] p-8 flex flex-col gap-2 rounded-xl">
        <h1 className="text-white text-2xl font-semibold justify-self-start">
          Sign In
        </h1>
      </div>
    </div>
  );
}
