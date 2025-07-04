"use client";

import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";

const Faq = () => {
  // State to keep track of which FAQ item is currently expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFaq = (index: any) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How secure is my insurance information?",
      answer:
        "We prioritize the security of your insurance information. We use advanced encryption and strict data protection measures to ensure your data is safe and confidential.",
    },
    {
      question: "How can I customize my insurance coverage?",
      answer:
        "Our insurance plans are customizable. You can tailor your coverage to meet your specific needs and budget.",
    },
    {
      question: "Is there a waiting period for insurance claims?",
      answer:
        "There may be a waiting period for certain insurance claims, depending on the policy terms and conditions. Please refer to your policy documents for details.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white">
      <div className=" container mx-auto">
        <div className="pt-16 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex flex-col text-left basis-1/2">
            <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
            <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
              Frequently Asked Questions
            </p>
          </div>
          <ul className="basis-1/2">
            {faqs.map((faq, index) => (
              <li key={index}>
                <button
                  className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={expandedIndex === index}
                >
                  <span className="flex-1 text-base-content">
                    {faq.question}
                  </span>
                  {expandedIndex === index ? <FaMinus /> : <FaPlus />}
                </button>
                <div
                  className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                    expandedIndex === index ? "max-h-[200px]" : "max-h-0"
                  }`}
                >
                  <div
                    className={`pb-5 leading-relaxed transform transition-transform duration-500 ${
                      expandedIndex === index
                        ? "translate-y-0"
                        : "-translate-y-4"
                    }`}
                  >
                    <div className="space-y-2 leading-relaxed">
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
