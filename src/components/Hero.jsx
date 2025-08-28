import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
// import Typed from 'react-typed';
import herobg from "../assets/herobg.jpg";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="overflow-hidden mx-2 sm:mx-4 md:mx-8 lg:mx-16 rounded-xl sm:rounded-2xl">
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${herobg})` }}
        ></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 sm:opacity-60 z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 md:px-8 lg:px-12 py-8">
          <div className="w-full max-w-4xl text-center md:text-left flex flex-col justify-center space-y-6 sm:space-y-8">
            <h1 className="font-kanit text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              <span className="font-light">Connect.</span>
              <br />
              Learn. Grow.
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Find your next opportunity or train for your dream job. A platform
              that connects employers and apprentices, and empowers learning
              through practical courses.
            </p>

            <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 sm:gap-4 pt-4">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base font-medium">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#FFB23B] hover:bg-[#E6A034] px-6 sm:px-8 py-3 text-sm sm:text-base font-medium">
                  Join the Movement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
