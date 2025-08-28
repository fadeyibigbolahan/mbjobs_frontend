import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, X } from "lucide-react";
import { url } from "../../api";

const BrowseJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Application modal states
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const categories = [
    "all",
    "Technology",
    "Marketing",
    "Data Science",
    "Design",
    "Finance",
    "Healthcare",
  ];
  const locations = [
    "all",
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
    "Kano",
    "Florida",
    "Remote",
  ];
  const jobTypes = ["all", "full-time", "part-time", "contract", "internship"];

  // Function to transform API data to match component expectations
  const transformJobData = (apiJob) => {
    return {
      id: apiJob._id,
      title: apiJob.title,
      company: apiJob.employer?.fullName || "Company Name",
      location: apiJob.location,
      type: apiJob.jobType,
      category: apiJob.category,
      salary:
        apiJob.stipend === "Negotiable"
          ? `$${apiJob.salaryMin?.toLocaleString()} - $${apiJob.salaryMax?.toLocaleString()}`
          : apiJob.stipend,
      description: apiJob.description,
      requirements: apiJob.requirements || [],
      postedDate: apiJob.createdAt,
      deadline: apiJob.deadline,
      logo: "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU", // Default logo
      tags: [apiJob.category, apiJob.jobType, apiJob.location].filter(Boolean),
      isRemote: apiJob.location?.toLowerCase().includes("remote") || false,
      experienceLevel: "Entry Level", // Default since not in API
      status: apiJob.status,
      applicants: apiJob.applicants?.length || 0,
    };
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("authToken");
      try {
        setLoading(true);
        const response = await axios.get(`${url}jobs`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        console.log("API Response:", response.data);

        // Transform the API data
        const transformedJobs = response.data.jobs?.map(transformJobData) || [];

        setJobs(transformedJobs);
        setFilteredJobs(transformedJobs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (job) => job.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by location
    if (selectedLocation !== "all") {
      filtered = filtered.filter(
        (job) =>
          job.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
          (selectedLocation === "Remote" && job.isRemote)
      );
    }

    // Filter by job type
    if (selectedType !== "all") {
      filtered = filtered.filter(
        (job) => job.type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.postedDate) - new Date(a.postedDate);
        case "oldest":
          return new Date(a.postedDate) - new Date(b.postedDate);
        case "salary":
          // Extract numeric values for salary comparison
          const getSalaryValue = (salary) => {
            const matches = salary.match(/\d+/g);
            return matches ? parseInt(matches[0]) : 0;
          };
          return getSalaryValue(b.salary) - getSalaryValue(a.salary);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [
    jobs,
    searchTerm,
    selectedCategory,
    selectedLocation,
    selectedType,
    sortBy,
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
    setCoverLetter("");
    setApplicationStatus(null);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      setApplicationStatus({
        type: "error",
        message: "Please log in to apply for jobs",
      });
      return;
    }

    setIsSubmitting(true);

    console.log("selected job", selectedJob);
    try {
      const response = await axios.post(
        `${url}application/jobs/${selectedJob.id}/apply`,
        {
          coverLetter: coverLetter.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      setApplicationStatus({
        type: "success",
        message: "Application submitted successfully!",
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowApplicationModal(false);
        setSelectedJob(null);
        setCoverLetter("");
        setApplicationStatus(null);
      }, 2000);
    } catch (err) {
      console.error("Error submitting application:", err);
      setApplicationStatus({
        type: "error",
        message: err.response?.data?.message || "Failed to submit application",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedJob(null);
    setCoverLetter("");
    setApplicationStatus(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-xs">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto md:px-6">
          <h1 className="md:text-3xl text-xl font-bold text-gray-900">
            Browse Jobs
          </h1>
          <p className="mt-2 text-gray-600">
            Find your next apprenticeship opportunity
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:p-6">
        {/* Search and Filters */}
        <div className="rounded-lg shadow-sm my-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative flex justify-center items-center gap-2 border p-2 border-gray-300 rounded-lg">
                <Search className="w-[20px]" />
                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  className="w-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location === "all" ? "All Locations" : location}
                </option>
              ))}
            </select>

            {/* Job Type Filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="salary">Highest Salary</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                ></path>
              </svg>
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                        {job.title}
                      </h3>
                      {job.isRemote && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Remote
                        </span>
                      )}
                      {job.status && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            job.status === "Open"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {job.status}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          ></path>
                        </svg>
                        {job.salary}
                      </span>
                      {job.applicants > 0 && (
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                          </svg>
                          {job.applicants} applicants
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Posted {formatDate(job.postedDate)} •
                        {/* <span
                          className={`ml-1 ${
                            getDaysRemaining(job.deadline) <= 7
                              ? "text-red-500 font-medium"
                              : ""
                          }`}
                        >
                          {getDaysRemaining(job.deadline)} days left to apply
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedLocation("all");
                setSelectedType("all");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">
                1
              </button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                2
              </button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                3
              </button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Apply for Position
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedJob.title} at {selectedJob.company}
                </p>
              </div>
              <button
                onClick={closeApplicationModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Job Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedJob.logo}
                    alt={`${selectedJob.company} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {selectedJob.title}
                    </h3>
                    <p className="text-gray-600">{selectedJob.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <span>{selectedJob.location}</span>
                      <span>{selectedJob.type}</span>
                      <span>{selectedJob.salary}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleApplicationSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {coverLetter.length}/1000 characters
                  </p>
                </div>

                {/* Application Status */}
                {applicationStatus && (
                  <div
                    className={`mb-4 p-4 rounded-lg ${
                      applicationStatus.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-800"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {applicationStatus.message}
                    </p>
                  </div>
                )}

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeApplicationModal}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !coverLetter.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseJobsPage;
