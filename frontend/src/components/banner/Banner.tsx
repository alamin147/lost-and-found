import { useState } from "react";

const Banner = () => {
  const [bgImg] = useState("/bgimg.png");
  return (
    <section className="relative md:flex items-center md:min-h-[70vh] bg-white dark:bg-gray-900 py-10 md:py-0">
      <div
        className="absolute inset-0 bg-black opacity-40"
        style={{
          backgroundImage: `url('${bgImg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      ></div>
      <div className="relative z-10 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span className="text-sm font-medium ps-4">
            Lost something? Report here!!!
          </span>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Welcome to Lost and Found Management
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Lost and Found Management is your reliable partner in handling lost
          items. Whether you’ve misplaced your belongings or found something
          left behind, we’re here to assist.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="/reportlostItem"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-[#128eb0] dark:focus:ring-gray-800"
          >
            Report a Lost Item
          </a>
          <a
            href="/reportFoundItem"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-[#128eb0] dark:focus:ring-gray-800"
          >
            Report a Found Item
          </a>
        </div>
      </div>
    </section>
  );
};
export default Banner;
