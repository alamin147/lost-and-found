import { useState } from "react";

const Banner = () => {
  const [bgImg] = useState("/bgimg.png");
  return (
    <section className="relative flex items-center min-h-[70vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div
        className="absolute inset-0 bg-black/60"
        style={{
          backgroundImage: `url('${bgImg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-5"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-7xl text-center">
        <div className="animate-fade-in">
          <div className="inline-flex justify-between items-center py-2 px-4 mb-8 text-sm bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-white hover:from-blue-600/30 hover:to-cyan-600/30 transition-all duration-300 cursor-pointer group">
            <span className="text-sm font-medium">
              Lost something? Report here!
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
            </span>
          </div>

          <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Lost and Found
            </span>{" "}
            Management
          </h1>

          <p className="mb-10 text-lg lg:text-xl font-normal text-gray-300 max-w-4xl mx-auto">
            Lost and Found Management is your reliable partner in handling lost
            items. Whether you've misplaced your belongings or found something
            left behind, we're here to assist with our modern, efficient system.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <a
              href="/reportlostItem"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 group"
            >
              <span>Report a Lost Item</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">📋</span>
            </a>
            <a
              href="/reportFoundItem"
              className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 group"
            >
              <span>Report a Found Item</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">🔍</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
