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
  Star,
  Download,
  Share2,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  FileText,
  Users,
  Award,
  Lock,
  PlayCircle,
  Pause,
  SkipForward,
  SkipBack,
  AlertCircle,
  MessageCircle,
  Heart,
  Flag,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../api";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [moduleProgress, setModuleProgress] = useState({});
  const [notes, setNotes] = useState("");
  const [discussionOpen, setDiscussionOpen] = useState(false);

  // Unified function to fetch course data from API
  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Fetch course data
      const response = await axios.get(`${url}courses/${courseId}`, {
        headers: {
          Authorization: token, // Added Bearer prefix (common practice)
        },
      });

      console.log("Course Data:", response.data.course);

      // Handle the API response
      const courseApiData = response.data.course;

      // Transform/normalize the API data if needed to match your component structure
      const normalizedCourseData = {
        ...courseApiData,
        // Add any missing fields with defaults
        modules: courseApiData.modules || [],
        instructor_info: courseApiData.instructor_info || {
          name: courseApiData.instructor || "Unknown Instructor",
          bio: "",
          avatar: "",
          courses: 0,
          students: 0,
          rating: 0,
        },
        reviews: courseApiData.reviews || [],
      };

      setCourseData(normalizedCourseData);

      // Fetch user's progress for this course
      await fetchCourseProgress(normalizedCourseData);
    } catch (err) {
      console.error("Error fetching course data:", err);

      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        const message =
          err.response.data?.message ||
          err.response.data?.error ||
          "Server error";

        switch (status) {
          case 401:
            setError("Authentication failed. Please log in again.");
            // Optionally redirect to login
            // window.location.href = '/login';
            break;
          case 403:
            setError("You don't have permission to access this course.");
            break;
          case 404:
            setError("Course not found.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError(`Error: ${message}`);
        }
      } else if (err.request) {
        // Network error
        setError("Network error. Please check your connection and try again.");
      } else {
        // Other error
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's progress for the course
  const fetchCourseProgress = async (courseData) => {
    try {
      const token = localStorage.getItem("authToken");

      // Try to fetch existing progress (you might need a GET endpoint for this)
      // For now, we'll simulate based on the course data
      // If you have a GET endpoint like: GET /courses/:id/progress

      const moduleProgressData = {};
      let completedModulesFromAPI = [];

      // You might want to add a GET endpoint to fetch progress
      // const progressResponse = await axios.get(`${url}courses/${courseId}/progress`, {
      //   headers: { Authorization: token }
      // });
      // completedModulesFromAPI = progressResponse.data.completedModules || [];

      // For now, initialize based on course data
      if (courseData.modules && courseData.modules.length > 0) {
        // Find current module (either marked as current or first incomplete)
        const currentModuleIndex = courseData.modules.findIndex(
          (m) => m.current
        );
        const firstIncompleteIndex = courseData.modules.findIndex(
          (m) => !m.completed
        );

        setCurrentModule(
          currentModuleIndex !== -1
            ? currentModuleIndex
            : firstIncompleteIndex !== -1
            ? firstIncompleteIndex
            : 0
        );

        // Initialize module progress based on completed status
        courseData.modules.forEach((module, index) => {
          // Check if module ID is in completedModulesFromAPI (when you implement GET endpoint)
          const isCompleted =
            module.completed || completedModulesFromAPI.includes(module._id);
          moduleProgressData[index] = isCompleted
            ? 100
            : module.current
            ? 50
            : 0;

          // Update the module completed status
          courseData.modules[index].completed = isCompleted;
        });

        setModuleProgress(moduleProgressData);

        // Calculate overall progress
        const completedCount = Object.values(moduleProgressData).filter(
          (p) => p === 100
        ).length;
        const totalProgress =
          (completedCount / courseData.modules.length) * 100;
        setProgress(totalProgress);
      }
    } catch (err) {
      console.error("Error fetching course progress:", err);
      // Don't throw error here, just log it as progress fetch is not critical for initial load
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    } else {
      setError("Course ID is required.");
      setLoading(false);
    }
  }, [courseId]);

  const handleModuleComplete = async () => {
    try {
      const currentModuleId = courseData.modules[currentModule]._id;

      // Check if module is already completed to avoid duplicate API calls
      if (moduleProgress[currentModule] === 100) {
        console.log("Module already completed");
        return;
      }

      // Update local state immediately for better UX
      const newProgress = { ...moduleProgress };
      newProgress[currentModule] = 100;
      setModuleProgress(newProgress);

      // Send progress update to API (only requires moduleId based on your backend)
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await axios.post(
          `${url}courses/${courseId}/progress`,
          {
            moduleId: currentModuleId, // This is all your API needs
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        // Update progress based on API response
        if (response.data.success) {
          setProgress(response.data.progress);
          console.log(`Course progress updated: ${response.data.progress}%`);
          console.log(
            `Completed modules: ${response.data.completedModules.length}`
          );

          // Update courseData with the latest completion status
          const updatedCourseData = { ...courseData };
          updatedCourseData.modules[currentModule].completed = true;
          setCourseData(updatedCourseData);

          // Optionally show success feedback to user
          // You could add a toast notification here
        }
      }
    } catch (err) {
      console.error("Error updating course progress:", err);

      // Revert local state if API call fails
      const revertedProgress = { ...moduleProgress };
      revertedProgress[currentModule] = courseData.modules[currentModule]
        .completed
        ? 100
        : 0;
      setModuleProgress(revertedProgress);

      // Handle different error types
      if (err.response) {
        const status = err.response.status;
        const message =
          err.response.data?.message || "Failed to update progress";

        switch (status) {
          case 400:
            console.error(`Bad request: ${message}`);
            // Could be invalid module ID
            break;
          case 401:
            console.error("Authentication failed while updating progress");
            // Redirect to login or refresh token
            break;
          case 403:
            console.error(
              "Permission denied: Make sure you have apprentice role"
            );
            break;
          case 404:
            console.error("Course not found");
            break;
          default:
            console.error(`Error updating progress: ${message}`);
        }
      } else if (err.request) {
        console.error("Network error while updating progress");
      } else {
        console.error("Unexpected error:", err.message);
      }

      // Optionally show error notification to user
      // You could add a toast notification here
    }
  };

  const handleNextModule = () => {
    if (currentModule < courseData.modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  const handlePrevModule = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
    }
  };

  const handleSaveNotes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token && notes.trim()) {
        await axios.post(
          `${url}courses/${courseId}/modules/${courseData.modules[currentModule]._id}/notes`,
          { notes: notes.trim() },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // Optionally show success message
        console.log("Notes saved successfully");
      }
    } catch (err) {
      console.error("Error saving notes:", err);
      // Optionally show error message
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <AlertCircle className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            Error Loading Course
          </h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchCourseData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white">No course data available.</p>
        </div>
      </div>
    );
  }

  const currentModuleData = courseData.modules?.[currentModule];

  if (!currentModuleData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white">No modules available for this course.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <button className="flex items-center text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to My Courses
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Progress: {Math.round(progress)}%
            </div>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-80" : "w-0"
          } lg:w-80 bg-gray-800 border-r border-gray-700 transition-all duration-300 overflow-hidden`}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold truncate mb-2">
              {courseData.title}
            </h2>
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <User className="h-4 w-4 mr-1" />
              <span>
                {courseData.instructor || courseData.instructor_info?.name}
              </span>
            </div>

            {/* Module List */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300 mb-3">
                Course Content
              </h3>
              {courseData?.modules?.map((module, index) => (
                <div
                  key={module._id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    index === currentModule
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => setCurrentModule(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : index === currentModule ? (
                        <PlayCircle className="h-5 w-5" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-500" />
                      )}
                      <div>
                        <div className="font-medium text-sm">
                          {module.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {module.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Module Progress */}
                  <div className="mt-2 w-full bg-gray-600 rounded-full h-1">
                    <div
                      className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${moduleProgress[index] || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Course Info */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Duration</span>
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Difficulty</span>
                  <span>{courseData.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Students</span>
                  <span>{courseData.enrollments?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center space-x-1">
                    <span>{courseData.rating || 0}</span>
                    <div className="flex">
                      {renderStars(courseData.rating || 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Player Area */}
          <div className="bg-black aspect-video flex items-center justify-center relative">
            {/* You can replace this with an actual video player */}
            <div className="text-center">
              <div className="bg-gray-800 rounded-full p-4 mb-4 inline-block">
                <Play className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {currentModuleData.title}
              </h3>
              <p className="text-gray-400">{currentModuleData.duration}</p>

              {/* Module Progress Display */}
              <div className="mt-4">
                <div className="text-sm text-gray-400 mb-2">
                  Module Status:{" "}
                  {moduleProgress[currentModule] === 100
                    ? "Completed"
                    : "In Progress"}
                </div>
                <div className="w-64 mx-auto bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${moduleProgress[currentModule] || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-blue-600 hover:bg-blue-700 rounded-full p-2"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </button>
                  <button
                    onClick={handlePrevModule}
                    disabled={currentModule === 0}
                  >
                    <SkipBack
                      className={`h-5 w-5 ${
                        currentModule === 0
                          ? "text-gray-600"
                          : "text-white hover:text-blue-400"
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleNextModule}
                    disabled={currentModule === courseData.modules.length - 1}
                  >
                    <SkipForward
                      className={`h-5 w-5 ${
                        currentModule === courseData.modules.length - 1
                          ? "text-gray-600"
                          : "text-white hover:text-blue-400"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                  <button>
                    <Settings className="h-5 w-5" />
                  </button>
                  <button>
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="border-b border-gray-700 bg-gray-800">
            <div className="flex space-x-8 px-6">
              <button className="py-4 border-b-2 border-blue-500 text-blue-400 font-medium">
                Overview
              </button>
              <button
                className="py-4 text-gray-400 hover:text-white"
                onClick={() => setShowNotes(!showNotes)}
              >
                Notes
              </button>
              <button
                className="py-4 text-gray-400 hover:text-white"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                Transcript
              </button>
              <button
                className="py-4 text-gray-400 hover:text-white"
                onClick={() => setDiscussionOpen(!discussionOpen)}
              >
                Discussion
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Module Content */}
              <div className="max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">
                    {currentModuleData.title}
                  </h1>
                  <button
                    onClick={handleModuleComplete}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    disabled={moduleProgress[currentModule] === 100}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>
                      {moduleProgress[currentModule] === 100
                        ? "Completed"
                        : "Mark Complete"}
                    </span>
                  </button>
                </div>

                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {currentModuleData.text || currentModuleData.description}
                  </p>
                </div>

                {/* Module Resources */}
                {currentModuleData.resources &&
                  currentModuleData.resources.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Resources
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentModuleData.resources.map((resource, index) => (
                          <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-blue-400" />
                              <span>{resource.name || resource}</span>
                            </div>
                            <button className="text-blue-400 hover:text-blue-300">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Quiz Section */}
                {currentModuleData.quiz &&
                  currentModuleData.quiz.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">
                        Knowledge Check
                      </h3>
                      <div className="bg-gray-800 rounded-lg p-6">
                        {currentModuleData.quiz.map((question, qIndex) => (
                          <div key={qIndex} className="mb-6">
                            <h4 className="font-medium mb-4">
                              {question.question}
                            </h4>
                            <div className="space-y-2">
                              {question.options?.map((option, oIndex) => (
                                <label
                                  key={oIndex}
                                  className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name={`question-${qIndex}`}
                                    className="text-blue-500"
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                          Submit Quiz
                        </button>
                      </div>
                    </div>
                  )}

                {/* Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-700">
                  <button
                    onClick={handlePrevModule}
                    disabled={currentModule === 0}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      currentModule === 0
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-white bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>

                  <div className="text-center">
                    <div className="text-sm text-gray-400">
                      Module {currentModule + 1} of {courseData.modules.length}
                    </div>
                  </div>

                  <button
                    onClick={handleNextModule}
                    disabled={currentModule === courseData.modules.length - 1}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      currentModule === courseData.modules.length - 1
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-white bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Panel */}
      {showNotes && (
        <div className="fixed right-0 top-0 h-full w-80 bg-gray-800 border-l border-gray-700 z-50">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold">My Notes</h3>
            <button onClick={() => setShowNotes(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes here..."
              className="w-full h-64 bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none"
            />
            <button
              onClick={handleSaveNotes}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}

      {/* Transcript Panel */}
      {showTranscript && (
        <div className="fixed right-0 top-0 h-full w-80 bg-gray-800 border-l border-gray-700 z-50">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold">Transcript</h3>
            <button onClick={() => setShowTranscript(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-full">
            <p className="text-gray-300 leading-relaxed">
              {currentModuleData.transcript ||
                "Transcript not available for this module."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
