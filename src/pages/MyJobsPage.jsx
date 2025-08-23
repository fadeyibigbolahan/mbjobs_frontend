import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../api";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate fetching jobs with more realistic data
  useEffect(() => {
    const mockJobs = [
      {
        id: "1",
        title: "Senior Frontend Developer",
        status: "Open",
        datePosted: "2025-06-01",
        applicants: 24,
        location: "Remote",
        salary: "$80,000 - $120,000",
        department: "Engineering",
      },
      {
        id: "2",
        title: "UI/UX Designer",
        status: "Closed",
        datePosted: "2025-05-15",
        applicants: 18,
        location: "New York, NY",
        salary: "$65,000 - $85,000",
        department: "Design",
      },
      {
        id: "3",
        title: "Customer Support Agent",
        status: "Expired",
        datePosted: "2025-04-10",
        applicants: 12,
        location: "Austin, TX",
        salary: "$40,000 - $50,000",
        department: "Support",
      },
      {
        id: "4",
        title: "Product Manager",
        status: "Open",
        datePosted: "2025-05-25",
        applicants: 31,
        location: "San Francisco, CA",
        salary: "$100,000 - $140,000",
        department: "Product",
      },
      {
        id: "5",
        title: "DevOps Engineer",
        status: "Open",
        datePosted: "2025-05-28",
        applicants: 19,
        location: "Remote",
        salary: "$90,000 - $130,000",
        department: "Engineering",
      },
    ];
    // setJobs(mockJobs);
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Redirect to login or handle unauthenticated state
      navigate("/signin");
    }
    axios
      .get(`${url}jobs/employer/jobs`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("Fetched jobs:", response.data);
        setJobs(response.data.jobs);
        // setJobs(mockJobs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      Open: "bg-green-100 text-green-800 border-green-200",
      Expired: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Closed: "bg-red-100 text-red-800 border-red-200",
    };
    return badges[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectJob = (jobId) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    setSelectedJobs(
      selectedJobs.length === filteredJobs.length
        ? []
        : filteredJobs.map((job) => job.id)
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

  return (
    <div className="max-w-7xl mx-auto p-6 text-xs">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Job Postings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track your job listings
            </p>
          </div>
          <Link to="/dashboard/post-job">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <Plus size={20} />
              Post New Job
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open</p>
              <p className="text-2xl font-bold text-green-600">
                {jobs.filter((j) => j.status === "Open").length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Applicants
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {jobs.reduce((sum, job) => sum + job.applicantCount, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg. Applicants
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(
                  jobs.reduce((sum, job) => sum + job.applicantCount, 0) /
                    jobs.length
                )}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Filter className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-2 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search jobs by title or department..."
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
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Expired">Expired</option>
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
                      selectedJobs.length === filteredJobs.length &&
                      filteredJobs.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Job Title
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Applicants
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Location
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Salary
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Posted
                </th>
                <th className="text-center p-4 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => handleSelectJob(job.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.department}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="font-semibold text-gray-900">
                        {job.applicantCount}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{job.location}</td>
                  <td className="p-4 text-gray-600">{`$${job.salaryMin} - $${job.salaryMax}`}</td>
                  <td className="p-4 text-gray-600">
                    {formatDate(job.createdAt)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Job"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="View Applicants"
                      >
                        <Users size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="More Options"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-gray-100 p-4 rounded-full">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          No jobs found
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
        {selectedJobs.length > 0 && (
          <div className="p-4 bg-blue-50 border-t border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">
                {selectedJobs.length} job{selectedJobs.length > 1 ? "s" : ""}{" "}
                selected
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                  Bulk Edit
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors">
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
