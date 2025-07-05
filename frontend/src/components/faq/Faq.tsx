import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";
import { useGetFaqsQuery } from "../../redux/api/api";
import { Spinner } from "flowbite-react";

interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { data: faqsData, isLoading } = useGetFaqsQuery({});

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const defaultFaqs: FaqItem[] = [
    {
      question: "How do I report a lost item?",
      answer:
        "Simply navigate to the 'Report Lost Item' page, fill out the detailed form with information about your lost item, including description, location, and date. Our system will help track and notify you when a matching item is found.",
    },
    {
      question: "How can I search for my lost item?",
      answer:
        "Use our advanced search feature to look for items by category, location, date, or keywords. You can filter results to find items that match your lost belongings.",
    },
    {
      question: "What happens when I find an item that might be mine?",
      answer:
        "When you spot an item that could be yours, you can submit a claim request with verification details. Our system will help verify ownership before arranging the return.",
    },
    {
      question: "How secure is my personal information?",
      answer:
        "We prioritize the security of your personal information. We use advanced encryption and strict data protection measures to ensure your data is safe and confidential.",
    },
  ];

  if (isLoading) {
    return (
      <div className="py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      </div>
    );
  }

  // Use server data if available, otherwise fallback to static data
  const faqs: FaqItem[] = faqsData?.data || defaultFaqs;

  return (
    <div className="py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="flex flex-col text-left lg:basis-1/2">
            <p className="inline-block font-semibold text-blue-400 mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-gray-300 text-lg">
              Find answers to common questions about our lost and found
              management system.
            </p>
          </div>

          <ul className="lg:basis-1/2 space-y-2">
            {faqs.map((faq, index) => (
              <li
                key={index}
                className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  className="relative flex gap-4 items-center w-full p-6 text-base font-semibold text-left hover:bg-gray-700/30 transition-all duration-200"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={expandedIndex === index}
                >
                  <span className="flex-1 text-white text-left">
                    {faq.question}
                  </span>
                  <div className="text-blue-400">
                    {expandedIndex === index ? <FaMinus /> : <FaPlus />}
                  </div>
                </button>
                <div
                  className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                    expandedIndex === index ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  <div
                    className={`px-6 pb-6 leading-relaxed transform transition-transform duration-500 ${
                      expandedIndex === index
                        ? "translate-y-0"
                        : "-translate-y-4"
                    }`}
                  >
                    <div className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Faq;
