import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Upload,
  Eye,
  EyeOff,
  Calendar,
  Users,
  Clock,
  Tag,
} from "lucide-react";
import { url } from "../../api";
import axios from "axios";

const CreateCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner",
    duration: "",
    price: "",
    instructor: "",
    published: false,
    thumbnail: "",
    modules: [],
  });

  const categories = [
    "Programming",
    "Design",
    "Marketing",
    "Business",
    "Data Science",
    "Photography",
  ];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${url}courses`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("Courses", res.data);

        // Handle both array response and object with courses property
        const coursesData = Array.isArray(res.data)
          ? res.data
          : res.data.courses || [];
        setCourses(coursesData);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        alert("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      difficulty: "Beginner",
      duration: "",
      price: "",
      instructor: "",
      published: false,
      thumbnail: "",
      modules: [],
    });
    setEditingCourse(null);
    setIsCreating(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course._id); // Use _id from MongoDB
    // Map the course data to match form structure
    setFormData({
      title: course.title || "",
      description: course.description || "",
      category: course.category || "",
      difficulty: course.difficulty || "Beginner",
      duration: course.duration || "",
      price: course.price || "",
      instructor: course.instructor || "",
      published: course.published || false,
      thumbnail: course.thumbnail || "",
      modules: course.modules || [],
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsCreating(true);
  };

  const handleSave = async () => {
    console.log("Save called");
    try {
      if (!formData.title || !formData.description || !formData.category) {
        alert("Please fill in all required fields");
        return;
      }

      const token = localStorage.getItem("authToken");

      if (editingCourse) {
        // Update existing course
        const res = await axios.put(
          `${url}courses/${editingCourse}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        console.log("Course updated", res.data);

        // Update the course in the local state
        setCourses(
          courses.map((course) =>
            course._id === editingCourse ? res.data.course || res.data : course
          )
        );
      } else {
        // Create new course
        const res = await axios.post(`${url}courses`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        console.log("Course created", res.data);

        // Add the new course to the local state
        const newCourse = res.data.course || res.data;
        setCourses([...courses, newCourse]);
      }

      resetForm();
    } catch (err) {
      console.error("Failed to save course:", err);
      alert(
        "Failed to save course: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`${url}courses/${courseId}`, {
          headers: {
            Authorization: token,
          },
        });

        setCourses(courses.filter((course) => course._id !== courseId));
      } catch (err) {
        console.error("Failed to delete course:", err);
        alert("Failed to delete course. Please try again.");
      }
    }
  };

  const togglePublished = async (courseId) => {
    try {
      const course = courses.find((c) => c._id === courseId);
      const token = localStorage.getItem("authToken");

      const res = await axios.put(
        `${url}courses/${courseId}`,
        {
          ...course,
          published: !course.published,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      setCourses(
        courses.map((course) =>
          course._id === courseId
            ? { ...course, published: !course.published }
            : course
        )
      );
    } catch (err) {
      console.error("Failed to update course status:", err);
      alert("Failed to update course status. Please try again.");
    }
  };

  const addModule = () => {
    const newModule = {
      // _id: Date.now(), // Temporary ID for new modules
      title: "",
      text: "",
      media: "",
      duration: "",
      quiz: [],
    };
    setFormData({
      ...formData,
      modules: [...(formData.modules || []), newModule],
    });
  };

  const updateModule = (moduleId, field, value) => {
    setFormData({
      ...formData,
      modules: formData.modules.map((module) =>
        module._id === moduleId ? { ...module, [field]: value } : module
      ),
    });
  };

  const removeModule = (moduleId) => {
    setFormData({
      ...formData,
      modules: formData.modules.filter((module) => module._id !== moduleId),
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isEditing = editingCourse || isCreating;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen text-xs">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen text-xs">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Course Management</h1>
              <p className="text-blue-100 mt-1">
                Create, edit, and manage your courses
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              New Course
            </button>
          </div>
        </div>

        <div className="p-6">
          {isEditing ? (
            /* Course Form */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {isCreating ? "Create New Course" : "Edit Course"}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    {isCreating ? "Create Course" : "Update Course"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 border-b pb-2">
                    Basic Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter course title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter course description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Difficulty
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            difficulty: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {difficulties.map((diff) => (
                          <option key={diff} value={diff}>
                            {diff}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 border-b pb-2">
                    Course Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 8 weeks"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        value={formData.price || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: parseFloat(e.target.value) || null,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructor
                    </label>
                    <input
                      type="text"
                      value={formData.instructor}
                      onChange={(e) =>
                        setFormData({ ...formData, instructor: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Instructor name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thumbnail URL
                    </label>
                    <input
                      type="text"
                      value={formData.thumbnail}
                      onChange={(e) =>
                        setFormData({ ...formData, thumbnail: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published: e.target.checked,
                        })
                      }
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="published"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Publish course immediately
                    </label>
                  </div>
                </div>
              </div>

              {/* Course Modules */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Course Modules</h3>
                  <button
                    onClick={addModule}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center gap-1 text-sm"
                  >
                    <Plus size={14} />
                    Add Module
                  </button>
                </div>

                {formData.modules && formData.modules.length > 0 ? (
                  <div className="space-y-2">
                    {formData.modules.map((module, index) => (
                      <div
                        key={module._id}
                        className="flex gap-4 items-start p-3 rounded-lg"
                      >
                        <div>
                          <span className="text-sm font-medium text-gray-500 w-8">
                            {index + 1}.
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 items-center w-full">
                          <div className="flex gap-2 items-center rounded-lg w-full">
                            <input
                              type="text"
                              value={module.title}
                              onChange={(e) =>
                                updateModule(
                                  module._id,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Module title"
                              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              value={module.duration}
                              onChange={(e) =>
                                updateModule(
                                  module._id,
                                  "duration",
                                  e.target.value
                                )
                              }
                              placeholder="Duration"
                              className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => removeModule(module._id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <textarea
                            value={module.text}
                            onChange={(e) =>
                              updateModule(module._id, "text", e.target.value)
                            }
                            placeholder="Module content"
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No modules added yet
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Courses List */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  All Courses ({courses.length})
                </h2>
                <div className="text-sm text-gray-600">
                  {courses.filter((c) => c.published).length} published,{" "}
                  {courses.filter((c) => !c.published).length} draft
                </div>
              </div>

              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Upload size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No courses yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get started by creating your first course
                  </p>
                  <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Plus size={20} />
                    Create Your First Course
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          {course.thumbnail ? (
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs"
                            style={{
                              display: course.thumbnail ? "none" : "flex",
                            }}
                          >
                            No Image
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 truncate">
                                  {course.title}
                                </h3>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    course.published
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {course.published ? "Published" : "Draft"}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                {course.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={() => togglePublished(course._id)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                title={
                                  course.published ? "Unpublish" : "Publish"
                                }
                              >
                                {course.published ? (
                                  <EyeOff size={16} />
                                ) : (
                                  <Eye size={16} />
                                )}
                              </button>
                              <button
                                onClick={() => handleEdit(course)}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(course._id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Tag size={14} />
                              {course.category}
                            </div>
                            {course.duration && (
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {course.duration}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              {course.enrollments} enrolled
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(course.createdAt)}
                            </div>
                            <div className="ml-auto font-medium text-gray-900">
                              {course.price ? `$${course.price}` : "Free"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
