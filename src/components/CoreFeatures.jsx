import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { BadgeCheckIcon } from "lucide-react";

import card from "../assets/card.jpg";
import automatedCommunication from "../assets/automated_communication.jpg";
import wallet from "../assets/wallet.jpg";
import analysis from "../assets/analysis.jpg";
import qrcode from "../assets/qrcode.jpg";
import membershipPlan from "../assets/membership_plan.jpg";

const CoreFeatures = () => {
  const features = [
    {
      title: "Digital Membership Cards",
    },
    {
      title: "Built-In Wallet System",
    },
    {
      title: "QR Code Verification",
    },
    {
      title: "Automated Communication",
    },
    {
      title: "Member Analytics",
    },
    {
      title: "Flexible Membership Plans",
    },
  ];

  const images = [
    card,
    automatedCommunication,
    wallet,
    analysis,
    qrcode,
    membershipPlan,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="flex flex-col p-8 py-16 justify-center bg-[#FFFFFF] items-center gap-3 md:px-16 px-4 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full">
        {/* Left column */}
        <div className="flex flex-col w-full md:w-[60%] md:justify-start md:items-start justify-center items-center space-y-6">
          <p className="bg-[#003366 0] p-1 px-2 rounded-lg text-[#FFFFFF]">
            Key Benefits
          </p>
          <h2 className="font-kanit text-3xl font-bold text-center text-[#003366 ]">
            Smarter Features, Better Results
          </h2>
          <p className="md:text-start text-[#003366 ] font-light text-center">
            Our platform is packed with intelligent, user-friendly features
            designed to simplify your workflow, boost member engagement, and
            help your organization grow with confidence.
          </p>
          <div className="grid md:grid-cols-2 md:gap-10 gap-5">
            <div className="flex flex-col gap-4">
              {leftFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-4 p-2"
                >
                  <div className="flex items-center justify-center rounded-full bg-[#EAEDFF] p-2">
                    <BadgeCheckIcon className="h-6 w-6 text-[#003366 ]" />
                  </div>
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
                <div
                  key={index}
                  className="flex items-center justify-start gap-4 p-2"
                >
                  <div className="flex items-center justify-center rounded-full bg-[#EAEDFF] p-2">
                    <BadgeCheckIcon className="h-6 w-6 text-[#003366 ]" />
                  </div>
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
        {/* Right column */}
        <div className="flex flex-col w-full md:w-[40%] justify-start items-start space-y-6">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-auto transition-opacity duration-1000 ease-in-out opacity-0 animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
};

export default CoreFeatures;
