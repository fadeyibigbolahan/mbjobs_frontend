import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { BadgeCheckIcon } from "lucide-react";
import bluewhite from "../assets/bluewhite.jpg";

const CallToAction = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bluewhite})` }}
      className="flex flex-col p-8 py-16 justify-center items-center gap-3 md:px-16 px-4 overflow-hidden bg-cover bg-center"
    >
      <div className="flex justify-between items-center flex-col md:flex-row gap-10">
        {/* Left column */}
        <div className="flex flex-col md:w-[60%] w-full justify-start items-start space-y-6">
          <p className="md:text-start text-center text-[#003366 ]">
            Join hundreds of modern organizations using Fagis.
          </p>
          <h2 className="font-kanit text-3xl font-bold text-[#003366 ] text-center md:text-start">
            Ready to simplify your membership management?
          </h2>
        </div>
        {/* Right column */}
        <div className="flex md:justify-end justify-center md:w-[40%] w-full  items-center space-y-6">
          <button className=" rounded bg-[#003366 ] p-2 text-white hover:bg-[#7A54A1] flex justify-center items-center">
            Create free account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
