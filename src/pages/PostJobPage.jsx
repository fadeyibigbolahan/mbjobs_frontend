import { useState } from "react";
import { url } from "../../api";
import axios from "axios";

const PostJobPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${url}jobs`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Optional: include token if auth is required
        },
      });
      console.log("Job submitted", response.data);
      setFormData({
        title: "",
        category: "",
        location: "",
        description: "",
        requirements: "",
        salaryMin: "",
        salaryMax: "",
        // deadline: "",
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error posting job:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 space-y-4 text-xs">
      <h2 className="text-xl font-semibold mb-2">Post a Job</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full outline-none"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full outline-none"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="IT">IT</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Job Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full outline-none"
        />
      </div>

      <textarea
        name="description"
        placeholder="Job Description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
        className="border rounded p-2 w-full outline-none"
      />

      <textarea
        name="requirements"
        placeholder="Job Requirements"
        rows="4"
        value={formData.requirements}
        onChange={handleChange}
        required
        className="border rounded p-2 w-full outline-none"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="salaryMin"
          placeholder="Min Salary"
          value={formData.salaryMin}
          onChange={handleChange}
          className="border rounded p-2 w-full outline-none"
        />

        <input
          type="number"
          name="salaryMax"
          placeholder="Max Salary"
          value={formData.salaryMax}
          onChange={handleChange}
          className="border rounded p-2 w-full outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post Job
      </button>
    </form>
  );
};

export default PostJobPage;
