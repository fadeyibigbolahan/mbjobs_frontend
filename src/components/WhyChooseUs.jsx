import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { CircleCheckBig } from "lucide-react";

import card from "../assets/card.jpg";
import automatedCommunication from "../assets/automated_communication.jpg";
import wallet from "../assets/wallet.jpg";
import analysis from "../assets/analysis.jpg";
import qrcode from "../assets/qrcode.jpg";
import membershipPlan from "../assets/membership_plan.jpg";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Sign Up for Free",
      description:
        "Whether you’re an apprentice or an employer, registration is simple.",
    },
    {
      title: "Browse or Post Opportunities",
      description:
        "Apprentices can explore job listings, employers can post job openings.",
    },
    {
      title: "Apply or Hire with Confidence",
      description:
        "Built-in messaging and application management make the process seamless.",
    },
    {
      title: "Learn & Level Up",
      description:
        "Access career-building courses designed to give apprentices real skills.",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [images.length]);

  return (
    <div className="flex flex-col py-8 justify-center items-center gap-3 px-16 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-10 justify-center">
        {/* Left column */}
        <div className="w-[80%]">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-auto transition-opacity duration-1000 ease-in-out opacity-0 animate-fade-in"
          />
        </div>

        {/* Right column */}
        <div className="space-y-1">
          {features.map((feature, index) => (
            <div className="flex bg-white flex-col text-[#003366]" key={index}>
              <div className="flex items-center justify-start gap-3 p-2 rounded-t-md">
                <CircleCheckBig className="h-6 w-6" />
                <h4 className="font-kanit text-lg font-semibold">
                  {feature.title}
                </h4>
              </div>
              <div className="flex items-center justify-between p-2 border-t border-gray-300 text-sm">
                <p className="">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
