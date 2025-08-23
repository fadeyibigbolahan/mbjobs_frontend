import React, { useState } from "react";
import {
  Check,
  Zap,
  Star,
  Users,
  Building2,
  Crown,
  Phone,
  Shield,
  TrendingUp,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const subscriptionPeriods = [
  { id: "1month", label: "1 Month", months: 1, discount: 0 },
  { id: "3months", label: "3 Months", months: 3, discount: 10 },
  { id: "6months", label: "6 Months", months: 6, discount: 15 },
  { id: "1year", label: "1 Year", months: 12, discount: 25 },
];

const basePricingPlans = [
  {
    title: "Free",
    subtitle: "Explore & Prepare",
    monthlyPrice: 0,
    description:
      "Perfect for new training centers, small clinics, or first-time employers exploring apprenticeships",
    features: [
      "1 Apprentice Resume Match per Month",
      "Community Q&A Support with AI assistance",
      "Employer Resource Toolkit (PDF only)",
      "Apprenticeship Readiness Checklist",
      "Free Profile Setup for Candidates",
      "Access to Scam-Free Platform (Verified Employers Only)",
      "Candidate Profiles + Resume Upload",
      "Job Posting System (Limited to 1 Active Listing)",
      "Basic fraud prevention + posting review",
    ],
    popular: false,
    icon: Users,
    color: "from-gray-500 to-gray-600",
    bgColor: "from-gray-50 to-gray-100",
    borderColor: "border-gray-200",
    buttonText: "Start Free",
  },
  {
    title: "Standard",
    subtitle: "Grow & Match",
    monthlyPrice: 497,
    description:
      "Growing clinics, multi-location practices, or training providers scaling apprenticeships",
    features: [
      "5 Apprentice Matches per Month",
      "AI-Powered Resume-to-Training Matching",
      "Priority Email + Chat Support",
      "Full Employer Dashboard & Onboarding Portal",
      "Analytics Dashboard for Apprentice Progress",
      "Pre-Built RTI Curriculum (Customer Service & MBAC)",
      "Resume & Portfolio Uploads",
      "Training & Certification Access",
      "Background Check Options for Candidates",
      "Enhanced job posting capabilities (FT, PT, contract, gig)",
      "Secure in-app messaging system",
      "Flexible job types supported (W-2 & 1099)",
    ],
    popular: true,
    icon: Zap,
    color: "from-violet-500 to-purple-600",
    bgColor: "from-violet-50 to-purple-100",
    borderColor: "border-violet-300",
    buttonText: "Get Matched",
  },
  {
    title: "Premium",
    subtitle: "Scale & Succeed",
    monthlyPrice: 697,
    description:
      "Workforce boards, multi-site organizations, large training providers, and state-funded programs",
    features: [
      "10 Apprentice Placements",
      "Everything in Standard Tier",
      "AI-Powered Employer-to-Candidate Matching",
      "Dedicated Partnership Manager",
      "Advanced Reporting & Analytics Dashboard",
      "24/7 Priority Support",
      "Custom CRM + API Integrations",
      "Verified Employer Badge + Premium Listing Placement",
      "Access to Premium Training Courses & Certifications",
      "Custom Branding for Job Posts & Flyers",
      "Candidate Mentorship Network Access",
      "White-Labeled Employer Training Dashboard",
      "Premium Job Matching for Freelancers & Contractors",
      "Pre-Filled OJT Agreements + WIOA Tracking Toolkit",
      "Quarterly Strategy Calls + Employer Webinars",
      "Scam Detection AI Layer + Escrow Payment Option",
    ],
    popular: false,
    icon: Crown,
    color: "from-amber-500 to-orange-600",
    bgColor: "from-amber-50 to-orange-100",
    borderColor: "border-amber-300",
    buttonText: "Join the Movement",
  },
];

const jobTypes = [
  "Customer Service",
  "Medical Billers & Coders",
  "Medical Couriers",
  "Lead Gen Reps",
  "Virtual Assistants",
  "Dispatch Coordinators",
  "Licensed Insurance Reps",
  "Freelancers in IT, Marketing, Admin & More",
];

const PricingPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("1year");

  const calculatePrice = (monthlyPrice, period) => {
    if (monthlyPrice === 0) return { price: 0, originalPrice: 0 };

    const selectedPeriodData = subscriptionPeriods.find((p) => p.id === period);
    const totalPrice = monthlyPrice * selectedPeriodData.months;
    const discountedPrice =
      totalPrice * (1 - selectedPeriodData.discount / 100);

    return {
      price: Math.round(discountedPrice),
      originalPrice: selectedPeriodData.discount > 0 ? totalPrice : null,
    };
  };

  const formatPrice = (price) => {
    if (price === 0) return "$0";
    return `$${price.toLocaleString()}`;
  };

  const getPeriodLabel = (period) => {
    const periodData = subscriptionPeriods.find((p) => p.id === period);
    return periodData ? periodData.label.toLowerCase() : "year";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-[#FFFFFF]">
        <Navbar />
      </div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Virtual Konektions
                </span>
                <br />
                <span className="text-gray-900">Pricing Tiers</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Empowering apprenticeships with verified employers and
                comprehensive workforce development.
                <span className="text-violet-600 font-semibold">
                  {" "}
                  Scam-free platform
                </span>
                , real opportunities.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4 fill-current text-green-400" />
              <span>
                Verified employers only • Trusted by workforce development
                professionals
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Subscription Period Selector */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 rounded-2xl p-2 inline-flex space-x-1">
              {subscriptionPeriods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                    selectedPeriod === period.id
                      ? "bg-white text-violet-600 shadow-lg"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {period.label}
                  {period.discount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      -{period.discount}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {basePricingPlans.map((plan, idx) => {
              const IconComponent = plan.icon;
              const isHovered = hoveredCard === idx;
              const isPopular = plan.popular;
              const pricing = calculatePrice(plan.monthlyPrice, selectedPeriod);

              return (
                <div
                  key={idx}
                  className={`relative transform transition-all duration-500 ${
                    isHovered ? "scale-105 -translate-y-2" : ""
                  } ${isPopular ? "lg:-translate-y-4" : ""}`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        ⚡ Most Popular
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div
                    className={`relative h-full rounded-3xl p-8 shadow-xl transition-all duration-500 ${
                      isPopular
                        ? "bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 shadow-violet-100"
                        : "bg-white border border-gray-200 hover:shadow-2xl"
                    } ${isHovered ? "shadow-2xl border-violet-200" : ""}`}
                  >
                    {/* Icon */}
                    <div
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${plan.bgColor} mb-6`}
                    >
                      <IconComponent className={`w-8 h-8 text-gray-700`} />
                    </div>

                    {/* Header */}
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {plan.title}
                      </h3>
                      <p className="text-sm font-medium text-violet-600">
                        {plan.subtitle}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline space-x-2">
                        <span
                          className={`text-4xl font-bold ${
                            isPopular
                              ? "bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
                              : "text-gray-900"
                          }`}
                        >
                          {formatPrice(pricing.price)}
                        </span>
                        <span className="text-gray-500">
                          /{getPeriodLabel(selectedPeriod)}
                        </span>
                      </div>
                      {pricing.originalPrice && (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-gray-400 line-through text-sm">
                            {formatPrice(pricing.originalPrice)}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Save{" "}
                            {
                              subscriptionPeriods.find(
                                (p) => p.id === selectedPeriod
                              )?.discount
                            }
                            %
                          </span>
                        </div>
                      )}
                      {plan.monthlyPrice > 0 && (
                        <div className="text-sm text-gray-500 mt-2">
                          ${plan.monthlyPrice}/month billed{" "}
                          {getPeriodLabel(selectedPeriod) === "month"
                            ? "monthly"
                            : getPeriodLabel(selectedPeriod) + "ly"}
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 max-h-96 overflow-y-auto">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <Check
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              isPopular ? "text-violet-500" : "text-green-500"
                            }`}
                          />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                        isPopular
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-violet-300"
                          : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                      } ${isHovered ? "transform scale-105" : ""}`}
                    >
                      {plan.buttonText}
                    </button>

                    {/* Setup fee note */}
                    {plan.monthlyPrice > 0 && (
                      <p className="text-xs text-gray-500 mt-3 text-center">
                        *Setup fee amount per apprentice
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enterprise Tier */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">Enterprise Tier</h3>
                <p className="text-xl text-gray-300 mb-8">
                  Custom solutions for large-scale workforce development
                  programs
                </p>
                <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Phone className="w-5 h-5" />
                  <span>Book a Call</span>
                </button>
              </div>
            </div>
          </div>

          {/* Job Types Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Job Types You Can Source & Hire For
              </h2>
              <p className="text-lg text-gray-600">
                Our platform connects you with qualified candidates across
                multiple industries
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {jobTypes.map((jobType, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span className="text-gray-800 font-medium">{jobType}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Value Scaling by Tier
              </h2>
              <p className="text-lg text-gray-600">
                Compare features across all our pricing tiers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="text-left p-6 font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="text-center p-6 font-semibold text-gray-900">
                      Free
                    </th>
                    <th className="text-center p-6 font-semibold text-violet-600">
                      Standard
                    </th>
                    <th className="text-center p-6 font-semibold text-amber-600">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      feature: "Apprentice Matches",
                      free: "1/month",
                      standard: "5/month",
                      premium: "10/month",
                    },
                    {
                      feature: "AI Matching",
                      free: "❌",
                      standard: "✅",
                      premium: "✅ (Advanced)",
                    },
                    {
                      feature: "Resume/Portfolio Tools",
                      free: "Basic",
                      standard: "Full",
                      premium: "Full + Priority",
                    },
                    {
                      feature: "Job Posting System",
                      free: "1 basic post",
                      standard: "Enhanced",
                      premium: "Premium Branded",
                    },
                    {
                      feature: "Support Access",
                      free: "Community Only",
                      standard: "Priority Email/Chat",
                      premium: "24/7 Dedicated",
                    },
                    {
                      feature: "Training Programs",
                      free: "Templates Only",
                      standard: "Customer Service & MBAC",
                      premium: "Full Catalog",
                    },
                    {
                      feature: "Onboarding Tools",
                      free: "Checklist PDF",
                      standard: "Full Portal",
                      premium: "Fully Custom API",
                    },
                    {
                      feature: "Candidate Mentorship",
                      free: "❌",
                      standard: "✅",
                      premium: "Enhanced",
                    },
                    {
                      feature: "Scam-Free Security",
                      free: "Basic",
                      standard: "Verified Employers",
                      premium: "Advanced AI-Flagging",
                    },
                    {
                      feature: "Reporting & Analytics",
                      free: "❌",
                      standard: "Basic Dashboards",
                      premium: "Advanced Custom Reports",
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-6 font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="p-6 text-center text-gray-600">
                        {row.free}
                      </td>
                      <td className="p-6 text-center text-gray-600">
                        {row.standard}
                      </td>
                      <td className="p-6 text-center text-gray-600">
                        {row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
