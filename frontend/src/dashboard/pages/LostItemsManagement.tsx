import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetLostItemsQuery,
  useDeleteMyLostItemMutation,
  useMarkLostItemAsFoundMutation,
} from "../../redux/api/api";
import { IoMdRadioButtonOn } from "react-icons/io";
interface LostItem {
  id: string;
  lostItemName: string;
  description: string;
  category: {
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

  const {
    data: lostItemsData,
    isLoading,
    error,
  } = useGetLostItemsQuery({
    searchTerm,
    sortBy: "lostItemName",
    sortOrder: "asc",
  });

  console.log("first", lostItemsData);
  const [deleteMyLostItem] = useDeleteMyLostItemMutation();
  const [markAsFound] = useMarkLostItemAsFoundMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteMyLostItem(id).unwrap();
        toast.success("Item deleted successfully");
      } catch (error) {
        toast.error("Failed to delete item");
      }
    }
  };

  const handleMarkAsFound = async (id: string) => {
    try {
      await markAsFound({ id }).unwrap();
      toast.success("Item marked as found successfully");
    } catch (error) {
      toast.error("Failed to mark item as found");
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
                      <button className="p-2 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors">
                        <FaEdit />
                      </button>
                      {!item.isFound && (
                        <button
                          onClick={() => handleMarkAsFound(item.id)}
                          className="p-2 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
                          title="Mark as Found"
                        >
                          <FaSearch />
                        </button>
                      )}
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
              No lost items found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostItemsManagement;
