import { useState, useEffect } from "react";
import { Mail, CircleArrowRight, Phone, Lock, Eye, EyeOff } from "lucide-react";

const ProfileSettingsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Simulated fetch of existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      // Replace this with actual API call
      const userData = {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "08012345678",
        profilePicture: null,
      };

      setFormData((prev) => ({
        ...prev,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
      }));

      // If profile picture exists
      // setPreviewUrl(userData.profilePictureUrl);
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (files && files[0]) {
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setFeedback("❌ Passwords do not match.");
      return;
    }

    setLoading(true);

    const form = new FormData();
    for (let key in formData) {
      if (formData[key]) form.append(key, formData[key]);
    }

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      setFeedback(
        res.ok ? "✅ Profile updated successfully." : `❌ ${data.message}`
      );
    } catch (err) {
      setFeedback("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center dark:bg-slate-900">
      <div className="p-6 mx-auto bg-white shadow rounded w-full md:w-1/2">
        <h2 className="font-kanit mb-4 text-center text-sm font-semibold text-[#003366 ]">
          PROFILE SETTINGS
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
            <CircleArrowRight className="text-[#003366 ]" size={16} />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full text-sm decoration-none outline-none"
              placeholder="Full Name"
            />
          </div>

          {/* Email */}
          <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
            <Mail className="text-[#003366 ]" size={16} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-sm decoration-none outline-none"
              placeholder="Email"
            />
          </div>

          {/* Phone */}
          <div className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between">
            <Phone className="text-[#003366 ]" size={16} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-sm decoration-none outline-none"
              placeholder="Phone Number"
            />
          </div>

          {/* Password */}
          <div className="mb-4 w-full mt-1 rounded border p-2 flex gap-2 items-center justify-between">
            <Lock className="text-[#003366 ]" size={16} />
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
              className="ml-2 text-gray-600"
            >
              {showPassword ? (
                <p className="text-xs text-[#003366 ]">Hide</p>
              ) : (
                <p className="text-xs text-[#003366 ]">Show</p>
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-4 w-full mt-1 rounded gap-2 border p-2 flex items-center justify-between">
            <Lock className="text-[#003366 ]" size={16} />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full text-sm decoration-none outline-none"
              placeholder="Confirm Password"
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700 transition">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12M5 20h14a1 1 0 001-1v-4a1 1 0 00-1-1H5a1 1 0 00-1 1v4a1 1 0 001 1z"
                    ></path>
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    <span className="font-semibold">
                      Click to upload profile picture
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG (max. 2MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded bg-[#003366 ] py-2 text-white hover:bg-[#7A54A1] flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-t border-white rounded-full animate-spin"></div>
            ) : (
              "Update Profile"
            )}
          </button>

          {/* Feedback */}
          {feedback && (
            <p className="text-sm text-center mt-2 text-red-500 dark:text-green-300">
              {feedback}
            </p>
          )}
        </form>
      </div>
      <div className="w-full md:w-1/2"></div>
    </div>
  );
};

export default ProfileSettingsPage;
