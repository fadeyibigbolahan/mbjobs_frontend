import React, { useState } from "react";

const CoreFeatures = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: "matching",
      title: "Smart Job Matching",
      subtitle: "AI-Powered Career Connections",
      description:
        "Our advanced machine learning algorithm analyzes your skills, experience, and career goals to connect you with the perfect opportunities. Get matched with jobs that truly fit your profile.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      stats: [
        { number: "94%", label: "Match Accuracy" },
        { number: "2.5x", label: "Faster Hiring" },
        { number: "50k+", label: "Active Jobs" },
      ],
      features: [
        "Personality & culture fit analysis",
        "Skills gap identification",
        "Salary range optimization",
        "Location preference matching",
      ],
    },
    {
      id: "apprenticeship",
      title: "Apprenticeship Programs",
      subtitle: "Learn While You Earn",
      description:
        "Bridge the gap between education and employment with our comprehensive apprenticeship programs. Work with industry leaders while building real-world skills that employers value.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      stats: [
        { number: "500+", label: "Partner Companies" },
        { number: "85%", label: "Job Placement Rate" },
        { number: "200+", label: "Course Options" },
      ],
      features: [
        "Industry-certified programs",
        "Mentorship from experts",
        "Paid apprenticeship opportunities",
        "Career progression pathways",
      ],
    },
    {
      id: "assessment",
      title: "Skills Assessment",
      subtitle: "Know Your Strengths",
      description:
        "Comprehensive skill evaluations that identify your strengths and growth areas. Get detailed insights into your technical abilities, soft skills, and career readiness.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      stats: [
        { number: "25+", label: "Skill Categories" },
        { number: "1M+", label: "Assessments Taken" },
        { number: "98%", label: "Accuracy Rate" },
      ],
      features: [
        "Technical skill validation",
        "Behavioral assessments",
        "Industry benchmarking",
        "Personalized improvement plans",
      ],
    },
    {
      id: "connect",
      title: "Employer Connect",
      subtitle: "Direct Access to Top Employers",
      description:
        "Connect directly with hiring managers and recruiters from leading companies. Skip the traditional application process and start meaningful conversations about your career.",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      stats: [
        { number: "10k+", label: "Active Employers" },
        { number: "24hr", label: "Average Response" },
        { number: "73%", label: "Interview Rate" },
      ],
      features: [
        "Verified employer profiles",
        "Real-time messaging",
        "Video interview scheduling",
        "Application status tracking",
      ],
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#014681]/10 to-[#349BB8]/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-[#014681] mb-4 sm:mb-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#014681] to-[#349BB8] rounded-full animate-pulse"></div>
            Core Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Transforming Careers
            <span className="block bg-gradient-to-r from-[#014681] to-[#349BB8] bg-clip-text text-transparent">
              One Connection at a Time
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            Experience the future of career development with our integrated
            platform that combines intelligent matching, world-class education,
            and direct employer connections.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(index)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300 ${
                activeTab === index
                  ? "bg-gradient-to-r from-[#014681] to-[#349BB8] text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#014681]"
              }`}
            >
              <span className="block sm:hidden">
                {feature.title.split(" ")[0]}
              </span>
              <span className="hidden sm:block">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Active Feature Display */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center order-2 lg:order-1">
              <div className="mb-4 sm:mb-6">
                <div className="text-xs sm:text-sm font-semibold text-[#349BB8] mb-1 sm:mb-2 tracking-wide uppercase">
                  {features[activeTab].subtitle}
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight">
                  {features[activeTab].title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  {features[activeTab].description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                {features[activeTab].stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#014681] to-[#349BB8] bg-clip-text text-transparent mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {features[activeTab].features.map((feature, index) => (
                  <div key={index} className="flex items-start sm:items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#014681] to-[#349BB8] rounded-full mr-3 sm:mr-4 flex-shrink-0 mt-1.5 sm:mt-0"></div>
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#014681] to-[#349BB8] text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="flex items-center justify-center gap-2">
                    Get Started
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#014681] text-[#014681] text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:bg-[#014681] hover:text-white">
                  Learn More
                </button>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative overflow-hidden h-64 sm:h-80 lg:h-auto order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#014681]/20 to-[#349BB8]/20 z-10"></div>
              <img
                src={features[activeTab].image}
                alt={features[activeTab].title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/60 to-transparent z-20">
                <div className="text-white">
                  <div className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2">
                    Featured Success Story
                  </div>
                  <div className="text-sm sm:text-base font-semibold leading-tight">
                    "This platform changed my career trajectory completely"
                  </div>
                  <div className="text-xs sm:text-sm opacity-75 mt-1">
                    - Sarah M., Software Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Mini Features */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-4">
            Plus These Powerful Tools
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: "📚",
                title: "Learning Hub",
                desc: "500+ courses and resources",
              },
              {
                icon: "🚀",
                title: "Career Coaching",
                desc: "1-on-1 expert guidance",
              },
              {
                icon: "📊",
                title: "Progress Tracking",
                desc: "Detailed analytics dashboard",
              },
              {
                icon: "🏆",
                title: "Certifications",
                desc: "Industry-recognized credentials",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-[#014681]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
