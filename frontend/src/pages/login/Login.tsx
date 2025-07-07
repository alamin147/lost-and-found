import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import Modals from "../../components/modal/Modal";
import { ToastContainer } from "react-toastify";
import { setUserLocalStorage } from "../../auth/auth";
import { useLoginMutation } from "../../redux/api/api";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();
  const onSubmit = async (data: any) => {
    // console.log(data)
    try {
      const res: any = await login(data);
      console.log(res);
      if (res?.data) {
        Modals({ message: "User logged in successfully", status: true });
        setUserLocalStorage(res?.data?.data?.token);
        navigate("/");
        // Reload the page to update user state
        window.location.reload();
      } else {
        Modals({ message: res?.error?.data?.message, status: false });
      }
    } catch (err: any) {
      Modals({ message: "Failed to login", status: false });
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
        <div className="flex flex-col items-center justify-center px-6 mx-auto w-full">
          <div className="w-full max-w-lg bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-gray-300">
                  Sign in to your account
                </p>
              </div>

              {/* form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                action="#"
              >
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-300">
                    Email or Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className="bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm w-full"
                      placeholder="name@company.com or username"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <MdEmail className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {errors.username?.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder="••••••••"
                      className="bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm w-full"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-300 transition-colors duration-200 mr-2"
                      >
                        {showPassword ? (
                          <MdVisibilityOff className="w-5 h-5" />
                        ) : (
                          <MdVisibility className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {errors.password?.message as string}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center"></div>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="flex items-center space-x-2">
                      <Spinner
                        aria-label="Loading"
                        size="md"
                        className="text-blue-600"
                      />
                      <span className="text-gray-300">
                        Signing you in...
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl"
                  >
                    Sign In
                  </button>
                )}

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-300">
                    Don't have an account yet?{" "}
                    <a
                      href="/register"
                      className="font-semibold text-blue-400 hover:text-cyan-400 transition-colors duration-200"
                    >
                      Sign up here
                    </a>
                  </p>
                </div>
              </form>
              {/* form */}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
export default Login;
