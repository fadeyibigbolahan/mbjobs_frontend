import React, { useEffect, useState } from "react";
import {
  Play,
  Clock,
  BookOpen,
  CheckCircle,
  Calendar,
  Trophy,
  BarChart3,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../api";

const MyCoursesPage = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);

  // Transform API enrollment data to match component structure
  const transformEnrollmentData = (enrollments) => {
    return enrollments.map((enrollment) => {
      const course = enrollment.course;

      // Calculate progress-based status
      let status = "just-started";
      if (enrollment.progress === 0) {
        status = "just-started";
      } else if (enrollment.progress >= 100) {
        status = "completed";
      } else {
        status = "in-progress";
      }

      // Calculate lessons (using modules as lessons)
      const totalLessons = course.modules ? course.modules.length : 0;
      const completedLessons = Math.floor(
        (enrollment.progress / 100) * totalLessons
      );

      // Get current and next lesson
      let currentLesson = "Getting Started";
      let nextLesson = null;

      if (course.modules && course.modules.length > 0) {
        if (completedLessons < course.modules.length) {
          currentLesson =
            course.modules[completedLessons]?.title || "Getting Started";
          if (completedLessons + 1 < course.modules.length) {
            nextLesson = course.modules[completedLessons + 1]?.title;
          }
        } else {
          currentLesson = "Course Complete!";
          nextLesson = null;
        }
      }

      // Estimate time spent based on progress (rough calculation)
      const estimatedTotalHours = totalLessons * 2; // Assume 2 hours per module
      const timeSpentHours = Math.floor(
        (enrollment.progress / 100) * estimatedTotalHours
      );
      const timeSpentMinutes = Math.floor(
        ((enrollment.progress / 100) * estimatedTotalHours - timeSpentHours) *
          60
      );
      const timeSpent = `${timeSpentHours}h ${timeSpentMinutes}m`;

      // Calculate estimated time left
      const remainingHours = estimatedTotalHours - timeSpentHours;
      const estimatedTimeLeft =
        remainingHours > 0 ? `${remainingHours}h` : "0h";

      return {
        _id: enrollment._id,
        title: course.title,
        instructor: course.instructor,
        description: course.description,
        coverImage:
          course.thumbnail ||
          `https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop`,
        progress: enrollment.progress,
        totalLessons,
        completedLessons,
        currentLesson,
        nextLesson,
        timeSpent,
        enrolledDate: enrollment.createdAt,
        lastAccessed: enrollment.updatedAt,
        status,
        category: course.category,
        difficulty: course.difficulty,
        certificateEligible: true,
        certificateEarned: enrollment.progress >= 100,
        estimatedTimeLeft,
        courseId: course._id,
        rating: course.rating || 0,
        enrollments: course.enrollments || 0,
      };
    });
  };

  const fetchMyCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.get(`${url}courses/my/course`, {
        headers: {
          Authorization: token,
        },
      });

      console.log("Raw API response:", response.data.courses);

      // Transform the enrollment data
      const transformedCourses = transformEnrollmentData(response.data.courses);
      console.log("Transformed courses:", transformedCourses);

      setMyCourses(transformedCourses);
    } catch (err) {
      console.error("Failed to load courses:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load courses"
      );

      // For development: fall back to mock data if API fails
      if (process.env.NODE_ENV === "development") {
        console.log("Falling back to mock data for development");
        setMyCourses(mockEnrolledCourses);
      }
    } finally {
      setLoading(false);
    }
  };

  // Mock data for development/fallback
  const mockEnrolledCourses = [
    {
      _id: "1",
      title: "Complete React Development Course",
      instructor: "Sarah Johnson",
      description:
        "Master React from basics to advanced concepts including hooks, context, and modern patterns.",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      progress: 65,
      totalLessons: 48,
      completedLessons: 31,
      currentLesson: "React Context API Deep Dive",
      nextLesson: "Custom Hooks Workshop",
      timeSpent: "24h 30m",
      enrolledDate: "2024-11-15",
      lastAccessed: "2025-06-04",
      status: "in-progress",
      category: "Development",
      difficulty: "Intermediate",
      certificateEligible: true,
      estimatedTimeLeft: "12h 15m",
    },
  ];

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const filterOptions = [
    { key: "all", label: "All Courses" },
    { key: "in-progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
    { key: "just-started", label: "Just Started" },
  ];

  const filteredCourses =
    filter === "all"
      ? myCourses
      : myCourses.filter((course) => course.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "just-started":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "just-started":
        return "Just Started";
      default:
        return "Unknown";
    }
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  // Calculate overall stats
  const totalCourses = myCourses.length;
  const completedCourses = myCourses.filter(
    (c) => c.status === "completed"
  ).length;
  const inProgressCourses = myCourses.filter(
    (c) => c.status === "in-progress"
  ).length;
  const totalTimeSpent = myCourses.reduce((acc, course) => {
    const hours = parseFloat(course.timeSpent.split("h")[0]) || 0;
    return acc + hours;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="flex flex-col items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-0 mt-4 text-base sm:text-lg text-center">
            Loading your courses...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
            <div className="text-red-600 mb-4">
              <BookOpen className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-red-900 mb-2">
              Failed to Load Courses
            </h3>
            <p className="text-red-700 mb-4 text-sm sm:text-base">{error}</p>
            <button
              onClick={fetchMyCourses}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Stats */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center justify-between mb-4 sm:mb-6">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                My Learning
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Continue your learning journey
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 w-full lg:w-auto">
              <div className="bg-blue-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-auto mb-1" />
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                  {totalCourses}
                </div>
                <div className="text-xs text-gray-600">Total Courses</div>
              </div>
              <div className="bg-green-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mx-auto mb-1" />
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                  {completedCourses}
                </div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div className="bg-yellow-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <Play className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mx-auto mb-1" />
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600">
                  {inProgressCourses}
                </div>
                <div className="text-xs text-gray-600">In Progress</div>
              </div>
              <div className="bg-purple-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mx-auto mb-1" />
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                  {totalTimeSpent.toFixed(0)}h
                </div>
                <div className="text-xs text-gray-600">Time Spent</div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={`px-3 sm:px-4 lg:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                  filter === option.key
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <BookOpen className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              {filter === "all" ? "No enrolled courses" : "No courses found"}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base px-4">
              {filter === "all"
                ? "Start learning by enrolling in some courses!"
                : "Try adjusting your filters or enroll in some courses!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Course Image */}
                  <div className="w-full lg:w-80 h-48 sm:h-56 lg:h-auto relative flex-shrink-0">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop";
                      }}
                    />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          course.status
                        )}`}
                      >
                        {getStatusLabel(course.status)}
                      </span>
                    </div>
                    {course.certificateEarned && (
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4">
                          <div className="flex-1 mb-3 sm:mb-0 sm:pr-4">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                              {course.title}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-2 text-sm sm:text-base">
                              <div className="flex items-center mb-1 sm:mb-0">
                                <User className="h-4 w-4 mr-1 flex-shrink-0" />
                                <span className="truncate">
                                  {course.instructor}
                                </span>
                              </div>
                              <span className="hidden sm:inline mx-2">•</span>
                              <span className="text-sm">
                                {course.difficulty}
                              </span>
                            </div>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <div className="text-xs sm:text-sm text-gray-500">
                              Last accessed
                            </div>
                            <div className="text-xs sm:text-sm font-medium">
                              {getDaysAgo(course.lastAccessed)}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
                          {course.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4 sm:mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {course.progress}% complete
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>
                              {course.completedLessons}/{course.totalLessons}{" "}
                              lessons
                            </span>
                            <span className="text-right">
                              {course.estimatedTimeLeft} remaining
                            </span>
                          </div>
                        </div>

                        {/* Current/Next Lesson */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-xs font-medium text-blue-600 mb-1">
                              CURRENT
                            </div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {course.currentLesson}
                            </div>
                          </div>
                          {course.nextLesson && (
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="text-xs font-medium text-gray-600 mb-1">
                                UP NEXT
                              </div>
                              <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                {course.nextLesson}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-6 text-sm text-gray-600 mb-4 sm:mb-6">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{course.timeSpent} spent</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>
                              Started {getDaysAgo(course.enrolledDate)}
                            </span>
                          </div>
                          {course.certificateEligible && (
                            <div className="flex items-center">
                              <Trophy className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span>Certificate eligible</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        {course.status === "completed" ? (
                          <>
                            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center text-sm sm:text-base">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              View Certificate
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base">
                              Review Course
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to={`/dashboard/course-details/${course.courseId}`}
                              className="flex-1"
                            >
                              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center text-sm sm:text-base">
                                <Play className="h-4 w-4 mr-2" />
                                Continue Learning
                              </button>
                            </Link>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center sm:w-auto">
                              <BarChart3 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage;
