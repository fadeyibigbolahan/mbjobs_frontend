import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import virtual from "../assets/virtual.png";

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
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Stay Ahead of Your Career
                </h3>
                <p className="text-slate-300 text-lg">
                  Get the latest job opportunities, apprenticeship programs, and
                  career insights delivered to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <button className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                  <span className="flex items-center gap-2">
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
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <img
                    src={virtual}
                    alt="Virtual Konektion Logo"
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Virtual Konektion</h2>
                  <p className="text-sm text-slate-400">Jobs & Learning</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Connecting talent with opportunity through innovative job
                matching and comprehensive apprenticeship programs. Build your
                future with us.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <div className="text-2xl font-bold text-blue-400">10K+</div>
                  <div className="text-sm text-slate-400">Jobs Posted</div>
                </div>
                <div className="text-center p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <div className="text-2xl font-bold text-purple-400">500+</div>
                  <div className="text-sm text-slate-400">Courses</div>
                </div>
              </div>

              {/* App Download */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-slate-300 mb-2">
                  Download Our App
                </p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300 border border-slate-600">
                    <span className="text-xl">📱</span>
                    <div className="text-left">
                      <div className="text-xs text-slate-400">
                        Download on the
                      </div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300 border border-slate-600">
                    <span className="text-xl">🤖</span>
                    <div className="text-left">
                      <div className="text-xs text-slate-400">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-6 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
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
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="text-slate-400 text-sm">
                © {currentYear} Virtual Konektion. All rights reserved. Built
                with passion for connecting careers.
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm mr-2">Follow us:</span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    title={social.name}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex gap-6 text-sm">
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
