export default function MovieClick({ classAdded, imageFromApi }) {
  return (
    <main className={` ${classAdded} bg-red-600 h-screen w-[100%]`}>
      <div className="relative h-[80vh]  w-full bg-green-600">
        <img src={imageFromApi} alt="image" className=" h-full w-full" />
      </div>
    </main>
  );
}
