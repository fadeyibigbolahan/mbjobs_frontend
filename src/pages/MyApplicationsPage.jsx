import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { url } from "../../api";

dayjs.extend(relativeTime);

const USE_MOCK_DATA = false; // Set to false to use real API

const mockApplications = [
  {
    _id: "1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: "pending",
    job: {
      _id: "job1",
      title: "Frontend Developer",
      employer: "Tech Corp",
      location: "San Francisco, CA",
    },
  },
  {
    _id: "2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: "accepted",
    job: {
      _id: "job2",
      title: "Backend Developer",
      employer: "CodeBase Ltd.",
      location: "Remote",
    },
  },
  {
    _id: "3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    status: "rejected",
    job: {
      _id: "job3",
      title: "Fullstack Engineer",
      employer: "Startup Inc.",
      location: "New York, NY",
    },
  },
];

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("card");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      if (USE_MOCK_DATA) {
        setApplications(mockApplications);
        setFilteredApplications(mockApplications);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${url}application/my`, {
        headers: { Authorization: token },
      });

      console.log("API Response:", res.data);

      // Handle the API response structure: { success: true, applications: [...] }
      if (res.data.success && res.data.applications) {
        setApplications(res.data.applications);
        setFilteredApplications(res.data.applications);
      } else {
        // Fallback if the structure is different
        const applicationsData = res.data.applications || res.data || [];
        setApplications(applicationsData);
        setFilteredApplications(applicationsData);
      }

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch applications:", err.message);
      setError(err.response?.data?.message || "Failed to fetch applications");
      setLoading(false);
    }
  };

  const withdrawApplication = async (applicationId) => {
    try {
      const token = localStorage.getItem("authToken"); // Fixed: use same token key
      await axios.delete(`${url}application/${applicationId}`, {
        // Fixed: use correct URL
        headers: { Authorization: token },
      });

      // Update local state
      setApplications((prev) =>
        prev.filter((app) => app._id !== applicationId)
      );
      setShowWithdrawModal(false);
      setSelectedApplication(null);
    } catch (err) {
      console.error("Failed to withdraw application:", err.message);
      alert("Failed to withdraw application. Please try again.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((app) => app.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.job?.employer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // Handle both employer field directly and nested employer object
          (typeof app.job?.employer === "object" &&
            app.job?.employer?.fullName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Sort applications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "status":
          return a.status.localeCompare(b.status);
        case "job-title":
          return (a.job?.title || "").localeCompare(b.job?.title || "");
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
  }, [applications, selectedStatus, searchTerm, sortBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reviewed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shortlisted":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "rejected":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pending":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Helper function to get employer name
  const getEmployerName = (job) => {
    if (!job) return "Company Not Available";

    // Handle both cases: employer as string and employer as object ID
    if (typeof job.employer === "string") {
      return job.employer;
    } else if (job.employer && job.employer.fullName) {
      return job.employer.fullName;
    }

    return "Company Not Available";
  };

  const applicationStatuses = [
    "all",
    "pending",
    "reviewed",
    "shortlisted",
    "accepted",
    "rejected",
  ];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
          <svg
            className="w-12 h-12 text-red-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchApplications}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-xs">
      {/* Header */}
      <div className="border-b py-6">
        <div className="max-w-7xl mx-auto md:px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="md:text-3xl text-xl font-bold text-gray-900">
                My Job Applications
              </h1>
              <p className="mt-2 text-gray-600">
                Track and manage your job applications
              </p>
            </div>
            {/* <button
              onClick={fetchApplications}
              className="bg-blue-600 text-white px-2 py-1 text-xs rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm my-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search jobs or companies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {applicationStatuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
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
              <option value="status">By Status</option>
              <option value="job-title">By Job Title</option>
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("card")}
                className={`flex-1 px-3 py-2 text-sm ${
                  viewMode === "card"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex-1 px-3 py-2 text-sm ${
                  viewMode === "table"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Table
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="flex gap-6 text-sm text-gray-600">
            <span>Total: {applications.length}</span>
            <span>
              Pending:{" "}
              {applications.filter((app) => app.status === "pending").length}
            </span>
            <span>
              Accepted:{" "}
              {applications.filter((app) => app.status === "accepted").length}
            </span>
            <span>
              Rejected:{" "}
              {applications.filter((app) => app.status === "rejected").length}
            </span>
          </div>
        </div>

        {/* Applications Display */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            {applications.length === 0 ? (
              <>
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-600 mb-4">
                  You haven't applied to any jobs yet. Start browsing and apply
                  to jobs that match your skills!
                </p>
                <a
                  href="/browse-jobs"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Browse Jobs
                </a>
              </>
            ) : (
              <>
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
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No matching applications
                </h3>
                <p className="text-gray-600 mb-4">
                  No applications match your current filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedStatus("all");
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            {viewMode === "card" ? (
              // Card View
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredApplications.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {app.job?.title || "Job Title Not Available"}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {getEmployerName(app.job)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Applied {dayjs(app.createdAt).fromNow()} •{" "}
                          {dayjs(app.createdAt).format("MMM D, YYYY")}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() +
                          app.status.slice(1)}
                      </div>
                    </div>

                    {app.job?.location && (
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
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
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {app.job.location}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <a
                          href={`/jobs/${app.job?._id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View Job Details
                        </a>
                      </div>
                      {app.status === "pending" && (
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setShowWithdrawModal(true);
                          }}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Table View
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job Title
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applied Date
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredApplications.map((app) => (
                        <tr key={app._id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="font-medium text-gray-900">
                              {app.job?.title || "—"}
                            </div>
                            {app.job?.location && (
                              <div className="text-sm text-gray-500">
                                {app.job.location}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 text-gray-900">
                            {getEmployerName(app.job)}
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-900">
                              {dayjs(app.createdAt).format("MMM D, YYYY")}
                            </div>
                            <div className="text-sm text-gray-500">
                              {dayjs(app.createdAt).fromNow()}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                                app.status
                              )}`}
                            >
                              {getStatusIcon(app.status)}
                              {app.status.charAt(0).toUpperCase() +
                                app.status.slice(1)}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <a
                                href={`/jobs/${app.job?._id}`}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                View Job
                              </a>
                              {app.status === "pending" && (
                                <button
                                  onClick={() => {
                                    setSelectedApplication(app);
                                    setShowWithdrawModal(true);
                                  }}
                                  className="text-red-600 hover:text-red-700 text-sm"
                                >
                                  Withdraw
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Withdraw Confirmation Modal */}
      {showWithdrawModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Withdraw Application
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to withdraw your application for "
              {selectedApplication.job?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  setSelectedApplication(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => withdrawApplication(selectedApplication._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Withdraw Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;
