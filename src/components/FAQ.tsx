"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// FAQ data
const faqItems = [
  {
    id: 1,
    question: "Why do you need my service?",
    answer: "In today's technological era, attention is the new oil. My high-quality launch videos are designed to capture and retain viewer interest. I try to leave a lasting impression on my audience that they will remember. This memorable impact is crucial for your brand's success in a crowded digital landscape where attention is increasingly valuable and scarce."
  },
  {
    id: 2,
    question: "How much do you charge?",
    answer: "Prices may vary depending on the scope and complexity of the project. I generally charge $100 per project but it may differ according to demand and time."
  },
  {
    id: 3,
    question: "What services do you provide?",
    answer: "I offer a comprehensive range of services including SaaS launch videos, explainer videos, Product launch videos, Feature demos, and more."
  },
  {
    id: 4,
    question: "What is your approach to video production?",
    answer: "My approach to video design combines aesthetic appeal with functional usability. I believe in creating designs that not only look beautiful but also provide intuitive navigation and meaningful interactions. Every project begins with understanding user needs and business objectives to create purposeful digital experiences."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gradientControls = useAnimation();

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Animate gradient
  useEffect(() => {
    gradientControls.start({
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.35, 0.3],
      transition: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
    });
  }, [gradientControls]);

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 bg-black overflow-hidden" id="faq">
      {/* Circular gradient */}
      <motion.div
        className="absolute bottom-[-300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-gray-400/15 via-amber-200/10 to-gray-300/15 blur-3xl opacity-30 pointer-events-none"
        animate={gradientControls}
      ></motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-medium mb-2">Your Questions <span className="italic">Answered</span></h2>
          <p className="text-muted text-sm md:text-base">
            Find the answers to our most common questions here, but if
            you still need help, feel free to contact me.
          </p>
        </div>

        <div className="space-y-2 mb-8">
          {faqItems.map((item, index) => (
            <div
              key={item.id}
              className="border-b border-white/10 pb-2"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none group"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-content-${item.id}`}
              >
                <span className="text-base md:text-lg font-medium group-hover:text-white transition-colors">{item.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex items-center justify-center w-6 h-6"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="py-2 pb-4 text-muted text-sm md:text-base">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
