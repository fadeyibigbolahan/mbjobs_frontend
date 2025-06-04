import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoipsumm from "../assets/logoipsumm.png";
import network from "../assets/network.jpg";
import { KeySquare } from "lucide-react";
import axios from "axios";
import { url } from "../../api";
import { useLocation } from "react-router-dom";

const VerificationPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false); // To manage resend button state

  const location = useLocation();
  const email = location.state?.email;

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, ""); // Allow only numbers
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if available
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const enteredOtp = otp.join(""); // Join the OTP array into a string

    if (enteredOtp.length !== 6) {
      setError("⚠️ Please enter the complete 6-digit code.");
      setLoading(false);
      return;
    }

    // API call for OTP verification
    axios
      .post(`${url}auth/verify-email`, {
        email: email,
        otp: enteredOtp,
      }) // Replace `url` with your base URL
      .then((response) => {
        setSuccess("✅ Verification successful!");
        setLoading(false);

        // Redirect after success
        setTimeout(() => {
          navigate("/dashboard/overview");
        }, 500);
      })
      .catch((error) => {
        console.error("OTP verification error:", error);
        setError(
          error.response?.data?.message ||
            "❌ Verification failed! Please try again later."
        );
        setLoading(false);
      });
  };

  const resendCode = () => {
    setResendLoading(true);
    // API call to resend OTP
    axios
      .post(`${url}auth/resend-code`, {
        email: email, // Pass the user's email or phone number
      })
      .then((response) => {
        setResendLoading(false);
        setSuccess("✅ Verification code sent successfully!");
      })
      .catch((error) => {
        setResendLoading(false);
        setError(
          error.response?.data?.message ||
            "❌ Failed to resend code! Please try again later."
        );
      });
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center flex-col gap-y-4 md:flex-row">
      <div className="h-full w-full bg-[#FFFFFF] md:w-[40%]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center rounded-xl border bg-white p-8 gap-4">
            <img
              src={logoipsumm}
              alt="logoipsumm Logo"
              style={{ width: "100px" }}
            />
            <h2 className="font-kanit mb-4 text-center text-sm font-semibold text-[#003366]">
              ENTER VERIFICATION CODE
            </h2>

            {success && (
              <p className="mb-2 text-center text-sm text-green-600">
                {success}
              </p>
            )}

            {error && (
              <p className="mb-2 text-center text-sm text-red-500">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex justify-between mb-6">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-10 h-10 border rounded text-center text-lg text-[#003366 ] outline-none focus:ring-2 focus:ring-[#003366 ]"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full rounded bg-[#003366] py-2 text-white hover:bg-[#7A54A1] flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-t border-white rounded-full animate-spin"></div>
                ) : (
                  "Verify"
                )}
              </button>
            </form>

            <p className="font-kanit mt-4 text-center text-gray-600">
              Didn't receive code?{" "}
              <button
                className="text-[#003366 ] hover:text-[#7A54A1] underline"
                onClick={resendCode}
                disabled={resendLoading}
              >
                {resendLoading ? "Resending..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
