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
  FaUser,
  FaList,
} from "react-icons/fa";
import { useUserVerification, signOut } from "../auth/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import Modals from "../components/modal/Modal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const user = useUserVerification() as any;

  // console.log({user})
  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
      badge: null,
      adminOnly: true,
    },
    {
      title: "Found Items",
      icon: <FaSearch />,
      path: "/dashboard/found-items",
      adminOnly: true,
      badge: null,
    },
    {
      title: "Lost Items",
      icon: <FaExclamationTriangle />,
      path: "/dashboard/lost-items",
      adminOnly: true,
      badge: null,
    },
    {
      title: "Claims",
      icon: <FaClipboardList />,
      path: "/dashboard/claims",
      adminOnly: true,
      badge: null,
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
      title: "My Lost Items",
      icon: <FaSearch />,
      path: "/dashboard/myLostItems",
      badge: null,
      adminOnly: false,
    },
    {
      title: "My Found Items",
      icon: <FaBoxOpen />,
      path: "/dashboard/myFoundItems",
      badge: null,
      adminOnly: false,
    },
    {
      title: "My Claims",
      icon: <FaBoxOpen />,
      path: "/dashboard/myClaimRequest",
      badge: null,
      adminOnly: false,
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/dashboard/settings",
      badge: null,
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || user?.role == "ADMIN"
  );

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const handleSignOut = () => {
    signOut();
    Modals({ message: "Log out successfully", status: true });
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

              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="relative group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-200 shadow-lg">
                      <span className="text-white font-semibold text-sm">
                        {user?.email?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                  </div>
                }
                className="bg-gray-800 border border-gray-700 shadow-2xl"
              >
                <DropdownHeader className="bg-gray-700/50">
                  <div className="flex items-center space-x-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {user?.email?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-white font-medium text-sm">
                        {user?.email ? user?.email : "User"}
                      </span>
                      <span className="block text-gray-400 text-xs">
                        {user?.role}
                      </span>
                    </div>
                  </div>
                </DropdownHeader>

                {user?.role === "ADMIN" && (
                  <DropdownItem className="hover:bg-gray-700 text-gray-300 hover:text-white">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 w-full"
                    >
                      <FaTachometerAlt className="text-cyan-400" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownItem>
                )}

                <DropdownItem className="hover:bg-gray-700 text-gray-300 hover:text-white">
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center space-x-2 w-full"
                  >
                    <FaCog className="text-blue-400" />
                    <span>Settings</span>
                  </Link>
                </DropdownItem>

                <DropdownItem className="hover:bg-gray-700 text-gray-300 hover:text-white">
                  <Link
                    to="/dashboard/myLostItems"
                    className="flex items-center space-x-2 w-full"
                  >
                    <FaList className="text-yellow-400" />
                    <span>My lost items</span>
                  </Link>
                </DropdownItem>

                <DropdownItem className="hover:bg-gray-700 text-gray-300 hover:text-white">
                  <Link
                    to="/dashboard/myFoundItems"
                    className="flex items-center space-x-2 w-full"
                  >
                    <FaSearch className="text-green-400" />
                    <span>My found items</span>
                  </Link>
                </DropdownItem>

                <DropdownItem className="hover:bg-gray-700 text-gray-300 hover:text-white">
                  <Link
                    to="/dashboard/myClaimRequest"
                    className="flex items-center space-x-2 w-full"
                  >
                    <FaUser className="text-purple-400" />
                    <span>My claims</span>
                  </Link>
                </DropdownItem>

                <DropdownItem className="hover:bg-gray-700 text-gray-300 hover:text-white">
                  <Link to="/" className="flex items-center space-x-2 w-full">
                    <FaHome className="text-blue-400" />
                    <span>Back to Site</span>
                  </Link>
                </DropdownItem>

                <DropdownDivider className="border-gray-600" />

                <DropdownItem
                  onClick={handleSignOut}
                  className="hover:bg-red-600 text-gray-300 hover:text-white"
                >
                  <div className="flex items-center space-x-2 w-full">
                    <FaSignOutAlt className="text-red-400" />
                    <span>Sign out</span>
                  </div>
                </DropdownItem>
              </Dropdown>
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
