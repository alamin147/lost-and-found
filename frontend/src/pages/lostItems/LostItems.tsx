import { useGetLostItemsQuery } from "../../redux/api/api";
import { Link } from "react-router-dom";
import type { lostItem } from "../../types/types";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaTag,
} from "react-icons/fa";
import { useState } from "react";

const LostItemsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("lostItemName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [limit] = useState(12);

  const { data: lostItems, isLoading } = useGetLostItemsQuery({
    searchTerm,
    page: currentPage,
    limit,
    sortBy,
    sortOrder,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalItems = lostItems?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page and ellipsis
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-3 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
            currentPage === i
              ? "text-white bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-500"
              : "text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-3 py-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Loading skeletons */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mb-6 animate-pulse"></div>
              <div className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded mb-8 max-w-md mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and filter skeleton */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-48 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg animate-pulse"></div>
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 animate-pulse shadow-xl border border-gray-700">
                <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl mb-4"></div>
                <div className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded mb-3"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Lost Items
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Browse through lost items reported by the community. Help reunite people with their belongings.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by item name, description, or location..."
                className="w-full pl-12 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
              >
                <option value="lostItemName-asc">Name (A-Z)</option>
                <option value="lostItemName-desc">Name (Z-A)</option>
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="location-asc">Location (A-Z)</option>
              </select>

              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <FaSearch className="inline mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Info */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-gray-300 mb-4 md:mb-0">
            {totalItems > 0 ? (
              <span>
                Showing {startItem}-{endItem} of {totalItems} lost items
                {searchTerm && (
                  <span className="ml-2 text-cyan-400">
                    for "{searchTerm}"
                  </span>
                )}
              </span>
            ) : (
              <span>No lost items found</span>
            )}
          </div>

          {totalPages > 1 && (
            <div className="text-gray-300 text-sm">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
        {/* Cards Grid */}
        {!lostItems?.data || lostItems.data.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 shadow-xl border border-gray-700 max-w-md mx-auto">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No Lost Items Found
              </h3>
              <p className="text-gray-300 mb-6">
                {searchTerm
                  ? `No lost items match your search for "${searchTerm}". Try different keywords.`
                  : "There are currently no lost items reported. Check back later."
                }
              </p>
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {lostItems.data.map((lostItem: lostItem) => (
                <div
                  key={lostItem.id}
                  className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="relative">
                    <div className="aspect-square rounded-t-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                      <img
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        src={lostItem?.img}
                        alt={lostItem?.lostItemName}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/bgimg.png";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {lostItem?.isFound ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg backdrop-blur-sm border border-green-400/50">
                          ✓ Found
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg backdrop-blur-sm border border-red-400/50">
                          🔍 Lost
                        </span>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm border border-gray-600/50">
                        <FaTag className="mr-1" />
                        General
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors duration-200">
                      {lostItem?.lostItemName}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {lostItem?.description || "No description provided."}
                    </p>

                    {/* Details Grid */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <FaCalendarAlt className="mr-2 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {lostItem?.date
                            ? new Date(lostItem.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })
                            : "Date not specified"
                          }
                        </span>
                      </div>

                      <div className="flex items-center text-gray-400 text-sm">
                        <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {lostItem?.location || "Location not specified"}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-400 text-sm">
                        <FaUser className="mr-2 flex-shrink-0" />
                        <span className="line-clamp-1">
                          Reporter
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link to={`/lostItems/${lostItem?.id}`}>
                      <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <FaChevronLeft className="mr-2" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {renderPaginationButtons()}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                    <FaChevronRight className="ml-2" />
                  </button>
                </div>

                {/* Page Info */}
                <div className="mt-4 text-center text-sm text-gray-400">
                  Jump to page:{" "}
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        goToPage(page);
                      }
                    }}
                    className="ml-2 w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-center focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default LostItemsPage;
