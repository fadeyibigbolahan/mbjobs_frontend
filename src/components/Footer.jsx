import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Job Seekers",
      links: [
        { name: "Browse Jobs", href: "#" },
        { name: "Career Advice", href: "#" },
        { name: "Resume Builder", href: "#" },
        { name: "Salary Guide", href: "#" },
        { name: "Interview Prep", href: "#" },
        { name: "Job Alerts", href: "#" },
      ],
    },
    {
      title: "Apprenticeships",
      links: [
        { name: "Find Programs", href: "#" },
        { name: "Course Catalog", href: "#" },
        { name: "Skill Assessments", href: "#" },
        { name: "Learning Paths", href: "#" },
        { name: "Certification", href: "#" },
        { name: "Industry Partners", href: "#" },
      ],
    },
    {
      title: "Employers",
      links: [
        { name: "Post Jobs", href: "#" },
        { name: "Find Talent", href: "#" },
        { name: "Apprentice Programs", href: "#" },
        { name: "Employer Dashboard", href: "#" },
        { name: "Recruitment Solutions", href: "#" },
        { name: "Pricing", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Success Stories", href: "#" },
        { name: "Industry Reports", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact Us", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { name: "GitHub", icon: <FaGithubSquare />, href: "#" },
    { name: "Dribbble", icon: <FaDribbbleSquare />, href: "#" },
    { name: "Instagram", icon: <FaInstagram />, href: "#" },
    { name: "Facebook", icon: <FaFacebookSquare />, href: "#" },
    { name: "Twitter", icon: <FaTwitterSquare />, href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Stay Ahead of Your Career
                </h3>
                <p className="text-slate-300 text-base sm:text-lg">
                  Get the latest job opportunities, apprenticeship programs, and
                  career insights delivered to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <button className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 text-sm sm:text-base">
                  <span className="flex items-center justify-center gap-2">
                    Subscribe
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="md:col-span-2 lg:col-span-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded"></div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Virtual Konektion
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Jobs & Learning
                  </p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed text-sm sm:text-base">
                Connecting talent with opportunity through innovative job
                matching and comprehensive apprenticeship programs. Build your
                future with us.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-sm mx-auto md:mx-0">
                <div className="text-center p-3 sm:p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                    10K+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400">
                    Jobs Posted
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">
                    500+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400">
                    Courses
                  </div>
                </div>
              </div>

              {/* App Download */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-slate-300 mb-2 text-center md:text-left">
                  Download Our App
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center md:items-start">
                  <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300 border border-slate-600 w-full sm:w-auto justify-center sm:justify-start">
                    <span className="text-lg sm:text-xl">📱</span>
                    <div className="text-left">
                      <div className="text-xs text-slate-400">
                        Download on the
                      </div>
                      <div className="text-xs sm:text-sm font-semibold">
                        App Store
                      </div>
                    </div>
                  </button>
                  <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300 border border-slate-600 w-full sm:w-auto justify-center sm:justify-start">
                    <span className="text-lg sm:text-xl">🤖</span>
                    <div className="text-left">
                      <div className="text-xs text-slate-400">Get it on</div>
                      <div className="text-xs sm:text-sm font-semibold">
                        Google Play
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="text-center md:text-left">
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col gap-6">
              {/* Copyright and Social on mobile, separate rows */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                {/* Copyright */}
                <div className="text-slate-400 text-xs sm:text-sm text-center sm:text-left order-2 sm:order-1">
                  © {currentYear} Virtual Konektion. All rights reserved.
                  <span className="hidden sm:inline">
                    {" "}
                    Built with passion for connecting careers.
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3 sm:gap-4 order-1 sm:order-2">
                  <span className="text-slate-400 text-xs sm:text-sm mr-1 sm:mr-2 hidden sm:inline">
                    Follow us:
                  </span>
                  <div className="flex gap-2 sm:gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 hover:bg-slate-700 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                        title={social.name}
                      >
                        <span className="text-sm sm:text-lg group-hover:scale-110 transition-transform duration-300">
                          {social.icon}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm border-t border-slate-700/30 pt-4 sm:border-t-0 sm:pt-0">
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
