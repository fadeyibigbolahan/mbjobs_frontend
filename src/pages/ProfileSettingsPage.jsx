import { useState, useEffect } from "react";
import {
  Mail,
  CircleArrowRight,
  Phone,
  Lock,
  Building2,
  User,
  FileText,
  Tag,
  Eye,
  X,
} from "lucide-react";
import axios from "axios";
import { url } from "../../api";

const ProfileSettingsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    // Employer fields
    companyName: "",
    companyLogo: null,
    bio: "",
    // Apprentice fields
    apprenticeCategories: [],
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("apprentice");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [error, setError] = useState("");
  const [showDataPreview, setShowDataPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const handlePreviewData = () => {
    const form = new FormData();
    const dataForPreview = {};

    for (let key in formData) {
      if (formData[key]) {
        if (key === "apprenticeCategories") {
          formData[key].forEach((category) => {
            form.append("apprenticeCategories[]", category);
          });
          dataForPreview[key] = formData[key];
        } else if (formData[key] instanceof File) {
          form.append(key, formData[key]);
          dataForPreview[key] = {
            fileName: formData[key].name,
            fileSize: formData[key].size,
            fileType: formData[key].type,
          };
        } else {
          form.append(key, formData[key]);
          dataForPreview[key] = formData[key];
        }
      }
    }

    // Add resolved category names for apprentices
    if (userRole === "apprentice" && formData.apprenticeCategories.length > 0) {
      const categoryNames = formData.apprenticeCategories.map((catId) => {
        const category = availableCategories.find((cat) => cat._id === catId);
        return category ? category.name : catId;
      });
      dataForPreview.apprenticeCategoryNames = categoryNames;
    }

    setPreviewData({
      formData: dataForPreview,
      formDataObject: form,
      userRole,
      timestamp: new Date().toISOString(),
    });
    setShowDataPreview(true);
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${url}categories`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Fetched categories:", response.data);
      if (response.data.success) {
        setAvailableCategories(response.data.categories);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
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
      console.log(
        "Raw apprenticeCategories:",
        response.data.apprenticeCategories
      );

      const processedCategories = response.data.apprenticeCategories
        ? response.data.apprenticeCategories.map((cat) => cat._id || cat)
        : [];

      console.log("Processed apprenticeCategories:", processedCategories);

      setUserRole(response.data.role);
      setFormData((prev) => ({
        ...prev,
        fullName: response.data.fullName,
        email: response.data.email,
        phone: response.data.phone,
        companyName: response.data.companyName || "",
        bio: response.data.bio || "",
        // Extract only the _id values from apprenticeCategories objects
        apprenticeCategories: processedCategories,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Handle image previews
      if (name === "profileImage") {
        setPreviewUrl(URL.createObjectURL(file));
      } else if (name === "companyLogo") {
        setCompanyLogoPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      apprenticeCategories: prev.apprenticeCategories.includes(category)
        ? prev.apprenticeCategories.filter((cat) => cat !== category)
        : [...prev.apprenticeCategories, category],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setFeedback("❌ Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();

      // Add all form data to FormData object
      for (let key in formData) {
        const value = formData[key];

        // Skip empty values except for explicit false/0 values
        if (value === null || value === undefined || value === "") {
          continue;
        }

        if (key === "apprenticeCategories") {
          // Handle array data - send as JSON string to match backend expectation
          if (Array.isArray(value) && value.length > 0) {
            form.append("apprenticeCategories", JSON.stringify(value));
          }
        } else if (value instanceof File) {
          // Handle file uploads
          form.append(key, value);
        } else {
          // Handle regular form fields
          form.append(key, value);
        }
      }

      // Debug: Log what's being sent
      console.log("Form data being sent:");
      console.log("FormData entries:");
      for (let pair of form.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }
      const token = localStorage.getItem("authToken");

      // Additional debugging
      console.log("Raw formData state:", formData);
      console.log("Form has entries:", form.has("fullName"));
      console.log("Authorization token:", token ? "Present" : "Missing");

      if (!token) {
        setFeedback("❌ Authentication token not found. Please log in again.");
        return;
      }

      console.log("Sending request to:", `${url}users/me`);
      console.log("Authorization token:", token ? "Present" : "Missing");

      const response = await axios.patch(`${url}users/me`, form, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data", // Explicitly set content type
        },
      });

      console.log("Update response:", response.data);
      setFeedback(
        response.data.message
          ? `✅ ${response.data.message}`
          : "✅ Profile updated successfully."
      );
    } catch (err) {
      console.error("Update error:", err);
      console.error("Error response:", err.response?.data);

      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong.";
      setFeedback(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const renderImageUpload = (name, preview, title, description) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700 transition">
        {preview ? (
          <img
            src={preview}
            alt={`${title} Preview`}
            className="h-full w-full object-contain rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <svg
              className="w-8 h-8 mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12M5 20h14a1 1 0 001-1v-4a1 1 0 00-1-1H5a1 1 0 00-1 1v4a1 1 0 001 1z"
              />
            </svg>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              <span className="font-semibold">
                Click to upload {title.toLowerCase()}
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        )}
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );

  const DataPreviewModal = () => {
    if (!showDataPreview || !previewData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-[#003366]">
              Data Preview - Before API Submit
            </h3>
            <button
              onClick={() => setShowDataPreview(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-96">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">User Role:</h4>
                <p className="text-sm bg-blue-50 p-2 rounded">
                  {previewData.userRole}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Timestamp:</h4>
                <p className="text-sm bg-gray-50 p-2 rounded">
                  {previewData.timestamp}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Form Data to be sent:
                </h4>
                <div className="bg-gray-50 p-4 rounded text-sm">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(previewData.formData, null, 2)}
                  </pre>
                </div>
              </div>

              {previewData.formData.apprenticeCategories &&
                previewData.formData.apprenticeCategories.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Selected Categories:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {previewData.formData.apprenticeCategoryNames?.map(
                        (name, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                          >
                            {name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {(previewData.formData.profileImage ||
                previewData.formData.companyLogo) && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    File Uploads:
                  </h4>
                  <div className="space-y-2">
                    {previewData.formData.profileImage && (
                      <div className="bg-green-50 p-2 rounded text-xs">
                        <strong>Profile Image:</strong>{" "}
                        {previewData.formData.profileImage.fileName} (
                        {(
                          previewData.formData.profileImage.fileSize / 1024
                        ).toFixed(2)}{" "}
                        KB)
                      </div>
                    )}
                    {previewData.formData.companyLogo && (
                      <div className="bg-green-50 p-2 rounded text-xs">
                        <strong>Company Logo:</strong>{" "}
                        {previewData.formData.companyLogo.fileName} (
                        {(
                          previewData.formData.companyLogo.fileSize / 1024
                        ).toFixed(2)}{" "}
                        KB)
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDataPreview(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDataPreview(false);
                  handleSubmit({ preventDefault: () => {} });
                }}
                disabled={loading}
                className="px-4 py-2 bg-[#003366] text-white rounded hover:bg-[#004080] transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Proceed with Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-start dark:bg-slate-900 min-h-screen p-4">
      <div className="p-6 mx-auto bg-white shadow rounded w-full max-w-2xl">
        <div className="mb-6 text-center">
          <h2 className="font-kanit mb-2 text-lg font-semibold text-[#003366]">
            PROFILE SETTINGS
          </h2>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <User size={12} className="mr-1" />
            {userRole === "employer"
              ? "Employer Account"
              : "Apprentice Account"}
          </div>
        </div>

        {/* WRAP EVERYTHING IN A FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center">
              <CircleArrowRight
                className="text-[#003366] flex-shrink-0"
                size={16}
              />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full text-sm decoration-none outline-none"
                placeholder="Full Name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center">
              <Mail className="text-[#003366] flex-shrink-0" size={16} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-sm decoration-none outline-none"
                placeholder="Email"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center">
            <Phone className="text-[#003366] flex-shrink-0" size={16} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-sm decoration-none outline-none"
              placeholder="Phone Number"
              required
            />
          </div>

          {/* Employer-specific fields */}
          {userRole === "employer" && (
            <>
              <div className="border-t pt-4">
                <h3 className="text-md font-semibold text-[#003366] mb-4">
                  Company Information
                </h3>

                {/* Company Name */}
                <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center">
                  <Building2
                    className="text-[#003366] flex-shrink-0"
                    size={16}
                  />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full text-sm decoration-none outline-none"
                    placeholder="Company Name"
                  />
                </div>

                {/* Bio */}
                <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-start">
                  <FileText
                    className="text-[#003366] flex-shrink-0 mt-1"
                    size={16}
                  />
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full text-sm decoration-none outline-none resize-none"
                    placeholder="Company Bio"
                    rows="3"
                  />
                </div>

                {/* Company Logo Upload */}
                <div className="mb-4">
                  {renderImageUpload(
                    "companyLogo",
                    companyLogoPreview,
                    "Company Logo",
                    "PNG, JPG, JPEG (max. 2MB)"
                  )}
                </div>
              </div>
            </>
          )}

          {/* Apprentice-specific fields */}
          {userRole === "apprentice" && (
            <>
              <div className="border-t pt-4">
                <h3 className="text-md font-semibold text-[#003366] mb-4">
                  Skills & Categories
                </h3>

                {/* Apprentice Categories */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="inline mr-1" size={14} />
                    Select your skill categories
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableCategories.map((category) => (
                      <label
                        key={category._id}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.apprenticeCategories.includes(
                            category._id
                          )}
                          onChange={() => handleCategoryChange(category._id)}
                          className="rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
                        />
                        <span className="text-sm text-gray-700">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Password Section */}
          <div className="border-t pt-4">
            <h3 className="text-md font-semibold text-[#003366] mb-4">
              Change Password
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="mb-4 w-full mt-1 rounded border p-2 flex gap-2 items-center">
                <Lock className="text-[#003366] flex-shrink-0" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-sm decoration-none outline-none"
                  placeholder="New Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-[#003366] whitespace-nowrap"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="mb-4 w-full mt-1 rounded border p-2 flex items-center gap-2">
                <Lock className="text-[#003366] flex-shrink-0" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full text-sm decoration-none outline-none"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div className="border-t pt-4">
            <h3 className="text-md font-semibold text-[#003366] mb-4">
              Profile Picture
            </h3>
            {renderImageUpload(
              "profileImage",
              previewUrl,
              "Profile Picture",
              "PNG, JPG, JPEG (max. 2MB)"
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Preview Data Button */}
            <button
              type="button"
              onClick={handlePreviewData}
              className="flex-1 rounded bg-gray-600 py-3 text-white hover:bg-gray-700 flex justify-center items-center transition-colors duration-200 font-medium"
            >
              <Eye size={16} className="mr-2" />
              Preview Data
            </button>

            {/* Submit Button - Changed to type="submit" and removed onClick */}
            <button
              type="submit"
              className="flex-1 rounded bg-[#003366] py-3 text-white hover:bg-[#004080] flex justify-center items-center transition-colors duration-200 font-medium"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="text-center">
              <p
                className={`text-sm mt-2 ${
                  feedback.includes("✅") ? "text-green-600" : "text-red-500"
                }`}
              >
                {feedback}
              </p>
            </div>
          )}
        </form>
      </div>
      {/* Data Preview Modal */}
      <DataPreviewModal />
    </div>
  );
};

export default ProfileSettingsPage;
