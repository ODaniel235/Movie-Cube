import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MainVerifyOtp from "../components/SecondOtp";
import Alert from "../components/Alert";
export default function OtpVerification() {
  const [otp, setOtp] = useState();
  const [isLoading, setIsLoading] = useState(false);
  axios.defaults.withCredentials = true;
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/otpv?${email}`, {
        otp: Number(otp),
      });
      if (response.status === 200) {
        Alert("success", "Success", "User is verified");
        setTimeout(() => {
          navigate("/home", { state: { email } });
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      Alert("error", "Error", error?.response?.data.message);
    }
    setIsLoading(false);
  };
  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/otp", { email });
      if (response.status === 200) {
        Alert("success", "Success", "OTP sent successfully");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      Alert("error", "Error", "Error sending OTP");
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <MainVerifyOtp className={" w-32 -ml-12 h-auto mb-8 mt-3"} />
        <h1 className="text-3xl font-semibold mb-6">Verify OTP</h1>
        <div className="w-64">
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white mb-4"
          />
          <button
            onClick={handleVerifyOtp}
            className={`w-full px-4 py-3 rounded-md bg-red-600 text-white font-semibold ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Did not receive OTP?{" "}
          <button
            className="text-red-500 font-semibold"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </>
  );
}
