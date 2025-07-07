import { signOut, useUserVerification } from "../../auth/auth";
import {
  Dropdown,
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Modals from "../modal/Modal";
import { ToastContainer } from "react-toastify";
import {
  FaSearch,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaList,
  FaTachometerAlt,
} from "react-icons/fa";

export function Navbars() {
  const navigate = useNavigate();
  const users: any = useUserVerification();
  // console.log(users);
  const handleSignOut = () => {
    signOut(navigate);
    Modals({ message: "Log out successfully", status: true });
    window.location.reload();
  };

  return (
    <>
      <Navbar
        fluid
        className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-md border-b border-gray-700 shadow-2xl"
      >
        <NavbarBrand href="/">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <FaSearch className="text-white text-lg" />
            </div>
            <div className="hidden sm:block">
              <span className="self-center whitespace-nowrap text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Lost & Found
              </span>
              <p className="text-gray-400 text-xs">Find what matters</p>
            </div>
          </div>
        </NavbarBrand>
        <div className="flex md:order-2">
          {users?.email ? (
            <div className="flex items-center space-x-3">
              {/* User info - hidden on mobile */}
              <div className="hidden lg:block text-right">
                <p className="text-white text-sm font-medium">
                  {users?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-gray-400 text-xs">{users?.role || "USER"}</p>
              </div>

              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="relative group cursor-pointer">
                    {users?.userImg ? (
                      <img
                        src={users?.userImg}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-200 shadow-lg"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-200 shadow-lg">
                        <span className="text-white font-semibold text-sm">
                          {users?.username?.charAt(0)?.toUpperCase() ||
                            users?.email?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                  </div>
                }
                className="bg-gray-800 border border-gray-700 shadow-2xl"
              >
                <DropdownHeader className="bg-gray-700/50">
                  <div className="flex items-center space-x-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {users?.email?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-white font-medium text-sm">
                        {users?.email ? users?.email : "User"}
                      </span>
                      <span className="block text-gray-400 text-xs">
                        {users?.role}
                      </span>
                    </div>
                  </div>
                </DropdownHeader>

                {users?.role === "ADMIN" && (
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
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                  Register
                </button>
              </Link>
            </div>
          )}
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink
            href="/"
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-3 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2"
          >
            <span>Home</span>
          </NavbarLink>
          <NavbarLink
            href="/reportlostItem"
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          >
            Report Lost Item
          </NavbarLink>
          <NavbarLink
            href="/reportFoundItem"
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          >
            Report Found Item
          </NavbarLink>
          <NavbarLink
            href="/lostItems"
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          >
            Lost items
          </NavbarLink>
          <NavbarLink
            href="/foundItems"
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          >
            Found items
          </NavbarLink>
          <NavbarLink
            href="#aboutUs"
            className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          >
            About us
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
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
}
