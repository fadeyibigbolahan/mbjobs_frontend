import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { BadgeCheckIcon } from "lucide-react";
import createOrg from "../assets/CreateOrg.jpg";
import onboard from "../assets/onboard.jpg";
import manage from "../assets/manage.jpg";

const HowItWorks = () => {
  const features = [
    {
      title: "Create Your Organization",
      description:
        "Sign up, customize your branding, and set your membership tiers in minutes.",
      img: createOrg,
    },
    {
      title: "Onboard Your Members",
      description:
        "Invite members manually or via import. Let them register online, get verified, and join instantly.",
      img: onboard,
    },
    {
      title: "Manage And Grow",
      description:
        "Track renewals, send updates, collect payments, and issue digital membership cards with QR codes.",
      img: manage,
    },
  ];

  const leftFeatures = features.slice(0, 3);

  return (
    <div className="flex bg-white flex-col p-8 py-16 justify-center items-center gap-3 px-16 overflow-hidden">
      <div className="flex flex-col items-center mb-8 w-full md:w-1/2 gap-2">
        <p className="bg-[#003366 0] p-1 px-2 rounded-lg text-white">
          How It Works
        </p>
        <h2 className="font-kanit text-3xl font-bold text-center text-[#003366 ]">
          The Smart Choice for Organizations
        </h2>
        <p className="text-center text-[#003366 ] font-light">
          We simplify how organizations manage their members, issue digital
          cards, handle payments, and scale — all with a secure, flexible, and
          easy-to-use platform designed to grow with you.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        {leftFeatures.map((feature, index) => (
          <div
            className="flex rounded-md md:w-1/3 w-full bg-slate-200 border border-slate-300 p-4 flex-col text-[#000000]"
            key={index}
          >
            <h4 className="font-kanit text-xl font-semibold text-center">
              {feature.title}
            </h4>
            <div className="flex items-center justify-between p-4">
              <p className="text-center text-normal">{feature.description}</p>
            </div>
            <div className="flex justify-center items-center w-full h-[250px] bg-white rounded-md">
              <img
                src={feature.img}
                alt={feature.title}
                className="object-strech h-full w-full rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
