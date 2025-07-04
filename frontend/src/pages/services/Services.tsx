import { BiSupport } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { IoLocationSharp, IoShieldCheckmark } from "react-icons/io5";
import { FaGift } from "react-icons/fa6";

const services = [
  {
    logo: <TbReport size="30" />,
    title: "Lost Item Reporting",
    description:
      "Easily report lost items by providing detailed descriptions, locations, and images, helping to track down your missing belongings.",
  },
  {
    logo: <FaSearch size="30" />,
    title: "Search for Lost Items",
    description:
      "Quickly search the database for your lost items using keywords, categories, or locations to find matches.",
  },
  {
    logo: <IoLocationSharp size="33" />,
    title: "Location-Based Services",
    description:
      "View and track lost and found items within specific geographic areas, focusing your search on the most relevant locations.",
  },
  {
    logo: <BiSupport size="30" />,
    title: "Help Desk Support",
    description:
      "Get assistance with your lost or found reports, claims, or other queries through our dedicated help desk service.",
  },
  {
    logo: <IoShieldCheckmark size="30" />,
    title: "Data Encryption and Privacy",
    description:
      "Protect your information with industry-standard encryption, ensuring your personal data remains secure and confidential.",
  },
  {
    logo: <FaGift size="27" />,
    title: "Item Claiming",
    description:
      "Verify and claim found items securely through a streamlined process, ensuring that only the rightful owner can retrieve the item.",
  },
];

const Services = () => {
  return (
    <section
      id="features"
      className="space-y-6 bg-gray-900 text-white pt-8 mx-auto md:pt-12 lg:pt-20"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
          Services
        </h2>
        <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
          Here are the services
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {services.map((e, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border bg-background p-2 transform transition-transform duration-300 hover:scale-105"
          >
            <div className="flex flex-col justify-between rounded-md p-6">
              {e.logo}
              <div className="space-y-2">
                <h3 className="font-bold">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
