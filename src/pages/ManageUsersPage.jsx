import React, { useState } from "react";
import {
  Eye,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Award,
} from "lucide-react";

const ManageUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  // Sample user data
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      role: "job_seeker",
      location: "New York, NY",
      joinDate: "2024-01-15",
      lastActive: "2024-06-08",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      experience: "5+ years",
      skills: ["React", "Node.js", "Python", "SQL"],
      jobTitle: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      resumeUploaded: true,
      profileComplete: 95,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@company.com",
      phone: "+1 (555) 987-6543",
      role: "employer",
      location: "San Francisco, CA",
      joinDate: "2024-02-20",
      lastActive: "2024-06-09",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      company: "InnovateTech Corp",
      jobsPosted: 12,
      activeJobs: 5,
      industry: "Technology",
      companySize: "50-200 employees",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      role: "job_seeker",
      location: "Austin, TX",
      joinDate: "2024-03-10",
      lastActive: "2024-06-07",
      status: "inactive",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      experience: "3+ years",
      skills: ["UX/UI Design", "Figma", "Adobe Creative Suite"],
      jobTitle: "UX Designer",
      resumeUploaded: true,
      profileComplete: 88,
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@startup.com",
      phone: "+1 (555) 321-9876",
      role: "employer",
      location: "Boston, MA",
      joinDate: "2024-01-05",
      lastActive: "2024-06-10",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      company: "StartupLab",
      jobsPosted: 8,
      activeJobs: 3,
      industry: "Fintech",
      companySize: "10-50 employees",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      phone: "+1 (555) 654-3210",
      role: "job_seeker",
      location: "Seattle, WA",
      joinDate: "2024-04-12",
      lastActive: "2024-06-06",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      experience: "2+ years",
      skills: ["Digital Marketing", "SEO", "Google Analytics"],
      jobTitle: "Marketing Specialist",
      resumeUploaded: false,
      profileComplete: 72,
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`;
  };

  const getRoleBadge = (role) => {
    const roleStyles = {
      job_seeker: "bg-blue-100 text-blue-800",
      employer: "bg-purple-100 text-purple-800",
    };
    const roleText = {
      job_seeker: "Job Seeker",
      employer: "Employer",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${roleStyles[role]}`}
      >
        {roleText[role]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white p-6 text-xs">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Users
          </h1>
          <p className="text-gray-600">
            Manage and monitor all users on your job matching platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Job Seekers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === "job_seeker").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Employers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === "employer").length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.status === "active").length}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="job_seeker">Job Seekers</option>
                  <option value="employer">Employers</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.avatar}
                          alt={user.name}
                        />
                        <div className="ml-4">
                          <div className="text-xs font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-xs text-gray-900">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        {user.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(user.status)}>
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details Modal */}
        {showUserDetails && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    User Details
                  </h2>
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-6">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedUser.name}
                    </h3>
                    <p className="text-gray-500">{selectedUser.email}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {getRoleBadge(selectedUser.role)}
                      <span className={getStatusBadge(selectedUser.status)}>
                        {selectedUser.status.charAt(0).toUpperCase() +
                          selectedUser.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-xs text-gray-600">
                          {selectedUser.email}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-xs text-gray-600">
                          {selectedUser.phone}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-xs text-gray-600">
                          {selectedUser.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Account Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-xs text-gray-600">
                            Joined:{" "}
                            {new Date(
                              selectedUser.joinDate
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-600">
                            Last Active:{" "}
                            {new Date(
                              selectedUser.lastActive
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role-specific Information */}
                {selectedUser.role === "job_seeker" && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Job Seeker Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">
                          <strong>Current Title:</strong>{" "}
                          {selectedUser.jobTitle}
                        </p>
                        <p className="text-xs text-gray-600">
                          <strong>Experience:</strong> {selectedUser.experience}
                        </p>
                        <p className="text-xs text-gray-600">
                          <strong>Profile Complete:</strong>{" "}
                          {selectedUser.profileComplete}%
                        </p>
                        <p className="text-xs text-gray-600">
                          <strong>Resume Uploaded:</strong>{" "}
                          {selectedUser.resumeUploaded ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-2">
                          <strong>Skills:</strong>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.skills?.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedUser.role === "employer" && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Employer Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">
                          <strong>Company:</strong> {selectedUser.company}
                        </p>
                        <p className="text-xs text-gray-600">
                          <strong>Industry:</strong> {selectedUser.industry}
                        </p>
                        <p className="text-xs text-gray-600">
                          <strong>Company Size:</strong>{" "}
                          {selectedUser.companySize}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">
                          <strong>Jobs Posted:</strong>{" "}
                          {selectedUser.jobsPosted}
                        </p>
                        <p className="text-xs text-gray-600">
                          <strong>Active Jobs:</strong>{" "}
                          {selectedUser.activeJobs}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Send Message
                  </button>
                  <button className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Edit User
                  </button>
                  <button className="px-4 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                    Suspend User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsersPage;
