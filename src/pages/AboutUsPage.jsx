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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#014681]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#339BB8]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div
            className={`relative container mx-auto px-6 py-20 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#339BB8] to-white bg-clip-text text-transparent">
                Connecting Dreams with Opportunities
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                We're revolutionizing how talent meets opportunity through
                intelligent matching, creating meaningful connections that
                transform careers and companies.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-[#339BB8]/30">
                  🚀 AI-Powered
                </span>
                <span className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-[#339BB8]/30">
                  ⚡ Lightning Fast
                </span>
                <span className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-[#339BB8]/30">
                  🎯 Perfect Matches
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div
                className={`transform transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#014681] to-[#339BB8] bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-lg text-black mb-6 leading-relaxed">
                  Every person deserves a career that ignites their passion.
                  Every company deserves talent that drives their vision. We
                  bridge this gap with cutting-edge technology and human
                  insight.
                </p>
                <p className="text-lg text-black leading-relaxed">
                  Our platform doesn't just match resumes to job descriptions—we
                  understand aspirations, company culture, growth potential, and
                  the intangible elements that make careers fulfilling.
                </p>
                <div className="mt-8 flex items-center space-x-4">
                  <CheckCircle className="text-black w-6 h-6" />
                  <span className="text-black">
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
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-[#339BB8]/20">
                    {/* Hero Image */}
                    <div className="mb-8 relative h-48 rounded-2xl bg-gradient-to-br from-[#014681] via-[#339BB8] to-[#014681] overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-4 opacity-30">
                          <Briefcase className="w-12 h-12 text-white animate-pulse" />
                          <Building className="w-12 h-12 text-white animate-pulse delay-300" />
                          <Users className="w-12 h-12 text-white animate-pulse delay-600" />
                          <Globe className="w-12 h-12 text-white animate-pulse delay-900" />
                          <Rocket className="w-12 h-12 text-white animate-pulse delay-1200" />
                          <Target className="w-12 h-12 text-white animate-pulse delay-1500" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <h3 className="text-white font-semibold">
                          Connecting Global Talent
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
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
                          <div className="text-3xl font-bold bg-gradient-to-r from-[#014681] to-[#339BB8] bg-clip-text text-transparent mb-2">
                            {stat.number}
                          </div>
                          <div className="text-gray-400 text-sm">
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
        <div className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#339BB8] to-[#014681] bg-clip-text text-transparent">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the future of job matching with features designed to
                understand both you and the opportunities that await.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeFeature === index;
                return (
                  <div
                    key={index}
                    className={`group relative p-8 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                      isActive
                        ? "bg-gradient-to-br from-[#014681]/20 to-[#339BB8]/20 border-[#339BB8]/50 shadow-2xl shadow-[#014681]/25"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    } backdrop-blur-sm border`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div
                      className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-[#014681] to-[#339BB8]"
                          : "bg-white/10 group-hover:bg-[#339BB8]/20"
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#339BB8] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {feature.desc}
                    </p>
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#014681]/10 to-[#339BB8]/10 animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Process/Journey Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#339BB8] to-[#014681] bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto">
                Our streamlined process connects talent with opportunity in just
                a few simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
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
                    <div className="relative mx-auto mb-8">
                      <div
                        className={`w-32 h-32 rounded-full bg-gradient-to-br ${item.color} p-1 mx-auto`}
                      >
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                          <Icon className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#339BB8] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-black">
                      {item.title}
                    </h3>
                    <p className="text-black">{item.desc}</p>

                    {index < 2 && (
                      <div className="hidden md:block absolute top-16 left-full w-full">
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
        <div className="py-20 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#014681] to-[#339BB8] bg-clip-text text-transparent">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Passionate professionals dedicated to revolutionizing the job
                market through innovation and empathy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                        className={`w-full h-80 rounded-2xl bg-gradient-to-br ${member.bg} opacity-80 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden`}
                      >
                        {/* Profile Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8">
                            <Icon className="w-12 h-12 text-white" />
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/10 blur-lg"></div>
                      </div>

                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {member.name}
                        </h3>
                        <p className="text-gray-200 text-sm mb-2">
                          {member.role}
                        </p>
                        <p className="text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        <div className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#014681] via-[#339BB8] to-[#014681] bg-clip-text text-transparent">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Join millions who've discovered their perfect match. Whether
                you're seeking your next opportunity or looking for exceptional
                talent, your journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#014681] to-[#339BB8] rounded-xl font-semibold text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#014681]/25">
                  <span className="relative z-10">Find Your Dream Job</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#339BB8] to-[#014681] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group px-8 py-4 border-2 border-[#339BB8]/30 rounded-xl font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#339BB8] hover:bg-[#339BB8]/10">
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
