"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              type="button"
              className="w-full px-5 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span className="font-medium text-gray-800 text-sm">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed bg-white">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
