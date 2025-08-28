import { useEffect, useState } from "react";
import {
  User,
  MessageSquare,
  CheckCircle,
  X,
  Eye,
  Filter,
  Search,
  Download,
  Star,
  Clock,
  MapPin,
  Mail,
  Phone,
  Send,
  MessageCircle,
  Calendar,
  FileText,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../api";

const JobApplicationsPage = () => {
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobFilter, setJobFilter] = useState("All");
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const navigate = useNavigate();

  const fetchMessages = async (apprenticeId, applicationId) => {
    console.log("Fetching messages for:", apprenticeId, applicationId);
    setLoadingMessages(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${url}messages/conversation/${apprenticeId}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Messages response:", response.data);

      if (response.data.success) {
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleViewCoverLetter = (application) => {
    setSelectedCoverLetter(application);
    setShowCoverLetterModal(true);
  };

  const handleStartConversation = (application) => {
    setSelectedApplicant(application);
    setShowMessageModal(true);
    setMessageText("");
    fetchMessages(application.apprenticeId, application.id);
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !selectedApplicant) return;
    console.log(
      "Sending message:",
      messageText,
      "to",
      selectedApplicant.applicantName
    );

    setSendingMessage(true);
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${url}messages/send`,
        {
          receiverId: selectedApplicant.apprenticeId,
          content: messageText,
          applicationId: selectedApplicant.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log("Message send response:", response.data);

      if (response.data.success) {
        setMessages((prev) => [...prev, response.data.message]);
        alert("Message sent successfully!");
        setMessageText("");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setSendingMessage(false);
    }
  };

  const closeModals = () => {
    setShowCoverLetterModal(false);
    setShowMessageModal(false);
    setSelectedCoverLetter(null);
    setSelectedApplicant(null);
    setMessageText("");
    setMessages([]);
  };

  // Fetch applications from API
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/signin");
      return;
    }

    setLoading(true);
    axios
      .get(`${url}application/employer`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("Fetched applications:", response.data);

        // Transform API data to match component structure
        const transformedApplications = response.data.applications.map(
          (app) => ({
            id: app._id,
            applicantName: app.apprentice.fullName,
            email: app.apprentice.email,
            phone: "+1 (555) 123-4567",
            jobTitle: app.job.title,
            dateApplied: app.createdAt,
            status: mapStatus(app.status),
            experience: "N/A",
            location: app.job.location,
            rating: 0,
            resume: "N/A",
            coverLetter: app.coverLetter || "Not provided",
            skills: [],
            expectedSalary: "N/A",
            availability: "N/A",
            apprenticeId: app.apprentice._id, // Add this line
            jobId: app.job._id, // Add this line
          })
        );

        setApplications(transformedApplications);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch applications. Please try again.");
        setLoading(false);
      });
  }, [navigate]);

  // Map API status to component status
  const mapStatus = (apiStatus) => {
    const statusMap = {
      pending: "Pending",
      under_review: "Under Review",
      interview_scheduled: "Interview Scheduled",
      accepted: "Accepted",
      rejected: "Rejected",
    };
    return statusMap[apiStatus] || "Pending";
  };

  const getStatusBadge = (status) => {
    const badges = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Under Review": "bg-blue-100 text-blue-800 border-blue-200",
      "Interview Scheduled": "bg-purple-100 text-purple-800 border-purple-200",
      Accepted: "bg-green-100 text-green-800 border-green-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return badges[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const uniqueJobs = [...new Set(applications.map((app) => app.jobTitle))];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesJob = jobFilter === "All" || app.jobTitle === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleSelectApplication = (appId) => {
    setSelectedApplications((prev) =>
      prev.includes(appId)
        ? prev.filter((id) => id !== appId)
        : [...prev, appId]
    );
  };

  const handleSelectAll = () => {
    setSelectedApplications(
      selectedApplications.length === filteredApplications.length
        ? []
        : filteredApplications.map((app) => app.id)
    );
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-600 mb-2">Error</div>
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto md:p-6 text-xs">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Job Applications
            </h1>
            <p className="text-gray-600 mt-1">
              Review and manage candidate applications
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
              <Download size={18} />
              Export
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
              <Filter size={18} />
              Advanced Filter
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Applications
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {applications.length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Review
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {statusCounts["Pending"] || 0}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-blue-600">
                {statusCounts["Under Review"] || 0}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interviews</p>
              <p className="text-2xl font-bold text-purple-600">
                {statusCounts["Interview Scheduled"] || 0}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hired</p>
              <p className="text-2xl font-size-600">
                {statusCounts["Accepted"] || 0}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-2 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, email, or job title..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
            >
              <option value="All">All Jobs</option>
              {uniqueJobs.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={
                      selectedApplications.length ===
                        filteredApplications.length &&
                      filteredApplications.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Applicant
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Job Position
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Cover Letter
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Applied
                </th>
                <th className="text-center p-4 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedApplications.includes(app.id)}
                      onChange={() => handleSelectApplication(app.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {app.applicantName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {app.applicantName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail size={12} />
                          {app.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin size={12} />
                          {app.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {app.jobTitle}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="max-w-xs">
                      <div
                        className="text-sm text-gray-900 truncate"
                        title={app.coverLetter}
                      >
                        {app.coverLetter || "No cover letter provided"}
                      </div>
                      {app.coverLetter &&
                        app.coverLetter !== "Not provided" && (
                          <button
                            onClick={() => handleViewCoverLetter(app)}
                            className="text-blue-600 hover:text-blue-800 text-xs mt-1 flex items-center gap-1"
                          >
                            <Eye size={12} />
                            Read full
                          </button>
                        )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {formatDate(app.dateApplied)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <User size={16} />
                      </button>
                      <button
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Message Applicant"
                        onClick={() => handleStartConversation(app)}
                      >
                        <MessageSquare size={16} />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Accept Application"
                        onClick={() =>
                          updateApplicationStatus(app.id, "Accepted")
                        }
                      >
                        <ThumbsUp size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject Application"
                        onClick={() =>
                          updateApplicationStatus(app.id, "Rejected")
                        }
                      >
                        <ThumbsDown size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="More Options"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-gray-100 p-4 rounded-full">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          No applications found
                        </h3>
                        <p className="text-gray-500">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        {selectedApplications.length > 0 && (
          <div className="p-4 bg-blue-50 border-t border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">
                {selectedApplications.length} application
                {selectedApplications.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors">
                  Accept Selected
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:2z-700 transition-colors">
                  Reject Selected
                </button>
                <button className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors">
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cover Letter Modal */}
      {showCoverLetterModal && selectedCoverLetter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cover Letter - {selectedCoverLetter.applicantName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Application for: {selectedCoverLetter.jobTitle}
                  </p>
                </div>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                  {selectedCoverLetter.coverLetter}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeModals();
                    handleStartConversation(selectedCoverLetter);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  Start Conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 h-[80vh] flex flex-col overflow-hidden">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                  {selectedApplicant.applicantName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedApplicant.applicantName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Regarding: {selectedApplicant.jobTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat messages area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
              {loadingMessages ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : messages.length > 0 ? (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex mb-4 ${
                      message.sender.fullName ? "justify-end" : ""
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-lg px-4 py-2 shadow-sm ${
                        message.sender.fullName
                          ? "bg-blue-500 text-white rounded-tr-none"
                          : "bg-white rounded-tl-none"
                      }`}
                    >
                      <p
                        className={
                          message.sender.fullName
                            ? "text-white"
                            : "text-gray-800"
                        }
                      >
                        {message.content}
                      </p>
                      <p
                        className={`text-xs text-right mt-1 ${
                          message.sender.fullName
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full text-gray-500">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
            </div>

            {/* Message input area */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  rows={1}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage()
                  }
                />
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim() || sendingMessage}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingMessage ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send size={20} className="transform -rotate-45" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicationsPage;
