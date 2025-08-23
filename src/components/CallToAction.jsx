import React, { useState } from "react";

const CallToAction = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const stats = [
    { number: "50,000+", label: "Job Opportunities", icon: "💼" },
    { number: "500+", label: "Learning Courses", icon: "📚" },
    { number: "10,000+", label: "Success Stories", icon: "🏆" },
    { number: "1,000+", label: "Partner Companies", icon: "🤝" },
  ];

  const testimonials = [
    {
      text: "Found my dream job in just 2 weeks through their smart matching system!",
      author: "Jessica Chen",
      role: "Software Engineer",
      company: "TechCorp",
      avatar: "👩‍💻",
    },
    {
      text: "The apprenticeship program gave me real skills and a guaranteed job placement.",
      author: "Marcus Johnson",
      role: "Electrical Apprentice",
      company: "PowerTech Solutions",
      avatar: "👷‍♂️",
    },
    {
      text: "Career coaching and skill assessments helped me level up my professional game.",
      author: "Priya Patel",
      role: "Marketing Manager",
      company: "GrowthCo",
      avatar: "👩‍💼",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#014681] via-[#014681] to-[#349BB8] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#349BB8]/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold text-white/90 mb-6 border border-white/20">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Join 100,000+ Career Builders
          </div>

          <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
            Your Dream Career
            <span className="block text-transparent bg-gradient-to-r from-white to-[#349BB8] bg-clip-text">
              Starts Here Today
            </span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
            Don't wait for opportunity to find you. Take control of your future
            with our AI-powered job matching, world-class apprenticeship
            programs, and direct access to top employers.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button
              className="group relative px-10 py-5 bg-white text-[#014681] font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 min-w-[200px]"
              onMouseEnter={() => setHoveredButton("primary")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <span className="flex items-center justify-center gap-3">
                🚀 Start Your Journey
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
              {hoveredButton === "primary" && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#349BB8]/10 to-[#014681]/10 rounded-2xl"></div>
              )}
            </button>

            <button
              className="group px-10 py-5 border-2 border-white/30 text-white font-bold text-lg rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/50 min-w-[200px]"
              onMouseEnter={() => setHoveredButton("secondary")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <span className="flex items-center justify-center gap-3">
                🎥 Watch Demo
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center text-white/70 text-sm">
            ✅ Free to start • ✅ No credit card required • ✅ 24/7 support
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof - Testimonials */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Hear From Our Success Stories
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-white/70 text-xs">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="text-white/90 text-sm leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {"⭐".repeat(5)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Push */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-white/10 to-[#349BB8]/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who've accelerated their careers
              with our platform. Your future self will thank you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-[#349BB8] to-white text-[#014681] font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  🎯 Find My Perfect Job
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
              <button className="group px-8 py-4 bg-gradient-to-r from-white to-[#349BB8] text-[#014681] font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  📚 Explore Apprenticeships
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
