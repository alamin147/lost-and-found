import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetLostItemsQuery,
  useDeleteMyLostItemMutation,
  useMarkLostItemAsFoundMutation,
  useEditMyLostItemMutation,
  useCategoryQuery,
} from "../../redux/api/api";
import { IoMdRadioButtonOn } from "react-icons/io";
interface LostItem {
  id: string;
  lostItemName: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  location: string;
  date: string;
  isFound: boolean;
  img?: string;
  user: {
    username: string;
  };
}

const LostItemsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LostItem | null>(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [markingAsFoundId, setMarkingAsFoundId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<LostItem | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    lostItemName: "",
    description: "",
    location: "",
    date: "",
    categoryId: "",
  });

  const {
    data: lostItemsData,
    isLoading,
    error,
  } = useGetLostItemsQuery({
    searchTerm,
    sortBy: "lostItemName",
    sortOrder: "asc",
  });

  const { data: categoriesData } = useCategoryQuery({});
  console.log("first", lostItemsData);
  const [deleteMyLostItem] = useDeleteMyLostItemMutation();
  const [markAsFound] = useMarkLostItemAsFoundMutation();
  const [editMyLostItem] = useEditMyLostItemMutation();
  const handleEdit = (item: LostItem) => {
    setEditingItem(item);
    setEditFormData({
      lostItemName: item.lostItemName,
      description: item.description,
      location: item.location,
      date: new Date(item.date).toISOString().split("T")[0],
      categoryId: item.category?.id || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsEditLoading(true);
    try {
      await editMyLostItem({
        id: editingItem.id,
        ...editFormData,
        date: new Date(editFormData.date).toISOString(),
      }).unwrap();
      toast.success("Item updated successfully");
      setIsEditModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      toast.error("Failed to update item");
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (item: LostItem) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;

    setIsDeleteLoading(true);
    try {
      await deleteMyLostItem(deletingItem.id).unwrap();
      toast.success("Item deleted successfully");
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
    } catch (error) {
      toast.error("Failed to delete item");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletingItem(null);
    setIsDeleteLoading(false);
  };

  const handleMarkAsFound = async (id: string, currentStatus: boolean) => {
    setMarkingAsFoundId(id);
    try {
      await markAsFound({ id }).unwrap();
      const message = currentStatus
        ? "Item marked as not found successfully"
        : "Item marked as found successfully";
      toast.success(message);
    } catch (error) {
      toast.error("Failed to update item status");
    } finally {
      setMarkingAsFoundId(null);
    }
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

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400">
            Error loading lost items. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const items = lostItemsData?.data || [];

  const filteredItems = items.filter((item: LostItem) => {
    const matchesSearch =
      item.lostItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "FOUND" && item.isFound) ||
      (statusFilter === "ACTIVE" && !item.isFound);
    const matchesCategory =
      categoryFilter === "ALL" || item.category?.name === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (isFound: boolean) => {
    return isFound ? "bg-green-500" : "bg-red-500";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Lost Items Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage all lost item reports in the system
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Reports</p>
              <p className="text-2xl font-bold text-white">{items.length}</p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaEye className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active</p>
              <p className="text-2xl font-bold text-red-500">
                {items.filter((item: LostItem) => !item.isFound).length}
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <IoMdRadioButtonOn className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Found</p>
              <p className="text-2xl font-bold text-green-500">
                {items.filter((item: LostItem) => item.isFound).length}
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaSearch className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search lost items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="FOUND">Found</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="ALL">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Personal Items">Personal Items</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Documents">Documents</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Item
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Date Lost
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Reported By
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredItems.map((item: LostItem) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">
                        {item.lostItemName}
                      </div>
                      <div className="text-sm text-gray-400 truncate max-w-xs">
                        {item.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {item.category?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{item.location}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                        item.isFound
                      )}`}
                    >
                      {item.isFound ? "Found" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {item.user?.username || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleMarkAsFound(item.id, item.isFound)}
                        disabled={markingAsFoundId === item.id}
                        className={`p-2 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center ${
                          item.isFound
                            ? "text-red-500 hover:bg-red-500 hover:text-white disabled:bg-red-400"
                            : "text-green-500 hover:bg-green-500 hover:text-white disabled:bg-green-400"
                        }`}
                        title={
                          item.isFound ? "Mark as Not Found" : "Mark as Found"
                        }
                      >
                        {markingAsFoundId === item.id ? (
                          <svg
                            className={`animate-spin h-4 w-4 ${
                              item.isFound ? "text-red-500" : "text-green-500"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : item.isFound ? (
                          <FaTimes />
                        ) : (
                          <FaCheck />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors flex items-center justify-center"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="mx-auto text-4xl text-gray-500 mb-4" />
            <p className="text-gray-400">
              No lost items found matching your criteria
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Edit Lost Item
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  value={editFormData.lostItemName}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      lostItemName: e.target.value,
                    })
                  }
                  disabled={isEditLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                  disabled={isEditLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editFormData.location}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      location: e.target.value,
                    })
                  }
                  disabled={isEditLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Date Lost
                </label>
                <input
                  type="date"
                  value={editFormData.date}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      date: e.target.value,
                    })
                  }
                  disabled={isEditLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={editFormData.categoryId}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      categoryId: e.target.value,
                    })
                  }
                  disabled={isEditLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select a category</option>
                  {categoriesData?.data?.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isEditLoading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isEditLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Changes"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleEditCancel}
                  disabled={isEditLoading}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
            <div className="text-center">
              <div className="mb-4">
                <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FaTrash className="text-red-600 text-xl" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Delete Lost Item
                </h2>
                <p className="text-gray-400 mb-4">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
              </div>

              {deletingItem && (
                <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-medium text-white mb-2">
                    {deletingItem.lostItemName}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {deletingItem.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Location: {deletingItem.location}</span>
                    <span>
                      Date: {new Date(deletingItem.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDeleteCancel}
                  disabled={isDeleteLoading}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={isDeleteLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isDeleteLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Delete Item"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostItemsManagement;
