import { FaHeart, FaClock, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { BiTrendingUp } from "react-icons/bi";

const SuccessStats = () => {
  const stats = [
    {
      icon: <FaHeart className="w-8 h-8" />,
      number: "15,247",
      label: "Items Reunited",
      description: "Successfully returned to owners",
      emoji: "💖",
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      number: "28,000+",
      label: "Happy Users",
      description: "Active community members",
      emoji: "👥",
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      number: "2.4 hrs",
      label: "Average Return Time",
      description: "How fast items get claimed",
      emoji: "⚡",
    },
    {
      icon: <FaMapMarkerAlt className="w-8 h-8" />,
      number: "150+",
      label: "Cities Covered",
      description: "Locations worldwide",
      emoji: "🌍",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-4 text-center mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight font-extrabold leading-tight text-white">
            Making{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Connections
            </span>{" "}
            That Matter
          </h2>
          <p className="font-light text-gray-300 text-lg md:text-xl max-w-3xl">
            Every day, we help reunite people with their lost belongings and
            create meaningful connections in our community
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl border border-gray-700 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-600 text-center">
                <div className="text-blue-400 group-hover:text-cyan-400 transition-colors duration-300 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white block">
                    {stat.number}
                  </span>
                  <BiTrendingUp className="w-4 h-4 text-green-400 inline ml-2" />
                </div>
                <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStats;
