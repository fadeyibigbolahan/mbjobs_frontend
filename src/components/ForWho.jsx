import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { BadgeCheckIcon } from "lucide-react";

import businessPeople from "../assets/business_people.jpg";
import ngo from "../assets/ngo.jpg";
import fitness from "../assets/fitness.jpg";
import faith from "../assets/faith.jpg";
import alumni from "../assets/alumni.jpg";
import graduate from "../assets/graduate.jpg";

const ForWho = () => {
  const images = [businessPeople, ngo, fitness, faith, alumni, graduate];

  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    {
      title: "Alumni Networks",
    },
    {
      title: " Fitness Centers",
    },
    {
      title: "Associations & Clubs",
    },
    {
      title: "Faith Groups",
    },
    {
      title: "NGOs & Foundations",
    },
    {
      title: "Professional Bodies",
    },
  ];

  const leftFeatures = features.slice(0, 3);
  const rightFeatures = features.slice(3, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [images.length]);

  return (
    <div className="flex flex-col p-8 py-16 justify-center bg-gradient-to-l from-[#EAEDFF] to-[#FFFFFF] items-center gap-3 md:px-16 p-4 overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 w-full">
        {/* Right column */}
        <div className="flex flex-col w-full md:w-[40%] md:justify-start md:items-start justify-center items-center space-y-6">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-auto transition-opacity duration-1000 ease-in-out opacity-0 animate-fade-in"
          />
        </div>
        {/* Left column */}
        <div className="flex flex-col w-full md:w-[60%] md:justify-start md:items-start justify-center items-center space-y-6">
          <p className="bg-[#003366 0] p-1 px-2 rounded-lg text-[#FFFFFF]">
            Ideal For Every Groups
          </p>
          <h2 className="font-kanit text-3xl font-bold text-center text-[#003366 ]">
            Built With You in Mind
          </h2>
          <p className="md:text-start text-center text-[#003366 ] font-light">
            Whether you're a growing nonprofit, a professional association, or a
            local club, our platform adapts to your needs — making it easy to
            manage members, streamline communication, and scale with confidence.
          </p>
          <div className="grid md:grid-cols-2 md:gap-10 gap-5">
            <div className="flex flex-col gap-4">
              {leftFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-2">
                  <BadgeCheckIcon className="h-6 w-6 text-[#003366 ]" />
                  <div>
                    <h3 className="text-md font-semibold text-[#003366 ]">
                      {feature.title}
                    </h3>
                    {/* <p className="text-sm text-gray-600">{feature.description}</p> */}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {rightFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-2">
                  <BadgeCheckIcon className="h-6 w-6 text-[#003366 ]" />
                  <div>
                    <h3 className="text-md font-semibold text-[#003366 ]">
                      {feature.title}
                    </h3>
                    {/* <p className="text-sm text-gray-600">{feature.description}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForWho;
