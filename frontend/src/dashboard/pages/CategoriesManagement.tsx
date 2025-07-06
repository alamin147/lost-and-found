import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaSave,
  FaTimes,
  FaBoxOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/api";

// Real API category interface
interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  name: string;
}

const CategoriesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormData>({ name: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState<FormData>({ name: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const { data: categoriesData, isLoading } = useCategoryQuery(undefined);
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const categories: Category[] = categoriesData?.data || [];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditForm({ name: category.name });
  };

  const handleSave = async () => {
    if (editingId && editForm.name.trim()) {
      try {
        await updateCategory({
          id: editingId,
          data: { name: editForm.name.trim() },
        }).unwrap();
        setEditingId(null);
        setEditForm({ name: "" });
        toast.success("Category updated successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update category");
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: "" });
  };

  const handleAdd = async () => {
    if (newCategory.name.trim()) {
      try {
        await createCategory({ name: newCategory.name.trim() }).unwrap();
        setNewCategory({ name: "" });
        setShowAddForm(false);
        toast.success("Category added successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create category");
      }
    }
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete.id).unwrap();
        setShowDeleteModal(false);
        setCategoryToDelete(null);
        toast.success("Category deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete category");
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Category Management</h1>
          <p className="text-gray-400 mt-1">
            Manage item categories and classifications
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <FaPlus className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Categories</p>
              <p className="text-2xl font-bold text-white">
                {categories.length}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <FaBoxOpen className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Recently Added</p>
              <p className="text-2xl font-bold text-green-500">
                {
                  categories.filter((cat) => {
                    const createdDate = new Date(cat.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return createdDate > weekAgo;
                  }).length
                }
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <FaBoxOpen className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Add New Category
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Category name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                disabled={!newCategory.name.trim() || isCreating}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <FaSave />
                {isCreating ? "Adding..." : "Add"}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewCategory({ name: "" });
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Category Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Created At
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Updated At
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    ) : (
                      <div className="font-medium text-white">
                        {category.name}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(category.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(category.updatedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {editingId === category.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            disabled={!editForm.name.trim() || isUpdating}
                            className="p-2 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors disabled:text-gray-500"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 text-gray-500 hover:bg-gray-500 hover:text-white rounded-lg transition-colors"
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(category)}
                            className="p-2 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(category)}
                            className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <FaBoxOpen className="mx-auto text-4xl text-gray-500 mb-4" />
            <p className="text-gray-400">
              {searchTerm
                ? "No categories found matching your search criteria."
                : "No categories found. Add one to get started."}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800 border-gray-700">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-white mt-4">
                Delete Category
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-300">
                  Are you sure you want to delete the category "
                  <span className="font-medium text-white">
                    {categoryToDelete?.name}
                  </span>
                  "? This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:bg-gray-400"
                  >
                    {isDeleting ? "..." : "Delete"}
                  </button>
                  <button
                    onClick={handleCancelDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;
