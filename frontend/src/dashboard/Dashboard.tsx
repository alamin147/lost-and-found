import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaExclamationTriangle,
  FaChartLine,
  FaArrowUp,
} from "react-icons/fa";
import { useAdminStatsQuery } from "../redux/api/api";
import { Spinner } from "flowbite-react";

const Dashboard = () => {
  const { data: adminStats, isLoading } = useAdminStatsQuery({});
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Found Items",
      value: adminStats?.data?.foundItems || "0",
      change: "+12%",
      changeType: "increase",
      icon: <FaBoxOpen className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Lost Items",
      value: adminStats?.data?.lostItems || "0",
      change: "+8%",
      changeType: "increase",
      icon: <FaExclamationTriangle className="w-6 h-6" />,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Pending Claims",
      value: adminStats?.data?.pendingClaims || "0",
      change: "+5%",
      changeType: "increase",
      icon: <FaClipboardList className="w-6 h-6" />,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Active Users",
      value: adminStats?.data?.totalUsers || "0",
      change: "+18%",
      changeType: "increase",
      icon: <FaUsers className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
    },
  ];

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
      id: 3,
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
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r text-white`}>
                {stat.icon}
              </div>
              <div
                className={`flex items-center text-sm ${
                  stat.changeType === "increase"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                <FaArrowUp className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
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
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg transition-all duration-200 text-white font-medium">
              <span>Add New Category</span>
              <FaChartLine className="w-5 h-5" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200 text-white font-medium">
              <span>Generate Report</span>
              <FaClipboardList className="w-5 h-5" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 text-white font-medium">
              <span>Manage Users</span>
              <FaUsers className="w-5 h-5" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg transition-all duration-200 text-white font-medium">
              <span>System Settings</span>
              <FaBoxOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
