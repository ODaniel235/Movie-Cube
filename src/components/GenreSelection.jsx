export default function Genre({ name, addedClass, addClickFunction }) {
  return (
    <button
      onClick={addClickFunction}
      className={`px-4 py-2 m-1 text-[15px] font-semibold rounded-3xl hover:bg-white hover:text-black transition 0.3s bg-red-500/20 ${addedClass} `}
    >
      {name}
    </button>
  );
}
