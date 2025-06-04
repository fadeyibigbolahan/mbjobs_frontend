import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoipsumm from "../assets/logoipsumm.png";
import network from "../assets/network.jpg";
import { Mail } from "lucide-react";
import axios from "axios";
import { url } from "../../api";

const ForgetPasswordPage = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!input.trim()) {
      setError("⚠️ Please enter your email");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url}auth/forgot-password`, {
        email: input.trim(),
      });

      setSuccess("✅ Password reset instructions sent!");
      setLoading(false);

      // Optionally redirect user after a delay
      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(
        err.response?.data?.message ||
          "❌ Failed to send reset link. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col gap-y-4 md:flex-row">
      <div className="h-full w-full bg-[#FFFFFF] md:w-[40%]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-8 gap-4">
            <img
              src={logoipsumm}
              alt="logoipsumm Logo"
              style={{ width: "100px" }}
            />
            <h2 className="font-kanit mb-4 text-center text-sm font-semibold text-[#003366 ]">
              RESET YOUR PASSWORD
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
              <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                <Mail className="text-[#003366 ]" size={16} />
                <input
                  type="text"
                  name="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full text-sm decoration-none outline-none"
                  placeholder="Enter email or phone"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded bg-[#003366 ] py-2 text-white hover:bg-[#7A54A1] flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-t border-white rounded-full animate-spin"></div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <p className="font-kanit mt-4 text-center text-gray-600">
              Remember your password?{" "}
              <Link
                to="/signin"
                className="text-[#003366 ] hover:text-[#7A54A1]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden h-full w-[60%] items-center justify-center bg-[#003366 ] md:flex">
        <div className="w-[60%] shadow-md">
          <img
            src={network}
            alt="Network"
            style={{ width: "100%", height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
