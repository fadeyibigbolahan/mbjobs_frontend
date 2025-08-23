import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../api";

const EmployerProfilePage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    email: "",
    bio: "",
    companyLogo: null,
  });

  const [loading, setLoading] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}users/me`, {
        headers: { Authorization: token },
      });

      setFormData({
        companyName: res.data.companyName || "",
        phone: res.data.phone || "",
        email: res.data.email || "",
        bio: res.data.bio || "",
        companyLogo: null,
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "companyLogo") {
      const file = e.target.files[0];
      setFormData({ ...formData, companyLogo: file });
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const data = new FormData();

    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      const res = await axios.put(`${url}users/employer/profile`, data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
    } catch (err) {
      alert("Update failed: " + err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-2 bg-white text-xs"
    >
      <h2 className="text-xl font-bold mb-4">Update Employer Profile</h2>

      <div className="mb-4">
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded outline-none"
          required
          placeholder="Company Name"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded outline-none"
          placeholder="Phone"
        />
      </div>

      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded outline-none"
          placeholder="E-mail Address"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Company Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
          className="w-full border px-3 py-2 rounded outline-none"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Company Logo</label>
        <input
          type="file"
          name="companyLogo"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        {previewLogo && (
          <img
            src={previewLogo}
            alt="Logo Preview"
            className="mt-2 w-24 h-24 object-contain border rounded"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default EmployerProfilePage;
