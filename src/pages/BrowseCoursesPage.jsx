import React, { useEffect, useState } from "react";
import { Clock, User, Star, BookOpen, Users } from "lucide-react";
import { url } from "../../api";
import axios from "axios";

const BrowseCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);

  const categories = [
    "all",
    "Programming",
    "Design",
    "Marketing",
    "Business",
    "Data Science",
    "Photography",
  ];

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch only published courses for browsing
      const response = await axios.get(`${url}courses`);
      console.log("Fetched courses:", response.data);

      // Handle both array response and object with courses property
      const coursesData = Array.isArray(response.data)
        ? response.data
        : response.data.courses || [];

      // Filter only published courses
      const publishedCourses = coursesData.filter(
        (course) => course.published === true
      );
      setCourses(publishedCourses);
    } catch (err) {
      console.error("Failed to load courses:", err);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.category === filter);

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEnrollCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("authToken");

      // Make enrollment API call
      const response = await axios.post(
        `${url}courses/${courseId}/enroll`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Successfully enrolled in the course!");

      // Update local state to reflect enrollment
      setCourses(
        courses.map((course) =>
          course._id === courseId
            ? { ...course, enrollments: course.enrollments + 1 }
            : course
        )
      );
    } catch (err) {
      console.error("Enrollment failed:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to enroll in course";
      alert(errorMessage);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-2 text-xs">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-lg">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Error Loading Courses
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={fetchCourses}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-xs">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto md:px-6 py-2">
          <h1 className="md:text-3xl text-xl font-bold text-gray-900 mb-2">
            Browse Courses
          </h1>
          <p className="text-sm text-gray-600">
            Discover your next learning adventure
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-2">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-1 text-xs rounded-full font-medium transition-all ${
                  filter === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category === "all" ? "All Courses" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-10 w-10 text-gray-400 mb-4" />
            <h3 className="text-xs font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">
              {filter === "all"
                ? "No published courses available at the moment."
                : "Try adjusting your filters to see more courses."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold group-hover:scale-105 transition-transform duration-300"
                    style={{ display: course.thumbnail ? "none" : "flex" }}
                  >
                    {course.title.charAt(0).toUpperCase()}
                  </div>

                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        course.difficulty
                      )}`}
                    >
                      {course.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-sm">
                    <span className="text-sm font-bold text-blue-600">
                      {course.price ? `$${course.price}` : "Free"}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center mb-3 text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    <span>{course.instructor || "TBD"}</span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration || "Self-paced"}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.enrollments || 0} enrolled</span>
                    </div>
                  </div>

                  {/* Course Modules Count */}
                  {course.modules && course.modules.length > 0 && (
                    <div className="mb-4 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 inline mr-1" />
                      <span>
                        {course.modules.length} module
                        {course.modules.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEnrollCourse(course._id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                    >
                      Enroll Now
                    </button>
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

export default BrowseCoursesPage;
