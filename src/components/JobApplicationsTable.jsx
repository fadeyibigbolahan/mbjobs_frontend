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
  Send,
  MessageCircle,
  Phone,
  Calendar,
  FileText,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { url } from "../../api";

const JobApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobFilter, setJobFilter] = useState("All");
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // table or cards
  const [loading, setLoading] = useState(true);

  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const fetchMessages = async (apprenticeId, applicationId) => {
    console.log("Fetching messages for:", apprenticeId, applicationId);
    setLoadingMessages(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${url}messages/conversation/${apprenticeId}`,
        {
          // params: { apprenticeId, applicationId },
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

  // Transform API response to match component structure
  const transformApiData = (apiApplications) => {
    return apiApplications.map((app) => ({
      id: app._id,
      applicantName: app.apprentice.fullName,
      email: app.apprentice.email,
      phone: "N/A", // Not provided in API response
      jobTitle: app.job.title,
      dateApplied: app.createdAt,
      status: app.status.charAt(0).toUpperCase() + app.status.slice(1), // Capitalize first letter
      experience: "N/A", // Not provided in API response
      location: app.job.location,
      rating: 0, // Not provided in API response
      resume: "N/A", // Not provided in API response
      coverLetter: app.coverLetter || "Not provided",
      skills: [], // Not provided in API response
      expectedSalary: "N/A", // Not provided in API response
      availability: "N/A", // Not provided in API response
      apprenticeId: app.apprentice._id,
      jobId: app.job._id,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchMyApplications = async () => {
      try {
        const response = await axios.get(`${url}application/employer`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Ensure Bearer format
          },
        });
        console.log("job app response", response.data);

        if (response.data.success && response.data.applications) {
          const transformedApplications = transformApiData(
            response.data.applications
          );
          setApplications(transformedApplications);
        } else {
          setApplications([]);
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error Response:", error.response.data);
        } else if (error.request) {
          // Request was made but no response
          console.error("No response received:", error.request);
        } else {
          // Other errors
          console.error("Error setting up request:", error.message);
        }
        setApplications([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

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

  const updateApplicationStatus = async (appId, newStatus) => {
    const token = localStorage.getItem("authToken");
    console.log("Updating status for appId:", appId, "to", newStatus);

    try {
      const response = await axios.patch(
        `${url}application/${appId}/status`,
        { status: newStatus.toLowerCase() },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update response:", response.data);

      if (response.data.success) {
        // Update local state
        setApplications((prev) =>
          prev.map((app) =>
            app.id === appId ? { ...app, status: newStatus } : app
          )
        );
      } else {
        console.error("Failed to update status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
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

  // Handle cover letter viewing
  const handleViewCoverLetter = (application) => {
    setSelectedCoverLetter(application);
    setShowCoverLetterModal(true);
  };

  // Handle starting a conversation
  const handleStartConversation = (application) => {
    setSelectedApplicant(application);
    setShowMessageModal(true);
    setMessageText("");
    fetchMessages(application.apprenticeId, application.id);
  };

  // Send message to applicant
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

      // You'll need to implement this endpoint in your backend
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
        // Add the new message to local state
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

  // Close modals
  const closeModals = () => {
    setShowCoverLetterModal(false);
    setShowMessageModal(false);
    setSelectedCoverLetter(null);
    setSelectedApplicant(null);
    setMessageText("");
    setMessages([]);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 text-xs">
        <div className="p-2 border-b border-gray-200 my-2 flex flex-row justify-between items-center">
          <h2 className="font-semibold text-lg">Job Applications</h2>
          <Link to="/dashboard/job-application">
            <Button>View all</Button>
          </Link>
        </div>
        <div className="p-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 text-xs">
      <div className="p-2 border-b border-gray-200 my-2 flex flex-row justify-between items-center">
        <h2 className="font-semibold text-lg">Job Applications</h2>
        <Link to="/dashboard/job-application">
          <Button>View all</Button>
        </Link>
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
                      {app.coverLetter}
                    </div>
                    {app.coverLetter && app.coverLetter !== "Not provided" && (
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
            {filteredApplications.length === 0 && !loading && (
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
              <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors">
                Reject Selected
              </button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors">
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}

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

export default JobApplicationsTable;
