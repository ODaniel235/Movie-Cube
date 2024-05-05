import { useState, useEffect } from "react";
import Lottie from "react-lottie";

export default function VerifyOtp({ className }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the animation data asynchronously
    fetch("/OTP.json?url")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error fetching animation data:", error));
  }, []); // Empty dependency array ensures the effect runs only once

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
