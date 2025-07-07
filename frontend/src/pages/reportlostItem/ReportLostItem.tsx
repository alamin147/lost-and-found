import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import Modals from "../../components/modal/Modal";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import {
  useCategoryQuery,
  useCreateLostItemMutation,
} from "../../redux/api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";

// Custom styles for DatePicker to match form styling
const datePickerStyles = `
  .react-datepicker__input-container input {
    background-color: rgb(55 65 81) !important;
    border: 1px solid rgb(75 85 99) !important;
    color: white !important;
    border-radius: 0.5rem !important;
    padding: 0.625rem !important;
    font-size: 0.875rem !important;
    width: 100% !important;
    outline: none !important;
  }
  .react-datepicker__input-container input:focus {
    border-color: rgb(59 130 246) !important;
    box-shadow: 0 0 0 1px rgb(59 130 246) !important;
  }
  .react-datepicker__input-container input::placeholder {
    color: rgb(156 163 175) !important;
  }
`;

const ReportLostItem = () => {
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
  const [createLostItem, { isLoading }] = useCreateLostItemMutation();
  const { data: Category } = useCategoryQuery("");
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = async (data: any) => {
    try {
      const lostData = {
        lostItemName: data.lostItemName,
        description: data.description,
        categoryId: selectedMenucategoryId,
        img: data.imgUrl,
        location: data.location,
        date: startDate,
      };
      const res: any = await createLostItem(lostData);
      if (res?.data?.success == false) {
        Modals({ message: "Failed to create Lost item", status: false });
      } else {
        Modals({ message: "Lost item reported successfully", status: true });
        reset();
      }
    } catch (err: any) {
      Modals({ message: "Failed to create Lost item", status: false });
    }
  };

  return (
    <>
      <style>{datePickerStyles}</style>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Report Lost Item
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Lost item name
                  </label>
                  <input
                    {...register("lostItemName", {
                      required: "Lost item name is required",
                    })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Laptop/Phone"
                  />
                  {errors.lostItemName && (
                    <p className="text-red-600">
                      {errors.lostItemName?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="What device look like, color"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-600">
                      {errors.description?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Image url
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="http://lost-image.com"
                    {...register("imgUrl", {
                      required: "Image url is required",
                    })}
                  />
                  {errors.imgUrl && (
                    <p className="text-red-600">
                      {errors.imgUrl?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Location
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="City, Country"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  {errors.location && (
                    <p className="text-red-600">
                      {errors.location?.message as string}
                    </p>
                  )}
                </div>{" "}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date
                  </label>
                  <DatePicker
                    wrapperClassName="w-full"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none cursor-pointer"
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
                          className="text-gray-900 dark:text-white"
                        >
                          {category?.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <IoIosArrowDown className="h-4 w-4" />
                    </div>
                  </div>
                  {!selectedMenu && (
                    <p className="text-red-600 pt-1">Category is required</p>
                  )}
                </div>
              </div>

              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl"
                >
                  Submit Lost Item
                </button>
              )}
            </form>

            {/* form */}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
export default ReportLostItem;
