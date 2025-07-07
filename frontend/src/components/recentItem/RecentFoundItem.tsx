import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useGetFoundItemsQuery } from "../../redux/api/api";

const RecentFoundItem = () => {
  const { data: foundItems, isLoading } = useGetFoundItemsQuery({});
  console.log("found item", foundItems);
  if (isLoading) {
    return (
      <div className="min-h- text-center bg-gray-900 pt-10">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="bg-gray-900 py-10">
      <div className="px-4 mx-auto max-w-screen-2xl sm:py-6 lg:px-6">
        <div className="mx-auto text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white pt-20 md:pt-16">
            Recent Found Items
          </h2>
          <p className="font-light text-gray-400 sm:text-xl mb-8">
            These are the recent found item reports
          </p>
        </div>
      </div>
      {/* card items */}
      <div className="container mx-auto flex justify-center mb-10">
        <div className="grid gap-8 mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
          {foundItems?.data?.slice(0, 9).map((lostItem: any) => {
            return (
              <div
                key={`${lostItem?.id}127`}
                className="group relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-gray-600 max-w-sm"
              >
                <div className="relative overflow-hidden">
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      src={lostItem?.img}
                      alt={lostItem?.lostItemName}
                      width={500}
                      height={500}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {lostItem?.isFound ? (
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
                    {lostItem?.foundItemName}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {lostItem?.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 mr-2">📅</span>
                      <span className="text-gray-200">
                        {lostItem?.date.split("T")[0]}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 mr-2">📍</span>
                      <span className="text-gray-200 line-clamp-1">
                        {lostItem.location}
                      </span>
                    </div>
                  </div>

                  <Link to={`/foundItems/${lostItem?.id}`} className="block">
                    <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentFoundItem;
