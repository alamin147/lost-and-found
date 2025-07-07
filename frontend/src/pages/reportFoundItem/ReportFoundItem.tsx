"use client";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import Modals from "../../components/modal/Modal";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import {
  useCategoryQuery,
  useCreateFoundItemMutation,
} from "../../redux/api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportFoundItem = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedMenu, setselectedMenu] = useState("");
  const [selectedMenucategoryId, setselectedMenucategoryId] = useState("");
  const handleMenuChange = (menuName: string, categoryId: string) => {
    setselectedMenu(menuName);
    setselectedMenucategoryId(categoryId);
  };
  const [createFoundItem, { isLoading }] = useCreateFoundItemMutation();
  const { data: Category } = useCategoryQuery("");

  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = async (data: any) => {
    try {
      const foundData = {
        img: data.imgUrl,
        categoryId: selectedMenucategoryId,
        foundItemName: data.foundItemName,
        description: data.description,
        location: data.location,
        date: startDate,
        claimProcess: data.claimProcess,
      };

      const res: any = await createFoundItem(foundData);

      if (res?.data?.success == false) {
        Modals({ message: "Failed to create Found item", status: false });
      } else {
        Modals({ message: "Found item created successfully", status: true });
        reset();
      }
    } catch (err: any) {
      Modals({ message: "Failed to create Found item", status: false });
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Report Found Item
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Found item name
                  </label>
                  <input
                    {...register("foundItemName", {
                      required: "Found item name is required",
                    })}
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 backdrop-blur-sm"
                    placeholder="Laptop/Phone"
                  />
                  {errors.foundItemName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.foundItemName?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 backdrop-blur-sm"
                    placeholder="What device look like, color"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.description?.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Image url
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 backdrop-blur-sm"
                    placeholder="http://found-image.com"
                    {...register("imgUrl", {
                      required: "Image url is required",
                    })}
                  />
                  {errors.imgUrl && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.imgUrl?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 backdrop-blur-sm"
                    placeholder="City, Country"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  {errors.location && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.location?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Claim Process
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 backdrop-blur-sm"
                    placeholder="How should someone claim this item?"
                    {...register("claimProcess", {
                      required: "Claim process is required",
                    })}
                  />
                  {errors.claimProcess && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.claimProcess?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Date
                  </label>
                  <DatePicker
                    wrapperClassName="w-full"
                    className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 backdrop-blur-sm"
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 backdrop-blur-sm appearance-none cursor-pointer"
                      value={selectedMenucategoryId}
                      onChange={(e) => {
                        const selectedCategory = Category?.data?.find(
                          (cat: any) => cat.id === e.target.value
                        );
                        if (selectedCategory) {
                          handleMenuChange(
                            selectedCategory.name,
                            selectedCategory.id
                          );
                        }
                      }}
                    >
                      <option value="" disabled className="text-gray-400">
                        Select a category
                      </option>
                      {Category?.data?.map((category: any) => (
                        <option
                          key={category?.id}
                          value={category?.id}
                          className="text-white bg-gray-700"
                        >
                          {category?.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {!selectedMenu && (
                    <p className="text-red-400 text-sm mt-1">
                      Category is required
                    </p>
                  )}
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl"
                >
                  Submit Found Item
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
export default ReportFoundItem;
