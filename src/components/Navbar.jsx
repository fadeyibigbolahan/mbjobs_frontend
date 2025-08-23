import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import virtual from "../assets/virtual.png";
import { Button } from "./ui/button";
import { Mail, Smartphone, MoveRight } from "lucide-react";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto md:px-16 px-4 text-[#003366] font-[500] bg-white">
      <Link to="/">
        <img src={virtual} alt="fagis" style={{ width: "50px" }} />
      </Link>
      <ul className="hidden md:flex">
        <Link to="/">
          <li className="p-4 py-2 cursor-pointer font-semibold hover:border-b-2 border-[#003366] text-sm">
            Features
          </li>
        </Link>
        <Link to="/about">
          <li className="p-4 py-2 cursor-pointer font-semibold hover:border-b-2 border-[#003366] text-sm">
            Company
          </li>
        </Link>
        <Link to="/pricing">
          <li className="p-4 py-2 cursor-pointer font-semibold hover:border-b-2 border-[#003366] text-sm">
            Pricing
          </li>
        </Link>
        <Link to="/faqs">
          <li className="p-4 py-2 cursor-pointer font-semibold hover:border-b-2 border-[#003366] text-sm">
            FAQs
          </li>
        </Link>
        <Link to="/contact">
          <li className="p-4 py-2 cursor-pointer font-semibold hover:border-b-2 border-[#003366] text-sm">
            Contact Us
          </li>
        </Link>
      </ul>
      <div className="hidden md:flex justify-center items-center gap-2">
        <Link to="/signin">
          <p className="p-4 font-semibold">Login</p>
        </Link>
        <Link to="/signup">
          <Button>
            Sign up <MoveRight />
          </Button>
        </Link>
      </div>
      <div onClick={handleNav} className="md:hidden p-3 rounded-full">
        <AiOutlineMenu size={20} />
      </div>
      <div
        className={
          nav
            ? "flex flex-row fixed left-0 top-0 w-[100%] h-full border-r bg-[#00000050] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <div className="flex w-[70%] bg-white flex-col  p-4 h-full">
          <div className="flex flex-row justify-between items-center w-full mb-4">
            <Link to="/">
              <img src={virtual} alt="fagis" style={{ width: "120px" }} />
            </Link>
            <AiOutlineClose size={20} onClick={handleNav} />
          </div>
          <ul>
            <Link to="/">
              <li className="py-2">Features</li>
            </Link>
            <Link to="">
              <li className="py-2">Company</li>
            </Link>
            <Link to="">
              <li className="py-2">Pricing</li>
            </Link>
            <Link to="">
              <li className="py-2">FAQs</li>
            </Link>
            <Link to="">
              <li className="py-2">Contact Us</li>
            </Link>
          </ul>
          <div className="flex flex-col justify-between mt-2 flex-wrap items-start gap-3">
            <Link to="/signin">
              <p>Login</p>
            </Link>
            <Link to="/signup">
              <Button>
                Sign up <MoveRight />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col mt-8">
            <p className="py-3">Contact Us</p>
            <div className="flex flex-col gap-3">
              <p className="flex flex-row justify-start items-center gap-2 text-sm">
                <Mail size={18} /> info@fagis.io
              </p>
              <p className="flex flex-row justify-start items-center gap-2 text-sm">
                <Smartphone size={18} /> +1 (234) 567-890
              </p>
            </div>
          </div>
        </div>
        <div onClick={handleNav} className="flex w-[30%] h-full"></div>
      </div>
    </div>
  );
};

export default Navbar;
