import React from "react";
import Navbar from "../components/Navbar";
import laptop from "../assets/laptop.png";

const FeaturesPage = () => {
  return (
    <div className="w-full">
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#EAEDFF] to-[#FFFFFF]">
        <Navbar />
      </div>
      <div className="w-full flex flex-col justify-center items-center bg-gradient-to-r from-[#EAEDFF] to-[#FFFFFF] p-4 pb-0">
        <h1 className="font-kanit md:text-6xl text-center text-3xl font-bold md:py-3 text-[#003366 ] w-full md:w-[70%]">
          <span className="font-light text-center">
            All the tools you need to
          </span>
          <br />
          power modern membership experiences
        </h1>

        <p className="md:text-lg text-sm font-light text-center w-full md:w-[70%]">
          Managing members, hosting events, collecting payments, and building
          community should be simple—not scattered across a dozen apps. Our
          platform brings everything you need into one powerful, easy-to-use
          dashboard. Whether you're running a church, club, nonprofit, school,
          or professional network, we've built the infrastructure to help you:
        </p>
        <div className="flex justify-center items-center w-full md:w-[60%] m-5 mb-0 p-4">
          <img src={laptop} alt="" srcset="" />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center bg-[#FFFFFF] p-4">
        <p className="text-center text-lg md:py-3 text-[#003366 ]">Features</p>
        <p className="font-kanit font-bold md:text-xl text-sm text-center w-full md:w-[70%]">
          Enjoy the Unparallel features of Fagis.
        </p>
      </div>
      <div className="w-full flex md:flex-row flex-col justify-center items-center p-4">
        <div className="flex justify-center items-center w-full md:w-[40%] p-4">
          <img src={laptop} alt="" srcset="" />
        </div>
        <div className="flex justify-center items-center w-full md:w-[40%] p-4 bg-red-500"></div>
      </div>
    </div>
  );
};

export default FeaturesPage;
