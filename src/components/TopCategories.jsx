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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-slate-600 mb-4 shadow-sm">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
            Explore Opportunities
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover your next career move across our most popular job
            categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 h-full transition-all duration-500 ease-out hover:bg-white/90 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                ></div>

                {/* Icon container */}
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}
                  >
                    <span className="text-3xl filter drop-shadow-sm">
                      {cat.icon}
                    </span>
                  </div>

                  {/* Floating particles effect */}
                  {hoveredIndex === index && (
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {cat.count}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
                    <span>Explore jobs</span>
                    <svg
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
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
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="relative z-10">View All Categories</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
