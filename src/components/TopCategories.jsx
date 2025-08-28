import React, { useState } from "react";

const categories = [
  {
    icon: "🔧",
    title: "Engineering & Technical",
    count: "2.4k+ jobs",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "💻",
    title: "IT & Software",
    count: "3.8k+ jobs",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "📢",
    title: "Sales & Marketing",
    count: "1.9k+ jobs",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: "🎨",
    title: "Creative & Design",
    count: "1.2k+ jobs",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: "🛠",
    title: "Skilled Trades",
    count: "890+ jobs",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: "🏥",
    title: "Healthcare & Support",
    count: "2.1k+ jobs",
    color: "from-rose-500 to-pink-500",
  },
];

const TopCategories = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-600 mb-3 sm:mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
            Explore Opportunities
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-3 sm:mb-4 px-4">
            Browse by Category
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-600 max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-4">
            Discover your next career move across our most popular job
            categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 h-full transition-all duration-500 ease-out hover:bg-white/90 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 sm:hover:-translate-y-2">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 rounded-2xl sm:rounded-3xl transition-opacity duration-500`}
                ></div>

                {/* Icon container */}
                <div className="relative mb-4 sm:mb-6">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${cat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}
                  >
                    <span className="text-xl sm:text-2xl lg:text-3xl filter drop-shadow-sm">
                      {cat.icon}
                    </span>
                  </div>

                  {/* Floating particles effect */}
                  {hoveredIndex === index && (
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-2 sm:mb-3 group-hover:text-slate-900 transition-colors duration-300 leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {cat.count}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-xs sm:text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
                    <span>Explore jobs</span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 px-4">
          <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="relative z-10">View All Categories</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
