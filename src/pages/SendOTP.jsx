import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import VerifyOtp from "../components/OTP";
import Alert from "../components/Alert";

export default function SendVerificationOTPPage() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSendVerificationOTP = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://movie-cube-server.onrender.com/otp",
        { email }
      );
      if (response.status === 200) {
        Alert("success", "Success", "OTP sent successfully");
        setTimeout(() => {
          navigate("/verify", { state: { email } });
        }, 1000);
        setIsLoading(false);
      }
    } catch (error) {
      Alert("error", "Error", "Error sending OTP");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <VerifyOtp className={"w-24 h-auto mb-8  ml-3 mt-3"} />
      <h1 className="text-3xl font-semibold mb-6">Verify Account</h1>
      <button
        onClick={handleSendVerificationOTP}
        className={`w-full md:w-3/4 px-4 py-3 rounded-md bg-red-600 text-white font-semibold ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Sending OTP..." : "Send Verification OTP"}
      </button>
      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-red-500 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}
