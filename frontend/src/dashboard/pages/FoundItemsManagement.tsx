import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetFoundItemsQuery,
  useDeleteMyFoundItemMutation,
  useEditMyFoundItemMutation,
} from "../../redux/api/api";

interface FoundItem {
  id: string;
  foundItemName: string;
  description: string;
  category: {
    name: string;
  };
  location: string;
  date: string;
  isClaimed: boolean;
  img?: string;
  user: {
    username: string;
  };
}

const FoundItemsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoundItem | null>(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    foundItemName: "",
    description: "",
    location: "",
    date: "",
  });

  const {
    data: foundItemsData,
    isLoading,
    error,
  } = useGetFoundItemsQuery({
    searchTerm,
    sortBy: "foundItemName",
    sortOrder: "asc",
  });

  const [deleteFoundItem] = useDeleteMyFoundItemMutation();
  const [editMyFoundItem] = useEditMyFoundItemMutation();

  const handleEdit = (item: FoundItem) => {
    setEditingItem(item);
    setEditForm({
      foundItemName: item.foundItemName,
      description: item.description,
      location: item.location,
      date: new Date(item.date).toISOString().split("T")[0],
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsEditLoading(true);
    try {
      // Convert date to ISO-8601 DateTime format
      const isoDate = new Date(editForm.date).toISOString();

      await editMyFoundItem({
        id: editingItem.id,
        ...editForm,
        date: isoDate,
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
    setIsEditLoading(false);
    setEditForm({
      foundItemName: "",
      description: "",
      location: "",
      date: "",
    });
  };

  const handleDelete = async (id: string) => {
    //TODO: good alert
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteFoundItem(id).unwrap();
        toast.success("Item deleted successfully");
      } catch (error) {
        toast.error("Failed to delete item");
      }
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
            Error loading found items. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const items = foundItemsData?.data || [];

  const filteredItems = items.filter((item: FoundItem) => {
    const matchesSearch =
      item.foundItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "CLAIMED" && item.isClaimed) ||
      (statusFilter === "ACTIVE" && !item.isClaimed);
    const matchesCategory =
      categoryFilter === "ALL" || item.category?.name === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (isClaimed: boolean) => {
    return isClaimed ? "bg-yellow-500" : "bg-green-500";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Found Items Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage all found items in the system
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Items</p>
              <p className="text-2xl font-bold text-white">
                {items?.length | 0}
              </p>
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
              <p className="text-2xl font-bold text-green-500">
                {items.filter((item: FoundItem) => !item.isClaimed).length}
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaSearch className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Claimed</p>
              <p className="text-2xl font-bold text-yellow-500">
                {items.filter((item: FoundItem) => item.isClaimed).length}
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
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="CLAIMED">Claimed</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Personal Items">Personal Items</option>
              <option value="Keys">Keys</option>
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
                  Date Found
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
              {filteredItems.map((item: FoundItem) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">
                        {item.foundItemName}
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
                        item.isClaimed
                      )}`}
                    >
                      {item.isClaimed ? "Claimed" : "Active"}
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
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
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
              No items found matching your criteria
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Edit Found Item
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  value={editForm.foundItemName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, foundItemName: e.target.value })
                  }
                  disabled={isEditLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  disabled={isEditLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  disabled={isEditLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date Found
                </label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) =>
                    setEditForm({ ...editForm, date: e.target.value })
                  }
                  disabled={isEditLoading}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isEditLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isEditLoading ? (
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
                      Updating...
                    </>
                  ) : (
                    "Update Item"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleEditCancel}
                  disabled={isEditLoading}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoundItemsManagement;
