import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  Users,
  Briefcase,
  Award,
  Settings,
  Edit3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { url } from "../../api";

// Mock data for demonstration - replace with actual API data
const mockUserData = {
  _id: "123456",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  profileImage: "",
  role: "employer", // Change this to "apprentice" or "admin" to see different views
  subscription: {
    planId: "premium-plan",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    status: "active",
  },
  verified: true,
  companyName: "Tech Solutions Inc.",
  companyLogo: "",
  bio: "Experienced technology company focused on innovative solutions and apprenticeship programs.",
  currentEmployment: null,
  employmentHistory: ["emp1", "emp2"],
  postedJobs: ["job1", "job2", "job3"],
  employees: [
    { employee: "emp1", hireDate: "2024-01-20", status: "active" },
    { employee: "emp2", hireDate: "2024-02-15", status: "active" },
  ],
  unreadMessages: 5,
  blockedUsers: [],
  apprenticeCategories: ["category1", "category2"],
  createdAt: "2023-12-01",
};

const UserProfilePage = () => {
  const [user, setUser] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "terminated":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "employer":
        return <Building className="w-5 h-5" />;
      case "apprentice":
        return <User className="w-5 h-5" />;
      case "admin":
        return <Settings className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "employer":
        return "bg-blue-100 text-blue-800";
      case "apprentice":
        return "bg-green-100 text-green-800";
      case "admin":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${url}users/me`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("user data", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-white py-8 text-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                {user.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.fullName}
                </h1>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {getRoleIcon(user.role)}
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>

                  {user.role === "employer" && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                        user.subscription.status
                      )}`}
                    >
                      {user.subscription.status.charAt(0).toUpperCase() +
                        user.subscription.status.slice(1)}{" "}
                      Subscription
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => navigate("/dashboard/profile-settings")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            {user.bio && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About
                </h2>
                <p className="text-gray-700 leading-relaxed">{user.bio}</p>
              </div>
            )}

            {/* Role-specific content */}
            {user.role === "employer" && (
              <>
                {/* Company Info */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Company Information
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {user.companyLogo ? (
                        <img
                          src={user.companyLogo}
                          alt="Company Logo"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <Building className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {user.companyName}
                      </h3>
                      <p className="text-gray-600">Employer</p>
                    </div>
                  </div>
                </div>

                {/* Employee Management */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Current Employees
                  </h2>
                  {user.employees.length > 0 ? (
                    <div className="space-y-3">
                      {user.employees.map((emp, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium">
                                Employee {index + 1}
                              </p>
                              <p className="text-sm text-gray-600">
                                Hired {formatDate(emp.hireDate)}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                              emp.status
                            )}`}
                          >
                            {emp.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No current employees</p>
                  )}
                </div>

                {/* Posted Jobs */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Job Postings
                  </h2>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-medium">
                      {user.postedJobs.length}
                    </span>
                    <span className="text-gray-600">jobs posted</span>
                  </div>
                </div>
              </>
            )}

            {user.role === "apprentice" && (
              <>
                {/* Current Employment */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Current Employment
                  </h2>
                  {user.currentEmployment ? (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">
                          Currently Employed
                        </p>
                        <p className="text-sm text-green-700">
                          Active apprenticeship
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <p className="text-gray-600">Not currently employed</p>
                    </div>
                  )}
                </div>

                {/* Employment History */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Employment History
                  </h2>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-medium">
                      {user.employmentHistory.length}
                    </span>
                    <span className="text-gray-600">previous positions</span>
                  </div>
                </div>

                {/* Categories */}
                {user.apprenticeCategories.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Interest Categories
                    </h2>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="text-lg font-medium">
                        {user.apprenticeCategories.length}
                      </span>
                      <span className="text-gray-600">categories</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {user.role === "admin" && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Admin Dashboard
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">System Admin</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Full system access
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Management Tools</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      User & system management
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Info */}
            {user.role === "employer" && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Subscription
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        user.subscription.status
                      )}`}
                    >
                      {user.subscription.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date</span>
                    <span className="text-sm">
                      {formatDate(user.subscription.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date</span>
                    <span className="text-sm">
                      {formatDate(user.subscription.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Activity
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Unread Messages</span>
                  <span className="font-medium text-blue-600">
                    {user.unreadMessages}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Blocked Users</span>
                  <span className="font-medium">
                    {user.blockedUsers.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verified</span>
                  <span
                    className={`font-medium ${
                      user.verified ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.verified ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {user.role === "employer" && (
                  <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Update Subscription
                  </button>
                )}
                <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Change Password
                </button>
                <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Privacy Settings
                </button>
                {user.role === "employer" && (
                  <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Post New Job
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
