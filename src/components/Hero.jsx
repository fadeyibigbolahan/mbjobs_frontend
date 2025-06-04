import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
// import Typed from 'react-typed';
import herobg from "../assets/herobg.jpg";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="overflow-hidden mx-16 rounded-2xl">
      <div className="relative w-full md:h-screen overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${herobg})` }}
        ></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-start w-full h-full p-4">
          <div className="gap-8 md:w-[60%] w-full text-center flex flex-col justify-center p-3">
            <h1 className="font-kanit md:text-start md:text-6xl text-3xl font-bold md:py-3 text-white">
              <span className="font-light">Connect.</span>
              <br />
              Learn. Grow.
            </h1>

            <p className="md:text-xl text-lg font-light md:text-start text-center text-white">
              Find your next opportunity or train for your dream job. A platform
              that connects employers and apprentices, and empowers learning
              through practical courses.
            </p>

            <div className="w-full flex md:justify-start justify-center items-center md:items-start gap-3">
              <Link to="/signup">
                <Button>Get Started as an Apprentice</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#FFB23B]">
                  Post a Job as an Employer
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
