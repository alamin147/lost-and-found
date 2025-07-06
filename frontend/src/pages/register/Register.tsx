import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import Modals from "../../components/modal/Modal";
import { ToastContainer } from "react-toastify";
import { useRegistersMutation } from "../../redux/api/api";
import { useNavigate } from "react-router-dom";
import {
  MdEmail,
  MdPerson,
  MdImage,
  MdLock,
  MdCheckCircle,
} from "react-icons/md";
const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [registers, { isLoading }] = useRegistersMutation();
  const onSubmit = async (data: any) => {
    // console.log(data)
    if (data.password == data.conpassword) {
      try {
        const res: any = await registers(data).unwrap();
        console.log(res);
        if (res?.success == false) {
          Modals({
            message: res?.message ? res?.message : "Failed to register",
            status: false,
          });
          return;
        }
        if (res?.success == true) {
          Modals({
            message: "User registered successfully. Please login again!!!",
            status: true,
          });
          navigate("/login");
        }
      } catch (err: any) {
        console.log("errorrrrr", err.data.message);
        Modals({
          message: err?.data?.message
            ? err?.data?.message
            : "Failed to register",
          status: false,
        });
      }
    } else {
      Modals({
        message: "Password and confirm password are not same",
        status: false,
      });
      return;
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
                  Create Account
                </h1>
                <p className="text-gray-300">
                  Join our lost and found community
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
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      className="bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm w-full"
                      placeholder="name@company.com"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <MdEmail className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {errors.email?.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-300">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      placeholder="Choose a username"
                      className="bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm w-full"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <MdPerson className="w-5 h-5 text-gray-400" />
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
                    Profile Image URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("userImg")}
                      placeholder="https://example.com/your-image.jpg"
                      className="bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm w-full"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <MdImage className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.userImg && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {errors.userImg?.message as string}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        placeholder="••••••••"
                        className="bg-gray-50/50 border-2 border-gray-200 text-gray-900 text-sm rounded-xl focus:border-blue-400 block w-full p-3.5 pr-12 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-400 transition-all duration-200 hover:border-gray-300 outline-none"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <MdLock className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1 font-medium">
                        {errors.password?.message as string}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        {...register("conpassword", {
                          required: "Confirm Password is required",
                        })}
                        placeholder="••••••••"
                        className="bg-gray-50/50 border-2 border-gray-200 text-gray-900 text-sm rounded-xl focus:border-blue-400 block w-full p-3.5 pr-12 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-400 transition-all duration-200 hover:border-gray-300 outline-none"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <MdCheckCircle className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.conpassword && (
                      <p className="text-red-500 text-sm mt-1 font-medium">
                        {errors.conpassword?.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="flex items-center space-x-2">
                      <Spinner
                        aria-label="Loading"
                        size="md"
                        className="text-blue-600"
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        Creating your account...
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl"
                  >
                    Create Account
                  </button>
                )}

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      Sign in here
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
export default Register;
