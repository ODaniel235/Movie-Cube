export default function MovieClick({
}) {
  return (
    <main className={` h-screen w-[100%] `}>
      <div className="relative h-auto md:h-[82vh] flex justify-center bg-black">
        <img
          src={imageFromApi}
          alt="image"
          className=" sm:h-[80vh] h-full w-full  m-auto bg-black"
        />
        <h1 className=" font-bold text-3xl md:text-6xl font-['Roboto'] bottom-12 z-20 absolute text-white">
          {nameFromApi}
        </h1>
      </div>
      <div className=" flex flex-col items-center px-[10vw] py-2 gap-3">
        <h2 className="text-white text-xl text-center text-wrap">{overview}</h2>
        <button className=" text-white text-md  w-fit h-fit p-2 px-3 bg-red-600/30 border-2 rounded-full font-semibold border-red-700">
          Release Date: {releaseDate}
        </button>
      </div>
    </main>
  );
}
