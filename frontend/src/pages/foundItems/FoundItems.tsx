import { useGetFoundItemsQuery } from "../../redux/api/api";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState } from "react";

const FoundItemsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("foundItemName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [limit] = useState(12);

  const { data: foundItems, isLoading } = useGetFoundItemsQuery({
    searchTerm,
    page: currentPage,
    limit,
    sortBy,
    sortOrder,
  });
  // console.log(foundItems?.data);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split("-");
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const totalPages = foundItems?.meta?.totalPage || 1;

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-6 lg:px-6">
          {/* Header Skeleton */}
          <div className="mx-auto text-center lg:mb-8 mb-6">
            <div className="h-8 bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Search Skeleton */}
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-sm border border-gray-700">
            <div className="max-w-4xl mx-auto">
              <div className="h-12 bg-gray-700 rounded-xl mb-6 animate-pulse"></div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-10 bg-gray-700 rounded-lg flex-1 animate-pulse"></div>
                <div className="h-10 bg-gray-700 rounded-lg w-32 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="container mx-auto px-4">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg animate-pulse backdrop-blur-sm border border-gray-700"
                >
                  <div className="h-56 bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-700 rounded mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                    </div>
                    <div className="h-10 bg-gray-700 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pb-16">
      <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-6 lg:px-6">
        {/* Header Section */}
        <div className="mx-auto text-center lg:mb-8 mb-6">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            All Found Items
          </h2>
          <p className="font-light text-gray-400 sm:text-xl">
            Discover items that have been found and reported by our community
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-sm border border-gray-700">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <form className="mb-6" onSubmit={handleSearch}>
              <label className="mb-2 text-sm font-medium text-white sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-12 text-sm text-white border border-gray-600 rounded-xl bg-gray-700/70 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-400 transition-all duration-200 backdrop-blur-sm"
                  placeholder="Search by name, location, or description..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <button
                  type="submit"
                  className="text-white absolute end-3 bottom-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-6 py-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Sort Controls */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <FaFilter className="text-gray-400" />
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={handleSortChange}
                  className="block w-full sm:w-64 p-3 text-sm text-white border border-gray-600 rounded-lg bg-gray-700/70 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 backdrop-blur-sm"
                >
                  <option value="foundItemName-asc">Name (A-Z)</option>
                  <option value="foundItemName-desc">Name (Z-A)</option>
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="location-asc">Location (A-Z)</option>
                  <option value="location-desc">Location (Z-A)</option>
                </select>
              </div>

              {/* Clear Search Button */}
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium bg-cyan-900/30 px-4 py-2 rounded-lg hover:bg-cyan-900/50 transition-all duration-200 border border-cyan-600/50"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-center font-medium text-gray-400">
            {searchTerm
              ? `Search results for "${searchTerm}" - ${
                  foundItems?.data?.length || 0
                } items found`
              : `Showing ${foundItems?.data?.length || 0} found items`}
          </p>
        </div>
      </div>
      {/* card items */}
      <div className="container mx-auto px-4">
        {foundItems?.data?.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-800/50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm border border-gray-700">
              <FaSearch className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? "No items found" : "No found items yet"}
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              {searchTerm
                ? `No items found for "${searchTerm}". Try adjusting your search terms or browse all items.`
                : "No found items have been reported yet. Check back later or be the first to report a found item!"}
            </p>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Clear search and view all items
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {" "}
            {foundItems?.data?.map((foundItem: any) => {
              return (
                <div
                  key={foundItem.id}
                  className="group relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-gray-600 max-w-sm"
                >
                  <div className="relative overflow-hidden">
                    <div className="h-56 w-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        src={foundItem?.img}
                        alt={foundItem?.foundItemName}
                        width={500}
                        height={500}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/bgimg.png";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {foundItem?.isClaimed ? (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-green-400/50">
                        ✓ Claimed
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-red-400/50">
                      ⚠ Not Found
                    </div>
                    )}
                  </div>

                  <div className="p-5 text-white">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1">
                      {foundItem?.foundItemName}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {foundItem?.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-400 mr-2">📅</span>
                        <span className="text-gray-200">
                          {foundItem?.date
                            ? foundItem?.date?.split("T")[0]
                            : foundItem?.createdAt?.split("T")[0]}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-400 mr-2">📍</span>
                        <span className="text-gray-200 line-clamp-1">
                          {foundItem?.location}
                        </span>
                      </div>
                    </div>

                    <Link to={`/foundItems/${foundItem?.id}`} className="block">
                      <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center mt-12 pb-8 space-y-4">
          {/* Page Info */}
          <div className="text-sm text-gray-400">
            Showing page {currentPage} of {totalPages} (
            {foundItems?.meta?.total || 0} total items)
          </div>

          <nav className="inline-flex items-center space-x-1 bg-gray-800/50 rounded-2xl shadow-lg p-2 backdrop-blur-sm border border-gray-700">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                currentPage === 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300 bg-gray-700/50 hover:bg-gray-600/70 hover:scale-105"
              }`}
            >
              <FaChevronLeft className="w-3 h-3 mr-2" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {(() => {
                const pages = [];
                const maxVisiblePages = 5;
                let startPage = Math.max(
                  1,
                  currentPage - Math.floor(maxVisiblePages / 2)
                );
                let endPage = Math.min(
                  totalPages,
                  startPage + maxVisiblePages - 1
                );

                // Adjust startPage if we're near the end
                if (endPage - startPage + 1 < maxVisiblePages) {
                  startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }

                // First page
                if (startPage > 1) {
                  pages.push(
                    <button
                      key={1}
                      onClick={() => handlePageChange(1)}
                      className="px-3 py-2 text-sm font-medium rounded-lg text-gray-300 bg-gray-700/50 hover:bg-gray-600/70 transition-all duration-200 hover:scale-105"
                    >
                      1
                    </button>
                  );
                  if (startPage > 2) {
                    pages.push(
                      <span key="ellipsis1" className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                }

                // Visible pages
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                        currentPage === i
                          ? "text-white bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg"
                          : "text-gray-300 bg-gray-700/50 hover:bg-gray-600/70"
                      }`}
                    >
                      {i}
                    </button>
                  );
                }

                // Last page
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span key="ellipsis2" className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() => handlePageChange(totalPages)}
                      className="px-3 py-2 text-sm font-medium rounded-lg text-gray-300 bg-gray-700/50 hover:bg-gray-600/70 transition-all duration-200 hover:scale-105"
                    >
                      {totalPages}
                    </button>
                  );
                }

                return pages;
              })()}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                currentPage === totalPages
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300 bg-gray-700/50 hover:bg-gray-600/70 hover:scale-105"
              }`}
            >
              Next
              <FaChevronRight className="w-3 h-3 ml-2" />
            </button>
          </nav>

          {/* Quick Jump */}
          {totalPages > 10 && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Go to page:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    handlePageChange(page);
                  }
                }}
                className="w-16 px-2 py-1 text-center border border-gray-600 rounded bg-gray-700 text-white"
              />
              <span className="text-gray-400">of {totalPages}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoundItemsPage;
