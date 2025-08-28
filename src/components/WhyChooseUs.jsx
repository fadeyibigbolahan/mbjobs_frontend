import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { CircleCheckBig } from "lucide-react";

import card from "../assets/card.jpg";
import automatedCommunication from "../assets/automated_communication.jpg";
import wallet from "../assets/wallet.jpg";
import analysis from "../assets/analysis.jpg";
import qrcode from "../assets/qrcode.jpg";
import membershipPlan from "../assets/membership_plan.jpg";
import employer from "../assets/employer.jpg";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Sign Up for Free",
      description:
        "Whether you're an apprentice or an employer, registration is simple.",
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
    <div className="flex flex-col py-8 sm:py-12 lg:py-16 justify-center items-center gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
      {/* Optional section header */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-kanit font-bold text-[#003366] mb-2">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          Discover how our platform makes connecting employers and apprentices
          seamless
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 w-full max-w-6xl">
        {/* Image section - comes first on mobile, left on desktop */}
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
          <img
            src={employer}
            alt="Employer and apprentice collaboration"
            className="w-full h-auto object-cover transition-opacity duration-1000 ease-in-out"
          />
        </div>

        {/* Features section - comes second on mobile, right on desktop */}
        <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4">
          {features.map((feature, index) => (
            <div
              className="flex flex-col bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-[#003366] border border-gray-100"
              key={index}
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4">
                <CircleCheckBig className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                <div className="flex-1">
                  <h4 className="font-kanit text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
