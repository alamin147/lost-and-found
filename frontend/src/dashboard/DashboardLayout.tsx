import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSearch,
  FaClipboardList,
  FaUsers,
  FaBoxOpen,
  FaExclamationTriangle,
  FaCog,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { useUserVerification, signOut } from "../auth/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const user = useUserVerification() as any; // Type assertion for user object

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
      badge: null,
    },
    {
      title: "Found Items",
      icon: <FaSearch />,
      path: "/dashboard/found-items",
      badge: null,
    },
    {
      title: "Lost Items",
      icon: <FaExclamationTriangle />,
      path: "/dashboard/lost-items",
      badge: null,
    },
    {
      title: "Claims",
      icon: <FaClipboardList />,
      path: "/dashboard/claims",
      badge: "3",
    },
    {
      title: "Users",
      icon: <FaUsers />,
      path: "/dashboard/users",
      badge: null,
      adminOnly: true,
    },
    {
      title: "Categories",
      icon: <FaBoxOpen />,
      path: "/dashboard/categories",
      badge: null,
      adminOnly: true,
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/dashboard/settings",
      badge: null,
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || user?.role === "ADMIN"
  );

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const handleSignOut = () => {
    signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700 z-50 transition-all duration-300 shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"} w-64`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FaSearch className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Lost & Found</h1>
                <p className="text-gray-400 text-xs">Admin Dashboard</p>
              </div>
            </div>
          )}

          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white p-2"
          >
            <FaTimes />
          </button>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:block text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {filteredMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <div
                  className={`flex-shrink-0 ${
                    sidebarCollapsed ? "mx-auto" : "mr-3"
                  }`}
                >
                  {item.icon}
                </div>

                {!sidebarCollapsed && (
                  <>
                    <span className="font-medium truncate">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed sidebar */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.title}
                    {item.badge && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 mx-3 border-t border-gray-700"></div>

          {/* Quick Actions */}
          <div className="px-3 space-y-1">
            <Link
              to="/"
              className="flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 group relative"
            >
              <div
                className={`flex-shrink-0 ${
                  sidebarCollapsed ? "mx-auto" : "mr-3"
                }`}
              >
                <FaHome />
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium">Back to Site</span>
              )}

              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  Back to Site
                </div>
              )}
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 group relative"
            >
              <div
                className={`flex-shrink-0 ${
                  sidebarCollapsed ? "mx-auto" : "mr-3"
                }`}
              >
                <FaSignOutAlt />
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium">Sign Out</span>
              )}

              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  Sign Out
                </div>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Top Navbar */}
        <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaBars />
            </button>

            {/* Page Title */}
            <div className="flex-1 lg:ml-0 ml-4">
              <h1 className="text-white text-xl font-semibold">
                {location.pathname === "/dashboard" && "Dashboard Overview"}
                {location.pathname.includes("/found-items") &&
                  "Found Items Management"}
                {location.pathname.includes("/lost-items") &&
                  "Lost Items Management"}
                {location.pathname.includes("/claims") && "Claims Management"}
                {location.pathname.includes("/users") && "User Management"}
                {location.pathname.includes("/categories") &&
                  "Category Management"}
                {location.pathname.includes("/settings") && "Settings"}
              </h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-white text-sm font-medium">
                  {user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-gray-400 text-xs">{user?.role || "USER"}</p>
              </div>

              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.email?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>

      {/* Toast Container */}
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
    </div>
  );
};

export default DashboardLayout;
