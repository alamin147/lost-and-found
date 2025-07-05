import {
  useGetSingleFoundItemQuery,
  useCreateClaimMutation,
} from "../../redux/api/api";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaTag,
  FaTimes,
} from "react-icons/fa";

const SingleFoundItem = () => {
  const { foundItem: foundItemParam } = useParams<{ foundItem: string }>();
  const foundItemId = foundItemParam;

  if (!foundItemId) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Item Not Found
            </h1>
            <p className="text-gray-300 mb-6">
              The requested item could not be found.
            </p>
            <Link
              to="/foundItems"
              className="inline-flex items-center text-blue-400 hover:text-blue-300"
            >
              <FaArrowLeft className="mr-2" />
              Back to Found Items
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { data: singleFoundItem, isLoading } =
    useGetSingleFoundItemQuery(foundItemId);

  const [createClaim, { isLoading: claimLoading }] = useCreateClaimMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  if (!foundItemId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Invalid Item ID
            </h2>
            <p className="text-gray-300 mb-6">
              No valid item ID was provided. Please check the URL and try again.
            </p>
            <Link
              to="/foundItems"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              <FaArrowLeft className="mr-2" />
              Back to Found Items
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClaimModal = () => {
    setIsClaimModalOpen(true);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      const claimData = {
        foundItemId: foundItemId,
        distinguishingFeatures: data.distinguishingFeatures,
        lostDate: new Date(data.lostDate).toISOString(),
      };

      const res = await createClaim(claimData);
      console.log("first", res);
      if (res.data?.success) {
        toast.success(
          "Claim submitted successfully! We will review your request."
        );
        setIsClaimModalOpen(false);
        reset();
      } else {
        toast.error("Failed to submit claim. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="xl" className="mb-4" />
          <p className="text-gray-400">Loading found item details...</p>
        </div>
      </div>
    );
  }

  // Extract the item data from API response
  const foundItemData = singleFoundItem?.data;

  // Handle case where item is not found
  if (!foundItemData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <div className="text-red-400 text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Item Not Found
            </h2>
            <p className="text-gray-300 mb-6">
              The found item you're looking for doesn't exist or may have been
              removed.
            </p>
            <Link
              to="/foundItems"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              <FaArrowLeft className="mr-2" />
              Back to Found Items
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              to="/foundItems"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200 mb-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Found Items
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {foundItemData?.foundItemName || "Found Item"}
            </h1>
            <p className="text-gray-300">
              Found item details and claim information
            </p>
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
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={foundItemData?.img}
                    alt={foundItemData?.foundItemName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/bgimg.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {foundItemData?.isClaimed ? (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg backdrop-blur-sm border border-green-400/50">
                      ✓ Claimed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg backdrop-blur-sm border border-blue-400/50">
                      🔍 Available
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">
                  Description
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {foundItemData?.description ||
                    "No description available for this item."}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center text-cyan-400 mb-2">
                    <FaCalendarAlt className="mr-3" />
                    <span className="font-semibold">Date Found</span>
                  </div>
                  <p className="text-gray-300">
                    {foundItemData?.date
                      ? new Date(foundItemData.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Date not specified"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center text-cyan-400 mb-2">
                    <FaMapMarkerAlt className="mr-3" />
                    <span className="font-semibold">Location</span>
                  </div>
                  <p className="text-gray-300">
                    {foundItemData?.location || "Location not specified"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center text-cyan-400 mb-2">
                    <FaTag className="mr-3" />
                    <span className="font-semibold">Category</span>
                  </div>
                  <p className="text-gray-300">
                    {foundItemData?.category?.name || "Uncategorized"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center text-cyan-400 mb-2">
                    <FaUser className="mr-3" />
                    <span className="font-semibold">Found By</span>
                  </div>
                  <p className="text-gray-300">
                    {foundItemData?.user?.username || "Anonymous"}
                  </p>
                </div>
              </div>

              {/* Claim Process Information */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                  Claim Process
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {foundItemData?.claimProcess ||
                    "To claim this item, please provide the date you lost it and any distinguishing features that can help verify ownership."}
                </p>

                {!foundItemData?.isClaimed ? (
                  <button
                    onClick={handleClaimModal}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl"
                  >
                    Start Claim Process
                  </button>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 text-center">
                    <p className="text-green-300 font-medium">
                      This item has already been claimed
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Claim Modal */}
      {isClaimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">Claim Process</h3>
              <button
                onClick={() => setIsClaimModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-300 mb-6 text-sm">
                Please provide the following information to verify your
                ownership of this item.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-white">
                    When did you lose this item? *
                  </label>
                  <input
                    type="date"
                    {...register("lostDate", {
                      required: "Lost date is required",
                    })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                  />
                  {errors.lostDate && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.lostDate.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-white">
                    Distinguishing Features *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe unique features, colors, brands, scratches, or any other identifying characteristics..."
                    {...register("distinguishingFeatures", {
                      required: "Distinguishing features are required",
                      minLength: {
                        value: 10,
                        message: "Please provide at least 10 characters",
                      },
                    })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-none"
                  />
                  {errors.distinguishingFeatures && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.distinguishingFeatures.message as string}
                    </p>
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsClaimModalOpen(false)}
                    className="flex-1 px-4 py-3 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || claimLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || claimLoading ? (
                      <div className="flex items-center justify-center">
                        <Spinner size="sm" className="mr-2" />
                        Submitting...
                      </div>
                    ) : (
                      "Submit Claim"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default SingleFoundItem;
