import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react";

const ManageApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockApplications = [
      {
        id: 1,
        applicantName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        position: "Senior Software Engineer",
        company: "TechCorp Inc.",
        status: "pending",
        appliedDate: "2024-06-08",
        experience: "5 years",
        education: "MS Computer Science",
        location: "San Francisco, CA",
        resume: "sarah_johnson_resume.pdf",
        coverLetter:
          "Passionate software engineer with expertise in React and Node.js...",
        skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
        rating: 4.5,
      },
      {
        id: 2,
        applicantName: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 (555) 987-6543",
        position: "UX Designer",
        company: "Design Studio",
        status: "approved",
        appliedDate: "2024-06-07",
        experience: "3 years",
        education: "BS Design",
        location: "New York, NY",
        resume: "michael_chen_resume.pdf",
        coverLetter:
          "Creative UX designer with a passion for user-centered design...",
        skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
        rating: 4.8,
      },
      {
        id: 3,
        applicantName: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        phone: "+1 (555) 456-7890",
        position: "Data Scientist",
        company: "Analytics Pro",
        status: "rejected",
        appliedDate: "2024-06-06",
        experience: "4 years",
        education: "PhD Statistics",
        location: "Austin, TX",
        resume: "emily_rodriguez_resume.pdf",
        coverLetter:
          "Data scientist with expertise in machine learning and statistical analysis...",
        skills: ["Python", "R", "SQL", "Machine Learning", "Tableau"],
        rating: 4.2,
      },
      {
        id: 4,
        applicantName: "David Kim",
        email: "david.kim@email.com",
        phone: "+1 (555) 234-5678",
        position: "Product Manager",
        company: "InnovateCorp",
        status: "pending",
        appliedDate: "2024-06-09",
        experience: "6 years",
        education: "MBA",
        location: "Seattle, WA",
        resume: "david_kim_resume.pdf",
        coverLetter:
          "Experienced product manager with a track record of launching successful products...",
        skills: [
          "Product Strategy",
          "Agile",
          "Analytics",
          "Leadership",
          "Market Research",
        ],
        rating: 4.6,
      },
    ];

    setTimeout(() => {
      setApplications(mockApplications);
      setFilteredApplications(mockApplications);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter applications based on search and status
  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    if (selectedApplication && selectedApplication.id === applicationId) {
      setSelectedApplication((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Applications
          </h1>
          <p className="text-gray-600 mt-2">
            Review and manage job applications from candidates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {
                    applications.filter((app) => app.status === "pending")
                      .length
                  }
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    applications.filter((app) => app.status === "approved")
                      .length
                  }
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {
                    applications.filter((app) => app.status === "rejected")
                      .length
                  }
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, position, or company..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {application.applicantName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {application.applicantName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.position}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.experience} experience
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.appliedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">
                          {application.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStars(application.rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          {application.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {application.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(application.id, "approved")
                              }
                              className="text-green-600 hover:text-green-900 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(application.id, "rejected")
                              }
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No applications found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No job applications have been submitted yet."}
              </p>
            </div>
          )}
        </div>

        {/* Application Detail Modal */}
        {showModal && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Application Details
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Personal Info */}
                  <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {selectedApplication.applicantName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-900">
                            {selectedApplication.applicantName}
                          </h3>
                          <p className="text-gray-600">
                            Applied for {selectedApplication.position}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {selectedApplication.email}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {selectedApplication.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {selectedApplication.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Applied{" "}
                          {new Date(
                            selectedApplication.appliedDate
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Cover Letter
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">
                          {selectedApplication.coverLetter}
                        </p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Actions & Info */}
                  <div>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Quick Info
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            Experience:
                          </span>
                          <span className="ml-2 text-sm font-medium">
                            {selectedApplication.experience}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            Education:
                          </span>
                          <span className="ml-2 text-sm font-medium">
                            {selectedApplication.education}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">Rating:</span>
                          <div className="ml-2 flex items-center">
                            {renderStars(selectedApplication.rating)}
                            <span className="ml-1 text-sm font-medium">
                              {selectedApplication.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Actions
                      </h4>
                      <div className="space-y-3">
                        <div className="mb-3">
                          <span className="text-sm text-gray-600">
                            Current Status:
                          </span>
                          <span
                            className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              selectedApplication.status
                            )}`}
                          >
                            {getStatusIcon(selectedApplication.status)}
                            <span className="ml-1 capitalize">
                              {selectedApplication.status}
                            </span>
                          </span>
                        </div>

                        <button
                          onClick={() => window.open("#", "_blank")}
                          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </button>

                        {selectedApplication.status === "pending" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                handleStatusChange(
                                  selectedApplication.id,
                                  "approved"
                                );
                                setShowModal(false);
                              }}
                              className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                handleStatusChange(
                                  selectedApplication.id,
                                  "rejected"
                                );
                                setShowModal(false);
                              }}
                              className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplicationsPage;
