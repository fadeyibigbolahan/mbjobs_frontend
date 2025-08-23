import React from "react";
import WhyChooseUs from "../components/WhyChooseUs";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import ForWho from "../components/ForWho";
import CoreFeatures from "../components/CoreFeatures";
import HowItWorks from "../components/HowItWorks";
import CallToAction from "../components/CallToAction";
import CopyRight from "../components/CopyRight";
import TrustedBy from "@/components/TrustedBy";
import TopCategories from "@/components/TopCategories";

function HomePage() {
  return (
    <div className="w-full">
      <div className="sticky top-0 z-50 bg-[#FFFFFF]">
        <Navbar />
      </div>
      <Hero />
      <TrustedBy />
      <WhyChooseUs />
      <TopCategories />
      <CoreFeatures />
      {/* <ForWho /> */}
      {/* <HowItWorks /> */}
      <CallToAction />
      <Footer />
    </div>
  );
}

export default HomePage;
