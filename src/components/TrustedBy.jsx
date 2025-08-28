import React from "react";
import logoipsum from "../assets/virtual.png";

const TrustedBy = () => {
  const partners = [
    { name: "Google", logo: logoipsum },
    { name: "Microsoft", logo: logoipsum },
    { name: "LinkedIn", logo: logoipsum },
    { name: "Coursera", logo: logoipsum },
    { name: "Shopify", logo: logoipsum },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        <div className="flex justify-center items-center flex-col gap-2">
          <h2 className="text-gray-800 text-2xl font-semibold">
            Trusted by leading employers & partners
          </h2>
          <p className="text-center text-gray-700">
            ⭐⭐⭐⭐⭐ Join 1,000,000+ job seekers who use{" "}
            <span className="font-semibold">MB Jobs</span>
          </p>
        </div>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-6 grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default TrustedBy;
