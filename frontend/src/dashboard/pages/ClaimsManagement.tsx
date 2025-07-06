import { useState } from "react";
import { FaTrash, FaEye, FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetAllClaimsQuery,
  useUpdateClaimStatusMutation,
} from "../../redux/api/api";

const ClaimsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const { data: allClaims, isLoading } = useGetAllClaimsQuery(undefined);
  const [updateClaimStatus] = useUpdateClaimStatusMutation();

  const claims = allClaims?.data || [];

  const filteredClaims = claims.filter((claim: any) => {
    const matchesSearch =
      claim.foundItem?.foundItemName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      claim.foundItem?.user?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      claim.foundItem?.user?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || claim.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (claimId: string, status: string) => {
    const claim = claims.find((claim: any) => claim.id === claimId);
    setSelectedClaim(claim);
    setNewStatus(status);
    setIsStatusModalOpen(true);
  };

  const handleStatusConfirm = async () => {
    if (!selectedClaim || !newStatus) return;

    setIsStatusLoading(true);
    try {
      await updateClaimStatus({
        claimId: selectedClaim.id,
        status: newStatus,
      }).unwrap();

      toast.success(
        `Claim for "${
          selectedClaim.foundItem?.foundItemName
        }" ${newStatus.toLowerCase()} successfully`
      );
      setIsStatusModalOpen(false);
      setSelectedClaim(null);
      setNewStatus("");
    } catch (error) {
      toast.error("Failed to update claim status");
      console.error("Error updating claim status:", error);
    } finally {
      setIsStatusLoading(false);
    }
  };

  const handleStatusCancel = () => {
    setIsStatusModalOpen(false);
    setSelectedClaim(null);
    setNewStatus("");
    setIsStatusLoading(false);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedClaim) return;

    setIsDeleteLoading(true);
    try {
      // This would typically make an API call to delete the claim
      // For now, we'll just show a success message
      toast.success("Claim deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedClaim(null);
    } catch (error) {
      toast.error("Failed to delete claim");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedClaim(null);
    setIsDeleteLoading(false);
  };

  const handleBulkApprove = async () => {
    const pendingClaims = filteredClaims.filter(
      (claim: any) => claim.status === "PENDING"
    );
    if (pendingClaims.length === 0) {
      toast.warning("No pending claims to approve");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to approve ${pendingClaims.length} pending claims?`
      )
    ) {
      try {
        // Approve all pending claims
        const promises = pendingClaims.map((claim: any) =>
          updateClaimStatus({
            claimId: claim.id,
            status: "APPROVED",
          }).unwrap()
        );

        await Promise.all(promises);
        toast.success(`Successfully approved ${pendingClaims.length} claims`);
      } catch (error) {
        toast.error("Failed to approve some claims");
        console.error("Error in bulk approve:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "APPROVED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
          <h1 className="text-3xl font-bold text-white">Claims Management</h1>
          <p className="text-gray-400 mt-1">Review and manage item claims</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleBulkApprove}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <FaCheck className="mr-2" />
            Bulk Approve Pending
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Claims</p>
              <p className="text-2xl font-bold text-white">{claims.length}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <FaEye className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-500">
                {
                  claims.filter((claim: any) => claim.status === "PENDING")
                    .length
                }
              </p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <FaSearch className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Approved</p>
              <p className="text-2xl font-bold text-green-500">
                {
                  claims.filter((claim: any) => claim.status === "APPROVED")
                    .length
                }
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <FaCheck className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rejected</p>
              <p className="text-2xl font-bold text-red-500">
                {
                  claims.filter((claim: any) => claim.status === "REJECTED")
                    .length
                }
              </p>
            </div>
            <div className="bg-red-500 p-3 rounded-lg">
              <FaTimes className="text-white" />
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
                placeholder="Search claims..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Found Item
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Claim Details
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Found By
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Lost Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredClaims.map((claim: any) => (
                <tr
                  key={claim.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={claim.foundItem?.img || "/default-item.png"}
                        alt={claim.foundItem?.foundItemName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-white">
                          {claim.foundItem?.foundItemName}
                        </div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">
                          {claim.foundItem?.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {claim.foundItem?.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-white text-sm font-medium mb-1">
                        Distinguishing Features:
                      </div>
                      <div className="text-gray-400 text-sm truncate">
                        {claim.distinguishingFeatures || "No details provided"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white">
                        {claim.foundItem?.user?.username}
                      </div>
                      <div className="text-sm text-gray-400">
                        {claim.foundItem?.user?.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(claim.lostDate)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={claim.status}
                      onChange={(e) =>
                        handleStatusChange(claim.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-medium text-white border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 ${getStatusColor(
                        claim.status
                      )}`}
                    >
                      <option
                        value="PENDING"
                        className="bg-gray-800 text-yellow-400"
                      >
                        PENDING
                      </option>
                      <option
                        value="APPROVED"
                        className="bg-gray-800 text-green-400"
                      >
                        APPROVED
                      </option>
                      <option
                        value="REJECTED"
                        className="bg-gray-800 text-red-400"
                      >
                        REJECTED
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClaims.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="mx-auto text-4xl text-gray-500 mb-4" />
            <p className="text-gray-400">
              No claims found matching your criteria
            </p>
          </div>
        )}
      </div>

      {/* Status Change Confirmation Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
            <div className="text-center">
              <div className="mb-4">
                <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FaCheck className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Change Claim Status
                </h2>
                <p className="text-gray-400 mb-4">
                  Are you sure you want to change the status of this claim?
                </p>
              </div>

              {selectedClaim && (
                <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={selectedClaim.foundItem?.img || "/default-item.png"}
                      alt={selectedClaim.foundItem?.foundItemName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-white">
                        {selectedClaim.foundItem?.foundItemName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedClaim.foundItem?.category?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      Current Status:
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                          selectedClaim.status
                        )}`}
                      >
                        {selectedClaim.status}
                      </span>
                    </span>
                    <span className="text-sm text-gray-400">
                      New Status:
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                          newStatus
                        )}`}
                      >
                        {newStatus}
                      </span>
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleStatusCancel}
                  disabled={isStatusLoading}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleStatusConfirm}
                  disabled={isStatusLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isStatusLoading ? (
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
                    "Update Status"
                  )}
                </button>
              </div>
            </div>
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
                  Delete Claim
                </h2>
                <p className="text-gray-400 mb-4">
                  Are you sure you want to delete this claim? This action cannot
                  be undone.
                </p>
              </div>

              {selectedClaim && (
                <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={selectedClaim.foundItem?.img || "/default-item.png"}
                      alt={selectedClaim.foundItem?.foundItemName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-white">
                        {selectedClaim.foundItem?.foundItemName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedClaim.foundItem?.category?.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    Distinguishing Features:{" "}
                    {selectedClaim.distinguishingFeatures ||
                      "No details provided"}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      Status:
                      <span
                        className={`ml-1 px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                          selectedClaim.status
                        )}`}
                      >
                        {selectedClaim.status}
                      </span>
                    </span>
                    <span>Lost Date: {formatDate(selectedClaim.lostDate)}</span>
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
                    "Delete Claim"
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

export default ClaimsManagement;
