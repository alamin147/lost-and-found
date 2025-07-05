import { useGetSingleLostItemQuery } from "../../redux/api/api";
import { Button, Spinner } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const SingleLostItem = () => {
  const { lostItem: lostItemParam } = useParams<{ lostItem: string }>();
  const lostItemId = lostItemParam;

  if (!lostItemId) {
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

  const { data: singleLostItem, isLoading } =
    useGetSingleLostItemQuery(lostItemId);
  const lostItem = singleLostItem?.data;
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

  if (!lostItemId) {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="xl" className="mb-4" />
          <p className="text-gray-400">Loading lost item details...</p>
        </div>
      </div>
    );
  }

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

  return (
    <>
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <img
                src={img}
                alt={lostItemName}
                className="rounded-lg w-full object-cover "
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
                width={500}
                height={500}
              />
            </div>
            <div className="grid gap-6">
              <div>
                <h1 className="text-3xl font-bold">{lostItemName}</h1>
                <p className="text-gray-400">
                  Lost on {new Date(date)?.toLocaleDateString()} in {location}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-gray-400">{description}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Details</h2>

                <div className="grid gap-2 text-gray-400">
                  <p>
                    <span className="font-medium">Date Lost:</span>{" "}
                    {new Date(date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> {location}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {category?.name}
                  </p>
                  <p>
                    <span className="font-medium">Reported By:</span>{" "}
                    {user?.username}
                  </p>

                  <p className="font-bold text-gray-700 dark:text-gray-300">
                    Status:{" "}
                    <span className="text-gray-600 dark:text-gray-300">
                      {isFound ? (
                        <span className="text-green-500">Found</span>
                      ) : (
                        <span className="text-red-500">Not Found</span>
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <Button className="mt-10 w-1/2">Claim</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLostItem;
