import { useEffect, useState } from "react";
import axios from "axios";

const JobDetailPage = ({ jobId, isEmployer }) => {
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`/jobs/${jobId}`);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      }
    };

    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`/applications/job/${jobId}`);
        setApplicants(res.data);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
      }
    };

    fetchJobDetails();
    if (isEmployer) fetchApplicants();
  }, [jobId, isEmployer]);

  if (!job) return <p className="p-4">Loading job details...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">{job.title}</h2>
        <p className="text-gray-500">
          {job.category} • {job.location}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Posted on {new Date(job.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Job Description</h3>
        <p>{job.description}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Requirements</h3>
        <p>{job.requirements}</p>
      </div>

      <div>
        <h3 className="font-semibold">Salary</h3>
        <p>
          ${job.salaryMin} - ${job.salaryMax}
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Application Deadline</h3>
        <p>{new Date(job.deadline).toLocaleDateString()}</p>
      </div>

      {isEmployer && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Applicants</h3>
          {applicants.length === 0 ? (
            <p>No applicants yet.</p>
          ) : (
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Applicant</th>
                  <th className="p-2">Applied On</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((app) => (
                  <tr key={app._id} className="border-b">
                    <td className="p-2">{app.applicantName}</td>
                    <td className="p-2">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 capitalize">{app.status}</td>
                    <td className="p-2 space-x-2">
                      <button className="text-blue-600 hover:underline">
                        View
                      </button>
                      <button className="text-green-600 hover:underline">
                        Hire
                      </button>
                      <button className="text-red-600 hover:underline">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
