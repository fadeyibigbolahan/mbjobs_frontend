import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import virtual from "../assets/virtual.png";
import network from "../assets/network.jpg";
import { url } from "../../api";

import Success from "@/components/Success";
import Failure from "@/components/Failure";

import { Mail, KeySquare, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import apprentice from "../assets/apprentice.png";
import employer from "../assets/employer.png";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [resMessage, setResMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [accountType, setAccountType] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.trim().toLowerCase() : value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { fullName, email, phone, password, confirmPassword } = formData;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError("⚠️ All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url}users/register-${accountType}`, {
        fullName,
        email,
        phone,
        password,
      });

      setSuccess("✅ Signup successful! Redirecting...");

      setResMessage("Signup successful! Redirecting...");
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/verification", {
          state: { email: email },
        });
      }, 100);
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error.response?.data?.message ||
          "❌ Signup failed! Please try again later."
      );

      setResMessage(
        error.response?.data?.message ||
          "Signup failed! Please try again later."
      );
      setShowFailure(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col md:h-screen justify-center items-center gap-y-4 md:flex-row">
        {accountType === "apprentice" ? (
          <div className="h-full w-full bg-[#FFFFFF] md:w-[40%]">
            <div className="flex min-h-screen items-center justify-center">
              <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-8 gap-4">
                <img
                  src={virtual}
                  alt="virtual Logo"
                  style={{ width: "50px" }}
                />
                <h2 className="font-kanit mb-4 text-center text-lg font-semibold">
                  CREATE AN ACCOUNT AS AN APPRENTICE
                </h2>

                {success && (
                  <p className="mb-2 text-center text-sm text-green-600">
                    {success}
                  </p>
                )}

                {error && (
                  <p className="mb-2 text-center text-sm text-red-500">
                    {error}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="w-full">
                  {/* Full Name Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <User className="text-[#003366 ]" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full text-sm decoration-none outline-none"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* email Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <Mail className="text-[#003366 ]" size={16} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-sm decoration-none outline-none"
                      placeholder="Enter email"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <Phone className="text-[#003366 ]" size={16} />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full text-sm decoration-none outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <KeySquare className="text-[#003366]" size={20} />
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
                      <p className="text-xs">
                        {showPassword ? "Hide" : "Show"}
                      </p>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <KeySquare className="text-[#003366 ]" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full text-sm decoration-none outline-none"
                      placeholder="Confirm password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-[#003366] py-2 text-white hover:bg-[#7A54A1] flex justify-center items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-t border-white rounded-full animate-spin"></div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>

                <p className="font-kanit mt-4 text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-[#003366 ] hover:text-[#7A54A1]"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : accountType === "employer" ? (
          <div className="h-full w-full bg-[#FFFFFF] md:w-[40%]">
            <div className="flex min-h-screen items-center justify-center">
              <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-8 gap-4">
                <img
                  src={virtual}
                  alt="virtual Logo"
                  style={{ width: "50px" }}
                />
                <h2 className="font-kanit mb-4 text-center text-lg font-semibold">
                  CREATE AN ACCOUNT AS AN EMPLOYER
                </h2>

                {success && (
                  <p className="mb-2 text-center text-sm text-green-600">
                    {success}
                  </p>
                )}

                {error && (
                  <p className="mb-2 text-center text-sm text-red-500">
                    {error}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="w-full">
                  {/* Full Name Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <User className="text-[#003366 ]" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full text-sm decoration-none outline-none"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* email Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <Mail className="text-[#003366 ]" size={16} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-sm decoration-none outline-none"
                      placeholder="Enter email"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <Phone className="text-[#003366 ]" size={16} />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full text-sm decoration-none outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <KeySquare className="text-[#003366]" size={20} />
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
                      <p className="text-xs">
                        {showPassword ? "Hide" : "Show"}
                      </p>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
                    <KeySquare className="text-[#003366 ]" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full text-sm decoration-none outline-none"
                      placeholder="Confirm password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-[#003366] py-2 text-white hover:bg-[#7A54A1] flex justify-center items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-t border-white rounded-full animate-spin"></div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>

                <p className="font-kanit mt-4 text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-[#003366 ] hover:text-[#7A54A1]"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full bg-[#FFFFFF] md:w-[40%] gap-8 p-4">
            <h2 className="font-kanit mb-4 text-center text-3xl font-semibold">
              Join as an Apprentice or Employer
            </h2>
            <div className="flex md:flex-row flex-col justify-evenly items-center w-full gap-4">
              <div className="flex flex-col gap-3 justify-center items-center border border-black rounded-md p-2 md:w-[40%] w-full">
                <img src={employer} alt="employer" className="w-[40px]" />
                <p className="text-center text-lg">
                  I'm an employeer, I want to hire.
                </p>
                <Button
                  onClick={() => setAccountType("employer")}
                  className="w-full bg-blue-600"
                >
                  Select
                </Button>
              </div>
              <div className="flex flex-col gap-3 justify-center items-center border border-black rounded-md p-2 md:w-[40%] w-full">
                <img src={apprentice} alt="apprentice" className="w-[40px]" />
                <p className="text-center text-lg">
                  I'm an apprentice, I want to be hired.
                </p>
                <Button
                  onClick={() => setAccountType("apprentice")}
                  className="w-full bg-blue-600"
                >
                  Select
                </Button>
              </div>
            </div>
            <p className="font-kanit mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#003366 ] hover:text-[#7A54A1]"
              >
                Sign In
              </Link>
            </p>
          </div>
        )}
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

export default SignupPage;
