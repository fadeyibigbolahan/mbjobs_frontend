import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  BookOpen,
  Users,
  Briefcase,
  CreditCard,
  Shield,
  Settings,
  HelpCircle,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

export default function FAQSupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    { id: "all", name: "All Categories", icon: BookOpen, color: "bg-blue-500" },
    {
      id: "getting-started",
      name: "Getting Started",
      icon: Zap,
      color: "bg-green-500",
    },
    {
      id: "job-seekers",
      name: "For Job Seekers",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      id: "employers",
      name: "For Employers",
      icon: Briefcase,
      color: "bg-orange-500",
    },
    {
      id: "billing",
      name: "Billing & Pricing",
      icon: CreditCard,
      color: "bg-red-500",
    },
    {
      id: "privacy",
      name: "Privacy & Security",
      icon: Shield,
      color: "bg-indigo-500",
    },
    {
      id: "technical",
      name: "Technical Support",
      icon: Settings,
      color: "bg-gray-500",
    },
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I create an account on VirtualKonektion?",
      answer:
        'Creating an account is simple! Click the "Sign Up" button in the top right corner, choose whether you\'re a job seeker or employer, fill in your basic information, and verify your email address. You can also sign up using your Google or LinkedIn account for faster registration.',
    },
    {
      id: 2,
      category: "getting-started",
      question: "Is VirtualKonektion free to use?",
      answer:
        "VirtualKonektion offers both free and premium plans. Job seekers can create profiles, search jobs, and apply for free. Employers get 3 free job postings per month, with premium plans offering unlimited postings and advanced features like candidate screening tools.",
    },
    {
      id: 3,
      category: "job-seekers",
      question: "How does the job matching algorithm work?",
      answer:
        "Our AI-powered algorithm analyzes your profile, skills, experience, and preferences to match you with relevant opportunities. It considers factors like location, salary expectations, company culture, and career goals to provide personalized job recommendations.",
    },
    {
      id: 4,
      category: "job-seekers",
      question: "Can I set up job alerts?",
      answer:
        "Yes! You can create custom job alerts based on keywords, location, salary range, and job type. You'll receive notifications via email or push notifications when new jobs matching your criteria are posted.",
    },
    {
      id: 5,
      category: "job-seekers",
      question: "How do I make my profile stand out?",
      answer:
        "Complete all sections of your profile, add a professional photo, write a compelling summary, list relevant skills, and include work samples or portfolio links. Profiles with 90%+ completion receive 5x more views from employers.",
    },
    {
      id: 6,
      category: "employers",
      question: "How do I post a job on VirtualKonektion?",
      answer:
        'After creating an employer account, click "Post a Job" from your dashboard. Fill in the job details, requirements, and company information. You can preview your posting before publishing. Jobs typically go live within 15 minutes of submission.',
    },
    {
      id: 7,
      category: "employers",
      question: "How do I find the right candidates?",
      answer:
        "Use our advanced search filters to find candidates by skills, experience, location, and availability. You can also use our AI-powered candidate matching feature that suggests qualified candidates based on your job requirements.",
    },
    {
      id: 8,
      category: "employers",
      question: "Can I manage multiple job postings?",
      answer:
        "Yes! Your employer dashboard allows you to manage all your job postings, track applications, schedule interviews, and communicate with candidates. Premium plans include team collaboration features for larger organizations.",
    },
    {
      id: 9,
      category: "billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely and encrypted.",
    },
    {
      id: 10,
      category: "billing",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. Your premium features will remain active until the end of your current billing period, and you won't be charged for the next cycle.",
    },
    {
      id: 11,
      category: "privacy",
      question: "How do you protect my personal information?",
      answer:
        "We use industry-standard encryption and security measures to protect your data. Your personal information is never sold to third parties, and you have full control over your privacy settings and profile visibility.",
    },
    {
      id: 12,
      category: "privacy",
      question: "Can I make my profile private?",
      answer:
        "Yes! You can adjust your privacy settings to control who can see your profile. Options include public, visible to employers only, or completely private. You can also hide your profile from specific companies.",
    },
    {
      id: 13,
      category: "technical",
      question: "Why am I having trouble uploading my resume?",
      answer:
        "Ensure your resume is in PDF, DOC, or DOCX format and under 5MB. Clear your browser cache and try again. If the problem persists, try using a different browser or contact our technical support team.",
    },
    {
      id: 14,
      category: "technical",
      question: "Is there a mobile app available?",
      answer:
        "Yes! VirtualKonektion is available on both iOS and Android. Download the app from the App Store or Google Play Store to search jobs, manage applications, and receive notifications on the go.",
    },
  ];

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      icon: MessageCircle,
      color: "bg-blue-500",
      action: "Start Chat",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      icon: Mail,
      color: "bg-green-500",
      action: "Send Email",
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team",
      availability: "Mon-Fri, 9AM-6PM EST",
      icon: Phone,
      color: "bg-purple-500",
      action: "Call Now",
    },
  ];

  const quickLinks = [
    { title: "Getting Started Guide", icon: BookOpen, url: "#" },
    { title: "Video Tutorials", icon: ExternalLink, url: "#" },
    // { title: "API Documentation", icon: Settings, url: "#" },
    { title: "Community Forum", icon: Users, url: "#" },
    { title: "Feature Requests", icon: HelpCircle, url: "#" },
    { title: "Status Page", icon: CheckCircle, url: "#" },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-[#FFFFFF]">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How can we{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                help you?
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions or get in touch with our support
              team for personalized assistance.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>

          {/* Support Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {supportOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div
                  className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-3">{option.description}</p>
                <p className="text-sm text-gray-500 mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {option.availability}
                </p>
                <Link to="/live-chat">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    {option.action}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                        activeCategory === category.id
                          ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}
                      >
                        <category.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    {quickLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
                      >
                        <link.icon className="w-4 h-4" />
                        <span className="text-sm">{link.title}</span>
                        <ArrowRight className="w-3 h-3 ml-auto" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </h2>
                  <span className="text-sm text-gray-500">
                    {filteredFAQs.length}{" "}
                    {filteredFAQs.length === 1 ? "result" : "results"}
                  </span>
                </div>

                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search terms or browse different
                      categories.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                      <div
                        key={faq.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          {expandedFAQ === faq.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFAQ === faq.id && (
                          <div className="px-6 pb-4 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed pt-4">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Still Need Help */}
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
                  <p className="text-blue-100 mb-6">
                    Can't find what you're looking for? Our support team is here
                    to help you succeed.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                      Contact Support
                    </button>
                    <button className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                      Schedule a Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
