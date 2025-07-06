import { useState } from "react";
import { FaTrash, FaSearch, FaShieldAlt, FaUser, FaBan } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGetAllUsersQuery, useBlockUserMutation } from "../../redux/api/api";

interface ApiUser {
  id: string;
  username: string;
  email: string;
  activated: boolean;
  password: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  createdAt: string;
  updatedAt: string;
  userImg: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
  createdAt: string;
  lastLogin?: string;
  itemsReported: number;
  claimsMade: number;
  profileImage?: string;
}

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const { data: allUsersData, isLoading } = useGetAllUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();

  // Transform API user data to match our interface
  const transformUser = (apiUser: ApiUser): User => ({
    id: apiUser.id,
    name: apiUser.username,
    email: apiUser.email,
    role: apiUser.role,
    status: apiUser.activated ? "ACTIVE" : "SUSPENDED",
    createdAt: apiUser.createdAt,
    lastLogin: undefined,
    itemsReported: 0,
    claimsMade: 0,
    profileImage: apiUser.userImg || undefined,
  });

  const users = allUsersData?.data ? allUsersData.data.map(transformUser) : [];

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "ALL" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = (_id: string, _newRole: string) => {
    toast.info(
      "Role change functionality needs to be implemented on the backend"
    );
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      if (newStatus === "SUSPENDED") {
        await blockUser(id).unwrap();
        toast.success("User blocked successfully");
      } else if (newStatus === "ACTIVE") {
        await blockUser(id).unwrap();
        toast.success("User activated successfully");
      } else {
        toast.info(
          "Status change functionality needs to be implemented on the backend"
        );
      }
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const handleDelete = (_id: string) => {
    // This would need to be implemented with an API call to delete user
    // For now, just show a confirmation
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      toast.info(
        "User deletion functionality needs to be implemented on the backend"
      );
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500";
      case "MODERATOR":
        return "bg-blue-500";
      case "USER":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500";
      case "SUSPENDED":
        return "bg-yellow-500";
      case "BANNED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <FaShieldAlt className="text-red-500" />;
      case "MODERATOR":
        return <FaShieldAlt className="text-blue-500" />;
      case "USER":
        return <FaUser className="text-green-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">
            Manage system users and permissions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">{users.length}</p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaUser className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-green-500">
                {users.filter((user: User) => user.status === "ACTIVE").length}
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaUser className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Admins</p>
              <p className="text-2xl font-bold text-red-500">
                {users.filter((user: User) => user.role === "ADMIN").length}
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaShieldAlt className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Suspended</p>
              <p className="text-2xl font-bold text-yellow-500">
                {
                  users.filter((user: User) => user.status === "SUSPENDED")
                    .length
                }
              </p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <FaBan className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="MODERATOR">Moderator</option>
              <option value="USER">User</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="BANNED">Banned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Joined
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user: User) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {getRoleIcon(user.role)}
                      <div>
                        <div className="font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getRoleColor(
                        user.role
                      )}`}
                    >
                      <option value="USER">User</option>
                      <option value="MODERATOR">Moderator</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.status}
                      onChange={(e) =>
                        handleStatusChange(user.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                        user.status
                      )}`}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="SUSPENDED">Suspended</option>
                      <option value="BANNED">Banned</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <FaUser className="mx-auto text-4xl text-gray-500 mb-4" />
            <p className="text-gray-400">
              No users found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
