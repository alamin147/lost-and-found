import { useParams, Link } from "react-router-dom";
import { useGetSingleLostItemQuery } from "../../redux/api/api";
import { Spinner } from "flowbite-react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaTag,
} from "react-icons/fa";

const SingleLostItem = () => {
  const { lostItem: lostItemId }: any = useParams();
  const { data: singleLostItem, isLoading } =
    useGetSingleLostItemQuery(lostItemId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <Spinner size="xl" className="mb-4" />
          <p className="text-gray-400">Loading lost item details...</p>
        </div>
      </div>
    );
  }

  const lostItem = singleLostItem?.data;

  // Handle case where item is not found
  if (!lostItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <div className="text-red-400 text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Item Not Found
            </h2>
            <p className="text-gray-300 mb-6">
              The lost item you're looking for doesn't exist or may have been
              removed.
            </p>
            <Link
              to="/lostItems"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              <FaArrowLeft className="mr-2" />
              Back to Lost Items
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    lostItemName,
    date,
    isFound,
    img,
    description,
    location,
    user,
    category,
  } = lostItem;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/lostItems"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Lost Items
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {lostItemName || "Lost Item"}
          </h1>
          <p className="text-gray-300">Lost item details and information</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
                <img
                  src={img}
                  alt={lostItemName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={500}
                  height={500}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/bgimg.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {isFound ? (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg backdrop-blur-sm border border-green-400/50">
                    ✓ Found
                  </span>
                ) : (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg backdrop-blur-sm border border-red-400/50">
                    🔍 Missing
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Description */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {description || "No description available for this item."}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
                <div className="flex items-center text-cyan-400 mb-2">
                  <FaCalendarAlt className="mr-3" />
                  <span className="font-semibold">Date Lost</span>
                </div>
                <p className="text-gray-300">
                  {date
                    ? new Date(date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Date not specified"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
                <div className="flex items-center text-cyan-400 mb-2">
                  <FaMapMarkerAlt className="mr-3" />
                  <span className="font-semibold">Location</span>
                </div>
                <p className="text-gray-300">
                  {location || "Location not specified"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
                <div className="flex items-center text-cyan-400 mb-2">
                  <FaTag className="mr-3" />
                  <span className="font-semibold">Category</span>
                </div>
                <p className="text-gray-300">
                  {category?.name || "Uncategorized"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
                <div className="flex items-center text-cyan-400 mb-2">
                  <FaUser className="mr-3" />
                  <span className="font-semibold">Reported By</span>
                </div>
                <p className="text-gray-300">{user?.username || "Anonymous"}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">
                Found This Item?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                If you have found this item, please contact the owner or report
                it through our platform to help reunite them with their
                belongings.
              </p>

              {!isFound ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/reportFoundItem"
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl text-center"
                  >
                    Report Found Item
                  </Link>
                  <button className="flex-1 border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                    Contact Owner
                  </button>
                </div>
              ) : (
                <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 text-center">
                  <p className="text-green-300 font-medium">
                    This item has been marked as found!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleLostItem;
