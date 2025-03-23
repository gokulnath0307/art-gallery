import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How can I submit my artwork?",
    answer:
      "Artists can submit their artwork via our online submission portal. Ensure that your submission includes high-quality images and a brief description.",
  },
  {
    question: "Is there an entry fee for exhibitions?",
    answer: "Some exhibitions may require an entry fee, while others are free. Please check the specific exhibition details on our website.",
  },
  {
    question: "Can I purchase art directly from the website?",
    answer: "Yes! We offer a curated collection of artworks available for direct purchase. Visit our 'Shop' section for more details.",
  },
  {
    question: "What types of art do you showcase?",
    answer: "We feature a variety of art styles, including contemporary, abstract, digital art, sculptures, and photography.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-8xl px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Frequently Asked Questions</h2>
          <dl className="mt-16 divide-y divide-gray-900/10">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button className="group flex w-full items-start justify-between text-left text-gray-900" onClick={() => toggleFAQ(index)}>
                    <span className="text-base font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {openIndex === index ? <FaMinus className="size-6 text-gray-600" /> : <FaPlus className="size-6 text-gray-600" />}
                    </span>
                  </button>
                </dt>
                {openIndex === index && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-600">{faq.answer}</p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
