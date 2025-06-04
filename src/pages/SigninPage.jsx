import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoipsumm from "../assets/logoipsumm.png";
import network from "../assets/network.jpg";
import Loading from "../components/Loading";

import { Mail, KeySquare } from "lucide-react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

import Success from "@/components/Success";
import Failure from "@/components/Failure";

const SigninPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [resMessage, setResMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const loading = auth.status === "loading";

  useEffect(() => {
    if (auth.status === "succeeded" && auth.user) {
      console.log("auth user", auth.user);
      setSuccess("✅ Login successful! Redirecting...");

      setResMessage("Login successful! Redirecting...");
      setShowSuccess(true);
      setTimeout(() => {
        auth.user.verified
          ? navigate("/dashboard/overview")
          : navigate("/verification", {
              state: { email: auth.user.email },
            });
      }, 100);
    } else if (auth.status === "failed") {
      const errorMessage =
        typeof auth.error === "string"
          ? auth.error
          : auth.error?.message ||
            "❌ Login failed! Please check your credentials.";
      setError(errorMessage);

      setResMessage(errorMessage);
      setShowFailure(true);
      setSuccess("");
    }
  }, [auth.status, auth.user, auth.error, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear messages when user types
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      const msg = "⚠️ Email and password are required";
      setError(msg);
      toast.warn(msg);
      return;
    }

    dispatch(login({ email, password }));
  };

  return (
    <>
      <div className="relative h-screen w-full flex flex-col justify-center items-center gap-y-4 md:flex-row">
        <div className="w-full bg-[#FFFFFF] md:w-[40%]">
          <div className="flex min-h-screen items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center rounded-xl border bg-white p-8 gap-4">
              <img
                src={logoipsumm}
                alt="logoipsumm Logo"
                style={{ width: "100px" }}
              />
              <h2 className="font-kanit mb-4 text-center text-sm font-semibold text-[#003366 ]">
                LOGIN TO YOUR ACCOUNT
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-sm decoration-none outline-none"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                  <KeySquare className="text-[#003366 ]" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full text-sm decoration-none outline-none"
                    placeholder="Password"
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
                    "Login"
                  )}
                </button>
              </form>

              <div>
                <p className="font-kanit mt-4 text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-[#003366 ] hover:text-[#7A54A1]"
                  >
                    Sign up
                  </Link>
                </p>
                <p className="font-kanit mt-2 text-center text-gray-600">
                  <Link
                    to="/forgot-password"
                    className="text-[#003366 ] hover:text-[#7A54A1]"
                  >
                    Forget your password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <Success message={resMessage} onClose={() => setShowSuccess(false)} />
      )}
      {showFailure && (
        <Failure message={resMessage} onClose={() => setShowFailure(false)} />
      )}
    </>
  );
};

export default SigninPage;
