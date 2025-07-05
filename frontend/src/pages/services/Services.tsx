import { BiSupport } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { IoLocationSharp, IoShieldCheckmark } from "react-icons/io5";
import { FaGift } from "react-icons/fa6";
import { useGetServicesQuery } from "../../redux/api/api";
import { Spinner } from "flowbite-react";
import React from "react";

interface Service {
  id?: string;
  title: string;
  description: string;
  icon?: string;
}

// Icon mapping for fallback services
const getServiceIcon = (title: string): React.ReactElement => {
  const iconMapping: { [key: string]: React.ReactElement } = {
    "Lost Item Reporting": <TbReport size="30" />,
    "Search for Lost Items": <FaSearch size="30" />,
    "Location-Based Services": <IoLocationSharp size="33" />,
    "Help Desk Support": <BiSupport size="30" />,
    "Data Encryption and Privacy": <IoShieldCheckmark size="30" />,
    "Item Claiming": <FaGift size="27" />,
  };

  return iconMapping[title] || <FaSearch size="30" />;
};

const defaultServices: Service[] = [
  {
    title: "Lost Item Reporting",
    description:
      "Easily report lost items by providing detailed descriptions, locations, and images, helping to track down your missing belongings.",
  },
  {
    title: "Search for Lost Items",
    description:
      "Quickly search the database for your lost items using keywords, categories, or locations to find matches.",
  },
  {
    title: "Location-Based Services",
    description:
      "View and track lost and found items within specific geographic areas, focusing your search on the most relevant locations.",
  },
  {
    title: "Help Desk Support",
    description:
      "Get assistance with your lost or found reports, claims, or other queries through our dedicated help desk service.",
  },
  {
    title: "Data Encryption and Privacy",
    description:
      "Protect your information with industry-standard encryption, ensuring your personal data remains secure and confidential.",
  },
  {
    title: "Item Claiming",
    description:
      "Verify and claim found items securely through a streamlined process, ensuring that only the rightful owner can retrieve the item.",
  },
];

const Services = () => {
  const { data: servicesData, isLoading } = useGetServicesQuery({});

  if (isLoading) {
    return (
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      </section>
    );
  }

  // Use server data if available, otherwise fallback to static data
  const services: Service[] = servicesData?.data || defaultServices;
  return (
    <section
      id="features"
      className="py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-4 text-center mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight font-extrabold leading-tight text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="mb-6 font-light text-gray-300 text-lg md:text-xl max-w-2xl">
            Comprehensive lost and found management solutions designed to help
            you recover what matters most
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: Service, index: number) => (
            <div
              key={service.id || index}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl border border-gray-700 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-600 group"
            >
              <div className="flex flex-col space-y-4">
                <div className="text-blue-400 group-hover:text-cyan-400 transition-colors duration-300">
                  {getServiceIcon(service.title)}
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
