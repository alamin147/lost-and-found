import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";
import { useAdminStatsQuery } from "../redux/api/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: adminStats, isLoading } = useAdminStatsQuery({});
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="animate-pulse">
          {/* Welcome Section Skeleton */}
          <div className="bg-gray-700 rounded-2xl h-32 mb-6"></div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-700 rounded-xl h-24"></div>
            ))}
          </div>

          {/* Recent Activity Section Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Feed Skeleton */}
            <div className="bg-gray-700 rounded-2xl p-6">
              <div className="h-6 bg-gray-600 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-3 p-3">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-600 rounded w-1/4"></div>
                    </div>
                    <div className="h-6 bg-gray-600 rounded-full w-16"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="bg-gray-700 rounded-2xl p-6">
              <div className="h-6 bg-gray-600 rounded w-1/3 mb-6"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-600 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const recentActivity = [
    {
      id: 1,
      type: "found",
      title: "iPhone 13 Pro found in Library",
      time: "2 hours ago",
      status: "new",
    },
    {
      id: 2,
      type: "claim",
      title: "Claim submitted for Wallet",
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: "3",
      type: "lost",
      title: "MacBook reported lost in Cafeteria",
      time: "6 hours ago",
      status: "active",
    },
    {
      id: 4,
      type: "resolved",
      title: "Keys successfully returned to owner",
      time: "8 hours ago",
      status: "resolved",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back to the Dashboard!
        </h1>
        <p className="text-cyan-100">
          Here's what's happening with your lost and found system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Found Items</p>
              <p className="text-2xl font-bold text-white">
                {adminStats?.data?.foundItems || "0"}
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaBoxOpen className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Lost Items</p>
              <p className="text-2xl font-bold text-red-500">
                {adminStats?.data?.lostItems || "0"}
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaExclamationTriangle className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Claims</p>
              <p className="text-2xl font-bold text-yellow-500">
                {adminStats?.data?.pendingClaims || "0"}
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaClipboardList className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-green-500">
                {adminStats?.data?.totalUsers || "0"}
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaUsers className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="bg-gradient-to-br from-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "found"
                      ? "bg-blue-500"
                      : activity.type === "claim"
                      ? "bg-yellow-500"
                      : activity.type === "lost"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">
                    {activity.title}
                  </p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === "new"
                      ? "bg-blue-900 text-blue-300"
                      : activity.status === "pending"
                      ? "bg-yellow-900 text-yellow-300"
                      : activity.status === "active"
                      ? "bg-red-900 text-red-300"
                      : "bg-green-900 text-green-300"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>

          <div className="space-y-3">
            <Link to="/dashboard/categories">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-color rounded-lg transition-all duration-200 text-white font-medium">
                <span>Add New Category</span>
                <FaChartLine className="w-5 h-5" />
              </button>
            </Link>

            <Link to="/dashboard/users">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-color rounded-lg transition-all duration-200 text-white font-medium">
                <span>Manage Users</span>
                <FaUsers className="w-5 h-5" />
              </button>
            </Link>

            <Link to="/dashboard/settings">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-color rounded-lg transition-all duration-200 text-white font-medium">
                <span>Settings</span>
                <FaBoxOpen className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
