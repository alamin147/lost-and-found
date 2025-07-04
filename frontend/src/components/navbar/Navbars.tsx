import { signOut, useUserVerification } from "../../auth/auth";
import {
  Avatar,
  Button,
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

export function Navbars() {
  const navigate = useNavigate();
  const users: any = useUserVerification();
  // console.log(users);
  const handleSignOut = () => {
    signOut(navigate);
    Modals({ message: "Log out successfully", status: true });
  };

  return (
    <>
      <Navbar
        fluid
        className="sticky top-0 z-50 bg-white border- border-gray-200 dark:bg-gray-900 dark:border-gray-700"
      >
        <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Lost & Found
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          {users?.email ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                users?.userImg ? (
                  <Avatar alt="User settings" img={users?.userImg} className="" rounded size="sm" />
                ) : (
                  <Avatar
                    alt="User settings"
                    rounded className=""
                    size="sm"
                    placeholderInitials={
                      users?.username?.charAt(0)?.toUpperCase() ||
                      users?.email?.charAt(0)?.toUpperCase() ||
                      "U"
                    }
                  />
                )
              }
            >
              <DropdownHeader>
                <span className="block text-sm">
                  {users?.email ? users?.email : "User"}
                </span>
                <span className="block truncate text-sm font-medium"></span>
              </DropdownHeader>
              {users?.role == "ADMIN" && (
                <DropdownItem>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownItem>
              )}
              <DropdownItem>
                <Link to="/settings/changeEmail">Settings</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/lostItems/myLostItems">My lost items</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/foundItems/myFoundItems">My found items</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/myClaimRequest">My claims</Link>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                {" "}
                <Button color="dark">Login</Button>
              </Link>
              <Link to="/register">
                {" "}
                <Button>Register</Button>
              </Link>
            </div>
          )}
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="/" active>
            Home
          </NavbarLink>
          <NavbarLink href="#aboutUs">About us</NavbarLink>
          <NavbarLink href="/lostItems">Lost items</NavbarLink>
          <NavbarLink href="/foundItems">Found items</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <ToastContainer />
    </>
  );
}
