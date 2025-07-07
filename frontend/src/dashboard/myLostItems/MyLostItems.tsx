"use client";
import {
  Button,
  Spinner,
  Modal,
  Label,
  TextInput,
  ModalHeader,
  ModalBody,
} from "flowbite-react";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import img from "../../assets/3576506_65968.jpg";
import {
  useDeleteMyLostItemMutation,
  useEditMyLostItemMutation,
  useGetMyLostItemQuery,
} from "../../redux/api/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modals from "../../components/modal/Modal";
import { ToastContainer } from "react-toastify";

const MyLostItems = () => {
  const { data: myLostItems, isLoading } = useGetMyLostItemQuery({});
  const [deleteMyLostItem] = useDeleteMyLostItemMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem]: any = useState(null);
  const [currId, setCurrId]: any = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete]: any = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      const res = await deleteMyLostItem(itemToDelete.id);
      if (res?.data?.statusCode == 200) {
        Modals({ message: res?.data?.message, status: true });
      } else {
        Modals({ message: "Failed to delete", status: false });
      }
    } catch (error) {
      Modals({ message: "Failed to delete", status: false });
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
    setIsDeleting(false);
  };

  const [editMyLostItem] = useEditMyLostItemMutation();

  const openModal = (item: any) => {
    setCurrentItem(item);
    setIsOpen(true);
    setCurrId(item?.id);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentItem(null);
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    data.id = currId;
    data.date = new Date(data?.date).toISOString();

    const res = await editMyLostItem(data);
    if (res?.data?.statusCode == 200) {
      Modals({ message: res?.data?.message, status: true });
    } else {
      Modals({ message: "Failed to update", status: false });
    }

    // console.log( res);
    closeModal();
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <Spinner size="xl" className="mb-4" />
          <p className="text-gray-300">Loading your lost items...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
              My Lost Items
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Manage and track your lost item reports
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-white">
                  {myLostItems?.data?.length || 0}
                </p>
              </div>
              <div className="bg-gray-500 p-3 rounded-lg">
                <FaSearch className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Not Found</p>
                <p className="text-2xl font-bold text-red-400">
                  {myLostItems?.data?.filter((item: any) => !item.isFound)
                    .length || 0}
                </p>
              </div>
              <div className="bg-gray-500 p-3 rounded-lg">
                <FaTimesCircle className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Found</p>
                <p className="text-2xl font-bold text-green-400">
                  {myLostItems?.data?.filter((item: any) => item.isFound)
                    .length || 0}
                </p>
              </div>
              <div className="bg-gray-500 p-3 rounded-lg">
                <FaCheckCircle className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        {myLostItems?.data?.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 shadow-xl border border-gray-700 max-w-md mx-auto">
              <div className="text-6xl mb-6">📋</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No Lost Items Found
              </h3>
              <p className="text-gray-300 mb-6">
                You haven't reported any lost items yet. Start by reporting a
                lost item to track it here.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-900 to-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Item
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Date Lost
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {myLostItems?.data?.map((myLostItem: any) => (
                    <tr
                      key={myLostItem.id}
                      className="hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-12 h-12 mr-4">
                            <img
                              className="w-12 h-12 rounded-lg object-cover"
                              src={myLostItem?.img || img}
                              alt={myLostItem?.lostItemName}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = img;
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {myLostItem?.lostItemName}
                            </div>
                            <div className="text-sm text-gray-400 truncate max-w-xs">
                              {myLostItem?.description ||
                                "No description provided."}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {myLostItem?.isFound ? (
                            <>
                              <FaCheckCircle className="mr-2 text-green-400" />
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-900/30 border border-green-500/50 text-green-300">
                                Found
                              </span>
                            </>
                          ) : (
                            <>
                              <FaTimesCircle className="mr-2 text-red-400" />
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-900/30 border border-red-500/50 text-red-300">
                                Not Found
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-gray-400" />
                          <span className="truncate max-w-xs">
                            {myLostItem?.location || "Location not specified"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-gray-400" />
                          <span>
                            {myLostItem?.date?.split("T")[0] ||
                              "Date not available"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openModal(myLostItem)}
                            className="p-2 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors duration-200 transform hover:scale-110"
                            title="Edit item"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(myLostItem)}
                            className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors duration-200 transform hover:scale-110"
                            title="Delete item"
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
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal show={isOpen} size="md" popup={true} onClose={closeModal}>
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
          <ModalHeader className="border-b border-gray-700">
            <h3 className="text-xl font-medium text-white">Edit Lost Item</h3>
          </ModalHeader>
          <ModalBody className="bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="space-y-6 p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Label
                    htmlFor="lostItemName"
                    className="text-gray-300 mb-2 block"
                  >
                    Item Name
                  </Label>
                  <TextInput
                    id="lostItemName"
                    defaultValue={currentItem?.lostItemName}
                    {...register("lostItemName", { required: true })}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  {errors.lostItemName && (
                    <span className="text-red-400 text-sm">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <Label
                    htmlFor="description"
                    className="text-gray-300 mb-2 block"
                  >
                    Description
                  </Label>
                  <TextInput
                    id="description"
                    defaultValue={currentItem?.description}
                    {...register("description", { required: true })}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  {errors.description && (
                    <span className="text-red-400 text-sm">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <Label
                    htmlFor="location"
                    className="text-gray-300 mb-2 block"
                  >
                    Location
                  </Label>
                  <TextInput
                    id="location"
                    defaultValue={currentItem?.location}
                    {...register("location", { required: true })}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  {errors.location && (
                    <span className="text-red-400 text-sm">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <Label htmlFor="date" className="text-gray-300 mb-2 block">
                    Date Lost
                  </Label>
                  <TextInput
                    type="date"
                    id="date"
                    defaultValue={currentItem?.date?.split("T")[0]}
                    {...register("date", { required: true })}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  {errors.date && (
                    <span className="text-red-400 text-sm">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Save Changes
                  </Button>
                  <Button
                    color="gray"
                    onClick={closeModal}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </ModalBody>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={isDeleteModalOpen}
        size="md"
        popup={true}
        onClose={handleDeleteCancel}
      >
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
          <ModalHeader className="border-b border-gray-700">
            <h3 className="text-xl font-medium text-white">Delete Lost Item</h3>
          </ModalHeader>
          <ModalBody className="bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="space-y-6 p-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FaTrash className="text-red-600 text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Are you sure you want to delete this item?
                  </h3>
                  <p className="text-gray-400 mb-4">
                    This action cannot be undone. The lost item report will be
                    permanently removed.
                  </p>
                </div>

                {itemToDelete && (
                  <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
                    <div className="flex items-center">
                      <img
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                        src={itemToDelete?.img || img}
                        alt={itemToDelete?.lostItemName}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = img;
                        }}
                      />
                      <div>
                        <h4 className="font-medium text-white mb-1">
                          {itemToDelete?.lostItemName}
                        </h4>
                        <p className="text-sm text-gray-400 mb-1">
                          {itemToDelete?.description}
                        </p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Location: {itemToDelete?.location}</span>
                          <span>Date: {itemToDelete?.date?.split("T")[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-3">
                  <Button
                    color="gray"
                    onClick={handleDeleteCancel}
                    disabled={isDeleting}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteConfirm}
                    disabled={isDeleting}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    {isDeleting ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Item"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>

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

export default MyLostItems;
