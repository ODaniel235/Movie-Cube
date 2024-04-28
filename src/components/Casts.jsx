export default function Casts({ id, name, logo }) {
  return (
    <>
      {logo && (
        <div key={id} className="text-center  px-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${logo}`}
            alt={id}
            className="w-40 bg-cover h-40 mx-auto rounded-full"
          />
          <div className="mt-2 text-lg font-medium text-gray-300">{name}</div>
        </div>
      )}
    </>
  );
}
