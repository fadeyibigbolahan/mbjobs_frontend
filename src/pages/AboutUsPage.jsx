import React, { useState, useEffect } from "react";
import {
  Users,
  Target,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Heart,
  CheckCircle,
  Briefcase,
  Building,
  Globe,
  Rocket,
  Menu,
  X,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Target,
      title: "AI-Powered Matching",
      desc: "Smart algorithms connect you with perfect opportunities",
    },
    {
      icon: Zap,
      title: "Instant Connections",
      desc: "Real-time matching for immediate opportunities",
    },
    {
      icon: Shield,
      title: "Verified Companies",
      desc: "All employers thoroughly vetted for your safety",
    },
    {
      icon: Award,
      title: "Skill Recognition",
      desc: "Your talents highlighted and valued",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      desc: "Tools and insights for professional development",
    },
    {
      icon: Heart,
      title: "Personal Touch",
      desc: "Human support when you need it most",
    },
  ];

  const stats = [
    { number: "500K+", label: "Jobs Matched", delay: "delay-100" },
    { number: "50K+", label: "Companies", delay: "delay-200" },
    { number: "2M+", label: "Job Seekers", delay: "delay-300" },
    { number: "95%", label: "Success Rate", delay: "delay-400" },
  ];

  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      bg: "from-[#014681] to-[#339BB8]",
      icon: Users,
      description: "Visionary leader with 15+ years in HR tech",
    },
    {
      name: "John Smith",
      role: "CTO",
      bg: "from-[#339BB8] to-[#014681]",
      icon: Zap,
      description: "Tech innovator specializing in AI matching",
    },
    {
      name: "Jane Doe",
      role: "Head of Product",
      bg: "from-[#014681] via-[#339BB8] to-[#014681]",
      icon: Target,
      description: "Product strategist focused on user experience",
    },
    {
      name: "David Doe",
      role: "Head of Engineering",
      bg: "from-[#339BB8] via-[#014681] to-[#339BB8]",
      icon: Rocket,
      description: "Engineering leader building scalable solutions",
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 bg-[#FFFFFF]">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#014681] to-slate-900 text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#014681]/30 to-[#339BB8]/30"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-[#014681]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-[#339BB8]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div
            className={`relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-[#339BB8] to-white bg-clip-text text-transparent leading-tight">
                Connecting Dreams with Opportunities
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
                We're revolutionizing how talent meets opportunity through
                intelligent matching, creating meaningful connections that
                transform careers and companies.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <span className="px-3 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-[#339BB8]/30">
                  🚀 AI-Powered
                </span>
                <span className="px-3 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-[#339BB8]/30">
                  ⚡ Lightning Fast
                </span>
                <span className="px-3 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-[#339BB8]/30">
                  🎯 Perfect Matches
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div
                className={`transform transition-all duration-1000 delay-300 text-center lg:text-left ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#014681] to-[#339BB8] bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg text-black mb-4 sm:mb-6 leading-relaxed">
                  Every person deserves a career that ignites their passion.
                  Every company deserves talent that drives their vision. We
                  bridge this gap with cutting-edge technology and human
                  insight.
                </p>
                <p className="text-base sm:text-lg text-black leading-relaxed mb-6 sm:mb-8">
                  Our platform doesn't just match resumes to job descriptions—we
                  understand aspirations, company culture, growth potential, and
                  the intangible elements that make careers fulfilling.
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                  <CheckCircle className="text-black w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="text-black text-sm sm:text-base">
                    Trusted by industry leaders worldwide
                  </span>
                </div>
              </div>

              <div
                className={`relative transform transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-3xl blur-xl opacity-30"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#339BB8]/20">
                    {/* Hero Image */}
                    <div className="mb-6 sm:mb-8 relative h-32 sm:h-40 lg:h-48 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#014681] via-[#339BB8] to-[#014681] overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 opacity-30">
                          <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white animate-pulse" />
                          <Building className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white animate-pulse delay-300" />
                          <Users className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white animate-pulse delay-600" />
                          <Globe className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white animate-pulse delay-900" />
                          <Rocket className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white animate-pulse delay-1200" />
                          <Target className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white animate-pulse delay-1500" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-center">
                        <h3 className="text-white font-semibold text-sm sm:text-base">
                          Connecting Global Talent
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                      {stats.map((stat, index) => (
                        <div
                          key={index}
                          className={`text-center transform transition-all duration-1000 ${
                            stat.delay
                          } ${
                            isVisible
                              ? "scale-100 opacity-100"
                              : "scale-90 opacity-0"
                          }`}
                        >
                          <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#014681] to-[#339BB8] bg-clip-text text-transparent mb-1 sm:mb-2">
                            {stat.number}
                          </div>
                          <div className="text-gray-400 text-xs sm:text-sm">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#339BB8] to-[#014681] bg-clip-text text-transparent">
                Why Choose Us
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-2">
                Experience the future of job matching with features designed to
                understand both you and the opportunities that await.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeFeature === index;
                return (
                  <div
                    key={index}
                    className={`group relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                      isActive
                        ? "bg-gradient-to-br from-[#014681]/20 to-[#339BB8]/20 border-[#339BB8]/50 shadow-2xl shadow-[#014681]/25"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    } backdrop-blur-sm border`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl mb-4 sm:mb-6 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-[#014681] to-[#339BB8]"
                          : "bg-white/10 group-hover:bg-[#339BB8]/20"
                      }`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-[#339BB8] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm sm:text-base">
                      {feature.desc}
                    </p>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#014681]/10 to-[#339BB8]/10 animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Process/Journey Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#339BB8] to-[#014681] bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-black max-w-3xl mx-auto px-2">
                Our streamlined process connects talent with opportunity in just
                a few simple steps.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
              {[
                {
                  step: "01",
                  title: "Create Profile",
                  desc: "Tell us about your skills, experience, and career goals",
                  icon: Users,
                  color: "from-[#014681] to-[#339BB8]",
                },
                {
                  step: "02",
                  title: "Get Matched",
                  desc: "Our AI analyzes thousands of opportunities to find your perfect fit",
                  icon: Target,
                  color: "from-[#339BB8] to-[#014681]",
                },
                {
                  step: "03",
                  title: "Start Working",
                  desc: "Connect with employers and begin your dream career journey",
                  icon: Rocket,
                  color: "from-[#014681] via-[#339BB8] to-[#014681]",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="group relative text-center">
                    <div className="relative mx-auto mb-6 sm:mb-8">
                      <div
                        className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br ${item.color} p-1 mx-auto`}
                      >
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                          <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#339BB8] rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">
                      {item.title}
                    </h3>
                    <p className="text-black text-sm sm:text-base px-2">
                      {item.desc}
                    </p>

                    {index < 2 && (
                      <div className="hidden lg:block absolute top-12 lg:top-16 left-full w-full">
                        <div className="w-full h-0.5 bg-gradient-to-r from-[#339BB8] to-transparent"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-black/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#014681] to-[#339BB8] bg-clip-text text-transparent">
                Meet Our Team
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-2">
                Passionate professionals dedicated to revolutionizing the job
                market through innovation and empathy.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {teamMembers.map((member, index) => {
                const Icon = member.icon;
                return (
                  <div
                    key={index}
                    className={`group relative transform transition-all duration-500 hover:scale-105 delay-${
                      index * 100
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`w-full h-64 sm:h-72 lg:h-80 rounded-xl sm:rounded-2xl bg-gradient-to-br ${member.bg} opacity-80 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden`}
                      >
                        {/* Profile Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 sm:mb-8">
                            <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 blur-xl"></div>
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/10 blur-lg"></div>
                      </div>

                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center">
                        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">
                          {member.name}
                        </h3>
                        <p className="text-gray-200 text-sm mb-1 sm:mb-2">
                          {member.role}
                        </p>
                        <p className="text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#014681] via-[#339BB8] to-[#014681] bg-clip-text text-transparent">
                Ready to Transform Your Career?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed px-2">
                Join millions who've discovered their perfect match. Whether
                you're seeking your next opportunity or looking for exceptional
                talent, your journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-lg mx-auto">
                <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#014681] to-[#339BB8] rounded-xl font-semibold text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#014681]/25 text-sm sm:text-base">
                  <span className="relative z-10">Find Your Dream Job</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#339BB8] to-[#014681] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#339BB8]/30 rounded-xl font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#339BB8] hover:bg-[#339BB8]/10 text-sm sm:text-base">
                  Post a Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
