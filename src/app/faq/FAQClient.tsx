"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export type FAQItemData = {
  q: string;
  a: React.ReactNode;
};

export type FAQCategory = {
  category: string;
  items: FAQItemData[];
};

type FAQClientProps = {
  faqs: FAQCategory[];
};

type FAQItemProps = {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 last:border-0">
      <h3>
        <button
          onClick={onClick}
          className="w-full py-6 flex items-center justify-between gap-4 text-left group"
          aria-expanded={isOpen}
        >
          <span className="text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
            {question}
          </span>
          <span
            className={`flex-shrink-0 ml-4 p-1 rounded-full border transition-colors ${
              isOpen
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                : "border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500"
            }`}
          >
            <motion.svg
              animate={{ rotate: isOpen ? 45 : 0 }}
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </motion.svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-neutral-600 dark:text-neutral-400 space-y-4 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQClient({ faqs }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<{ [key: string]: number | null }>({
    "Usage & Scenarios": 0, // Open the first one by default if it exists
  });

  const toggle = (category: string, index: number) => {
    setOpenIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about using Allogo&apos;s brand assets for your
              development and design projects.
            </p>
          </motion.div>
        </div>

        {/* FAQs */}
        <div className="space-y-12">
          {faqs.map((section, sectionIdx) => (
            <motion.section
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-3">
                {section.category}
              </h2>
              <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl px-6 md:px-8 border border-neutral-100 dark:border-neutral-800">
                {section.items.map((item, idx) => (
                  <FAQItem
                    key={idx}
                    question={item.q}
                    answer={item.a}
                    isOpen={openIndex[section.category] === idx}
                    onClick={() => toggle(section.category, idx)}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-20 text-center">
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-all shadow-lg hover:shadow-xl"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
