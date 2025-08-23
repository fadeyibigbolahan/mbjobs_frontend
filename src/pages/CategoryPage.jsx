import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { url } from "../../api";
import axios from "axios";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  // Fetch categories
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
        setCategories(response.data.categories);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // Add category
  const addCategory = async () => {
    if (!formData.name.trim()) {
      setError("Category name is required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${url}categories`, formData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        setCategories([...categories, response.data.category]);
        setFormData({ name: "", description: "", isActive: true });
        setShowAddForm(false);
        setSuccess("Category added successfully");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const updateCategory = async (id) => {
    if (!formData.name.trim()) {
      setError("Category name is required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await apiCall(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      if (data.success) {
        setCategories(
          categories.map((cat) => (cat._id === id ? data.category : cat))
        );
        setEditingId(null);
        setFormData({ name: "", description: "", isActive: true });
        setSuccess("Category updated successfully");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${url}categories/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      console.log("Delete response:", response.data);

      if (response.data.success) {
        setCategories(categories.filter((cat) => cat._id !== id));
        setSuccess("Category deleted successfully");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEdit = (category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      description: category.description || "",
      isActive: category.isActive,
    });
  };

  // Cancel edit/add
  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: "", description: "", isActive: true });
    setError("");
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white text-xs min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Category Management
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            disabled={loading}
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="text-red-600" size={20} />
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-green-700">{success}</span>
          </div>
        )}

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">
              Add New Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Category description"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addCategory}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Save size={16} />
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Categories Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && categories.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                  >
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                  >
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      {editingId === category._id ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="font-medium text-gray-800">
                          {category.name}
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {editingId === category._id ? (
                        <input
                          type="text"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-gray-600">
                          {category.description || "-"}
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {editingId === category._id ? (
                        <select
                          value={formData.isActive}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isActive: e.target.value === "true",
                            })
                          }
                          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            category.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {editingId === category._id ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => updateCategory(category._id)}
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors disabled:opacity-50"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(category)}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                            disabled={loading}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteCategory(category._id)}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                            disabled={loading}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-sm text-gray-600">
          <p>Total Categories: {categories.length}</p>
          <p className="mt-1">
            Active: {categories.filter((cat) => cat.isActive).length} |
            Inactive: {categories.filter((cat) => !cat.isActive).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
