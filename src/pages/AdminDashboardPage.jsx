import React, { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  BookOpen,
  FileText,
  TrendingUp,
  Activity,
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  AlertCircle,
  Building,
  GraduationCap,
} from "lucide-react";

// Mock data
const mockStats = {
  users: 12847,
  jobs: 3456,
  courses: 289,
  applications: 8934,
  activeUsers: 2341,
  companiesRegistered: 567,
  successfulPlacements: 1234,
  avgSalary: 75000,
};

const mockRecentActivity = [
  {
    id: 1,
    type: "user",
    message: "New user Sarah Johnson registered",
    time: "2 minutes ago",
    avatar: "SJ",
  },
  {
    id: 2,
    type: "job",
    message: "TechCorp posted Senior Developer position",
    time: "15 minutes ago",
    avatar: "TC",
  },
  {
    id: 3,
    type: "application",
    message: "John Doe applied for UX Designer role",
    time: "23 minutes ago",
    avatar: "JD",
  },
  {
    id: 4,
    type: "course",
    message: "New React Masterclass course added",
    time: "1 hour ago",
    avatar: "RC",
  },
  {
    id: 5,
    type: "placement",
    message: "Alice Smith successfully placed at StartupXYZ",
    time: "2 hours ago",
    avatar: "AS",
  },
];

const mockTopJobs = [
  {
    title: "Senior React Developer",
    company: "TechCorp",
    applications: 45,
    salary: "$90,000",
  },
  {
    title: "UX/UI Designer",
    company: "DesignHub",
    applications: 38,
    salary: "$75,000",
  },
  {
    title: "Data Scientist",
    company: "DataFlow",
    applications: 52,
    salary: "$95,000",
  },
  {
    title: "Product Manager",
    company: "InnovateCo",
    applications: 29,
    salary: "$85,000",
  },
];

const mockTopCourses = [
  { title: "Full Stack Web Development", enrollments: 234, rating: 4.8 },
  { title: "Machine Learning Fundamentals", enrollments: 189, rating: 4.7 },
  { title: "Digital Marketing Mastery", enrollments: 156, rating: 4.6 },
  { title: "Cloud Computing Essentials", enrollments: 143, rating: 4.9 },
];

const StatCard = ({ label, count, icon: Icon, color, trend, trendValue }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">
          {count.toLocaleString()}
        </p>
        {trend && (
          <div
            className={`flex items-center mt-2 text-sm ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 mr-1 ${trend === "down" ? "rotate-180" : ""}`}
            />
            <span>{trendValue}% from last month</span>
          </div>
        )}
      </div>
      <div className={`${color} bg-gray-50 p-3 rounded-lg`}>
        <Icon className="w-8 h-8" />
      </div>
    </div>
  </div>
);

const ActivityItem = ({ activity }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "user":
        return "bg-blue-100 text-blue-600";
      case "job":
        return "bg-green-100 text-green-600";
      case "application":
        return "bg-yellow-100 text-yellow-600";
      case "course":
        return "bg-purple-100 text-purple-600";
      case "placement":
        return "bg-emerald-100 text-emerald-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${getTypeColor(
          activity.type
        )}`}
      >
        {activity.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {activity.message}
        </p>
        <p className="text-xs text-gray-500">{activity.time}</p>
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(mockStats);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <Clock className="w-4 h-4 inline mr-1" />
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-600">
                <Calendar className="w-4 h-4 inline mr-1" />
                {currentTime.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Users"
            count={stats.users}
            icon={Users}
            color="text-blue-600"
            trend="up"
            trendValue={12.5}
          />
          <StatCard
            label="Active Jobs"
            count={stats.jobs}
            icon={Briefcase}
            color="text-green-600"
            trend="up"
            trendValue={8.2}
          />
          <StatCard
            label="Available Courses"
            count={stats.courses}
            icon={BookOpen}
            color="text-purple-600"
            trend="up"
            trendValue={15.7}
          />
          <StatCard
            label="Total Applications"
            count={stats.applications}
            icon={FileText}
            color="text-orange-600"
            trend="up"
            trendValue={23.1}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Active Users (24h)"
            count={stats.activeUsers}
            icon={Activity}
            color="text-indigo-600"
          />
          <StatCard
            label="Registered Companies"
            count={stats.companiesRegistered}
            icon={Building}
            color="text-cyan-600"
          />
          <StatCard
            label="Successful Placements"
            count={stats.successfulPlacements}
            icon={CheckCircle}
            color="text-emerald-600"
          />
          <StatCard
            label="Avg. Salary Offered"
            count={stats.avgSalary}
            icon={TrendingUp}
            color="text-rose-600"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Activity
                </h2>
              </div>
              <div className="p-3 max-h-96 overflow-y-auto">
                {mockRecentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Top Performing Jobs & Courses */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Jobs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                    Top Jobs
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  {mockTopJobs.map((job, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {job.title}
                        </h3>
                        <p className="text-xs text-gray-600">{job.company}</p>
                        <p className="text-xs text-green-600 font-medium">
                          {job.salary}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {job.applications} apps
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Courses */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                    Popular Courses
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  {mockTopCourses.map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {course.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {course.enrollments} enrolled
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Manage Users</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-green-700">
              <Briefcase className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Review Jobs</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-purple-700">
              <BookOpen className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Add Course</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-orange-700">
              <FileText className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
