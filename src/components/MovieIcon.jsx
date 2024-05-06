import { useState, useEffect } from "react";
import Lottie from "react-lottie";

export default function MovieIcon({ className }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Movie-Icon.json?url")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error fetching animation data:", error));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={className}>
      {animationData && <Lottie options={defaultOptions} />}
    </div>
  );
}
