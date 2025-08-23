import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import virtual from "../assets/virtual.png";
import network from "../assets/network.jpg";
import { KeySquare } from "lucide-react";
import { url } from "../../api";

const ResetPasswordPage = () => {
  const { token } = useParams(); // Get the token from the URL

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.password || !formData.confirmPassword) {
      setError("⚠️ Please fill in both fields.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${url}auth/reset-password`, // Change if needed
        {
          token,
          newPassword: formData.password,
        }
      );
      setSuccess("✅ Password reset successfully!");
    } catch (err) {
      setError("❌ Failed to reset password. Token may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col gap-y-4 md:flex-row justify-center items-center">
      <div className="h-full w-full bg-[#FFFFFF] md:w-[40%]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center rounded-xl border bg-white p-8 gap-4">
            <img src={virtual} alt="virtual Logo" style={{ width: "100px" }} />
            <h2 className="font-kanit mb-4 text-center text-sm font-semibold text-[#003366 ]">
              SET NEW PASSWORD
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
                <KeySquare className="text-[#003366 ]" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-sm decoration-none outline-none"
                  placeholder="New Password"
                />
              </div>
              <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                <KeySquare className="text-[#003366 ]" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full text-sm decoration-none outline-none"
                  placeholder="Confirm New Password"
                />
                <div
                  className="flex justify-center items-center p-1 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <p className="text-xs text-[#003366 ]">
                    {showPassword ? "Hide" : "Show"}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-[#003366] py-2 text-white hover:bg-[#7A54A1] flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-t border-white rounded-full animate-spin"></div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <p className="font-kanit mt-4 text-center text-gray-600">
              <Link
                to="/signin"
                className="text-[#003366 ] hover:text-[#7A54A1]"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
