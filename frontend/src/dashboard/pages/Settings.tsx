import { useState } from "react";
import {
  FaSave,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaBell,
  FaDatabase,
  FaEnvelope,
  FaGlobe,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  useChangePasswordMutation,
  useChangeEmailMutation,
  useChangeUsernameMutation,
} from "../../redux/api/api";
import { removeUserLocalStorage, useUserVerification } from "../../auth/auth";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const user = useUserVerification();
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);

  // Account management mutations
  const [changePassword, { isLoading: isPasswordLoading }] =
    useChangePasswordMutation();
  const [changeEmail, { isLoading: isEmailLoading }] = useChangeEmailMutation();
  const [changeUsername, { isLoading: isUsernameLoading }] =
    useChangeUsernameMutation();

  // Form hooks for account management
  const passwordForm = useForm();
  const emailForm = useForm();
  const usernameForm = useForm();

  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Lost & Found System",
    siteDescription: "A comprehensive lost and found management system",
    contactEmail: "contact@lostandfound.com",
    supportEmail: "support@lostandfound.com",
    siteUrl: "https://lostandfound.com",
    timezone: "UTC",
    language: "en",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    newItemNotifications: true,
    claimNotifications: true,
    reminderNotifications: true,

    // Security Settings
    enableTwoFactor: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requirePasswordChange: true,

    // System Settings
    itemExpiryDays: 30,
    maxImageSize: 5,
    allowedFileTypes: ["jpg", "jpeg", "png", "gif"],
    autoDeleteExpiredItems: true,
    requireItemApproval: false,

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    smtpSecure: true,
    fromName: "Lost & Found System",
    fromEmail: "noreply@lostandfound.com",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically send the settings to your backend
    toast.success("Settings saved successfully");
  };

  const handleTestEmail = () => {
    // Here you would test the email configuration
    toast.info("Testing email configuration...");
    setTimeout(() => {
      toast.success("Email test successful!");
    }, 2000);
  };

  // Account management handlers
  const handleChangePassword = async (data: any) => {
    try {
      const res: any = await changePassword(data);
      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data?.statusCode === 200) {
        toast.success("Password changed successfully!");
        passwordForm.reset();
      }
    } catch (err: any) {
      toast.error("Failed to change password.");
    }
  };

  const handleChangeEmail = async (data: any) => {
    try {
      const res: any = await changeEmail(data);
      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data?.statusCode === 200) {
        toast.success(
          `Email changed successfully! Your new email is ${data.email}. Please login again.`
        );
        emailForm.reset();
        removeUserLocalStorage();
        navigate("/login");
      }
    } catch (err: any) {
      toast.error("Failed to change email.");
    }
  };

  const handleChangeUsername = async (data: any) => {
    try {
      const res: any = await changeUsername(data);
      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data?.statusCode === 200) {
        toast.success(
          `Username changed successfully! Your new username is ${data.username}. Please login again.`
        );
        usernameForm.reset();
        removeUserLocalStorage();
        navigate("/login");
      }
    } catch (err: any) {
      toast.error("Failed to change username.");
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: <FaUser /> },
    { id: "general", label: "General", icon: <FaGlobe /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "security", label: "Security", icon: <FaShieldAlt /> },
    { id: "system", label: "System", icon: <FaDatabase /> },
    { id: "email", label: "Email", icon: <FaEnvelope /> },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">
            Configure system settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <FaSave className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-3/4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">
                  General Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) =>
                        handleSettingChange("siteName", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) =>
                        handleSettingChange("contactEmail", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) =>
                        handleSettingChange("supportEmail", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Site URL
                    </label>
                    <input
                      type="url"
                      value={settings.siteUrl}
                      onChange={(e) =>
                        handleSettingChange("siteUrl", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) =>
                        handleSettingChange("timezone", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        handleSettingChange("language", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) =>
                      handleSettingChange("siteDescription", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-8">
                <h2 className="text-xl font-semibold text-white">
                  Account Management
                </h2>

                {/* Change Password Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">
                    Change Password
                  </h3>
                  <form
                    onSubmit={passwordForm.handleSubmit(handleChangePassword)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            {...passwordForm.register("currentPassword", {
                              required: "Current password is required",
                            })}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                          >
                            {showPassword ? (
                              <FaEyeSlash className="h-4 w-4 text-gray-400" />
                            ) : (
                              <FaEye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {passwordForm.formState.errors.currentPassword && (
                          <p className="text-red-400 text-sm mt-1">
                            {
                              passwordForm.formState.errors.currentPassword
                                ?.message as string
                            }
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          {...passwordForm.register("newPassword", {
                            required: "New password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          })}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter new password"
                        />
                        {passwordForm.formState.errors.newPassword && (
                          <p className="text-red-400 text-sm mt-1">
                            {
                              passwordForm.formState.errors.newPassword
                                ?.message as string
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isPasswordLoading}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                    >
                      {isPasswordLoading ? "Changing..." : "Change Password"}
                    </button>
                  </form>
                </div>

                {/* Change Email Section */}
                <div className="space-y-4 border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-white">
                    Change Email
                  </h3>
                  <form
                    onSubmit={emailForm.handleSubmit(handleChangeEmail)}
                    className="space-y-4"
                  >
                    <div className="max-w-md">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        New Email Address
                      </label>
                      <input
                        type="email"
                        {...emailForm.register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new email address"
                      />
                      {emailForm.formState.errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {emailForm.formState.errors.email?.message as string}
                        </p>
                      )}
                    </div>

                    <div className="text-sm text-yellow-400">
                      ⚠️ Changing your email will log you out and require you to
                      login again.
                    </div>

                    <button
                      type="submit"
                      disabled={isEmailLoading}
                      className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
                    >
                      {isEmailLoading ? "Changing..." : "Change Email"}
                    </button>
                  </form>
                </div>

                {/* Change Username Section */}
                <div className="space-y-4 border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-white">
                    Change Username
                  </h3>
                  <form
                    onSubmit={usernameForm.handleSubmit(handleChangeUsername)}
                    className="space-y-4"
                  >
                    <div className="max-w-md">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        New Username
                      </label>
                      <input
                        type="text"
                        {...usernameForm.register("username", {
                          required: "Username is required",
                          minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message:
                              "Username can only contain letters, numbers, and underscores",
                          },
                        })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new username"
                      />
                      {usernameForm.formState.errors.username && (
                        <p className="text-red-400 text-sm mt-1">
                          {
                            usernameForm.formState.errors.username
                              ?.message as string
                          }
                        </p>
                      )}
                    </div>

                    <div className="text-sm text-yellow-400">
                      ⚠️ Changing your username will log you out and require you
                      to login again.
                    </div>

                    <button
                      type="submit"
                      disabled={isUsernameLoading}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition-colors"
                    >
                      {isUsernameLoading ? "Changing..." : "Change Username"}
                    </button>
                  </form>
                </div>

                {/* Current User Info */}
                <div className="space-y-4 border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-white">
                    Current Account Information
                  </h3>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Username:</span>
                      <span className="text-white">
                        {(user as any)?.username || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Email:</span>
                      <span className="text-white">
                        {(user as any)?.email || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Role:</span>
                      <span className="text-white capitalize">
                        {(user as any)?.role || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">
                  Notification Settings
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Email Notifications
                      </label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "emailNotifications",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        SMS Notifications
                      </label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "smsNotifications",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        New Item Notifications
                      </label>
                      <p className="text-sm text-gray-500">
                        Notify when new items are reported
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.newItemNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "newItemNotifications",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Claim Notifications
                      </label>
                      <p className="text-sm text-gray-500">
                        Notify when items are claimed
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.claimNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "claimNotifications",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Reminder Notifications
                      </label>
                      <p className="text-sm text-gray-500">
                        Send reminders for pending items
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.reminderNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "reminderNotifications",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">
                  Security Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password Expiry (days)
                    </label>
                    <input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) =>
                        handleSettingChange(
                          "passwordExpiry",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) =>
                        handleSettingChange(
                          "sessionTimeout",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) =>
                        handleSettingChange(
                          "maxLoginAttempts",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Two-Factor Authentication
                      </label>
                      <p className="text-sm text-gray-500">
                        Require 2FA for all users
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.enableTwoFactor}
                      onChange={(e) =>
                        handleSettingChange("enableTwoFactor", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Require Password Change
                      </label>
                      <p className="text-sm text-gray-500">
                        Force users to change default passwords
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.requirePasswordChange}
                      onChange={(e) =>
                        handleSettingChange(
                          "requirePasswordChange",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === "system" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">
                  System Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Item Expiry (days)
                    </label>
                    <input
                      type="number"
                      value={settings.itemExpiryDays}
                      onChange={(e) =>
                        handleSettingChange(
                          "itemExpiryDays",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Image Size (MB)
                    </label>
                    <input
                      type="number"
                      value={settings.maxImageSize}
                      onChange={(e) =>
                        handleSettingChange(
                          "maxImageSize",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Auto-delete Expired Items
                      </label>
                      <p className="text-sm text-gray-500">
                        Automatically remove expired items
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.autoDeleteExpiredItems}
                      onChange={(e) =>
                        handleSettingChange(
                          "autoDeleteExpiredItems",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Require Item Approval
                      </label>
                      <p className="text-sm text-gray-500">
                        Items must be approved before being visible
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.requireItemApproval}
                      onChange={(e) =>
                        handleSettingChange(
                          "requireItemApproval",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === "email" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    Email Settings (Demo)
                  </h2>
                  <button
                    onClick={handleTestEmail}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Test Email
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      value={settings.smtpHost}
                      onChange={(e) =>
                        handleSettingChange("smtpHost", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      SMTP Port
                    </label>
                    <input
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) =>
                        handleSettingChange(
                          "smtpPort",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      SMTP Username
                    </label>
                    <input
                      type="text"
                      value={settings.smtpUsername}
                      onChange={(e) =>
                        handleSettingChange("smtpUsername", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      SMTP Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={settings.smtpPassword}
                        onChange={(e) =>
                          handleSettingChange("smtpPassword", e.target.value)
                        }
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      From Name
                    </label>
                    <input
                      type="text"
                      value={settings.fromName}
                      onChange={(e) =>
                        handleSettingChange("fromName", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      From Email
                    </label>
                    <input
                      type="email"
                      value={settings.fromEmail}
                      onChange={(e) =>
                        handleSettingChange("fromEmail", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Use SSL/TLS
                    </label>
                    <p className="text-sm text-gray-500">
                      Enable secure email transmission
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.smtpSecure}
                    onChange={(e) =>
                      handleSettingChange("smtpSecure", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
