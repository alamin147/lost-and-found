import { useState, useEffect } from "react";

const Banner = () => {
  const [bgImg] = useState("/bgimg.png");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "Lost something? Report here!",
      title: "Welcome to Lost and Found Management",
      description:
        "Lost and Found Management is your reliable partner in handling lost items. Whether you've misplaced your belongings or found something left behind, we're here to assist with our modern, efficient system.",
      primaryButton: {
        text: "Report a Lost Item",
        href: "/reportlostItem",
        icon: "📋",
      },
      secondaryButton: {
        text: "Report a Found Item",
        href: "/reportFoundItem",
        icon: "🔍",
      },
    },
    {
      badge: "Found something? Help others!",
      title: "Help Reunite Items with Their Owners",
      description:
        "Join our community of helpful citizens. By reporting found items, you're making a difference in someone's day. Every item reported brings us closer to a more connected community.",
      primaryButton: {
        text: "Report Found Item",
        href: "/reportFoundItem",
        icon: "🤝",
      },
      secondaryButton: {
        text: "Browse Lost Items",
        href: "/lostItems",
        icon: "🔍",
      },
    },
    {
      badge: "Need help? We're here!",
      title: "Track Your Items & Claims",
      description:
        "Stay updated on your lost item reports and claim requests. Our advanced tracking system ensures you never miss an update when your belongings are found.",
      primaryButton: {
        text: "View My Found Items",
        href: "/dashboard/myFoundItems",
        icon: "📱",
      },
      secondaryButton: {
        text: "Browse Found Items",
        href: "/foundItems",
        icon: "👀",
      },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative flex items-center min-h-[70vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
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
        <div className="animate-fade-in" key={currentSlide}>
          <div className="inline-flex justify-between items-center py-2 px-4 mb-8 text-sm bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-white hover:from-blue-600/30 hover:to-cyan-600/30 transition-all duration-300 cursor-pointer group">
            <span className="text-sm font-medium">
              {currentSlideData.badge}
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 inline-block">
                →
              </span>
            </span>
          </div>

          <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white transition-all duration-500">
            {currentSlideData.title.includes("Lost and Found") ? (
              <>
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Lost and Found
                </span>{" "}
                Management
              </>
            ) : (
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                {currentSlideData.title}
              </span>
            )}
          </h1>

          <p className="mb-10 text-lg lg:text-xl font-normal text-gray-300 max-w-4xl mx-auto transition-all duration-500">
            {currentSlideData.description}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6 mb-8">
            <a
              href={currentSlideData.primaryButton.href}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 group"
            >
              <span>{currentSlideData.primaryButton.text}</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                {currentSlideData.primaryButton.icon}
              </span>
            </a>
            <a
              href={currentSlideData.secondaryButton.href}
              className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 group"
            >
              <span>{currentSlideData.secondaryButton.text}</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                {currentSlideData.secondaryButton.icon}
              </span>
            </a>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
