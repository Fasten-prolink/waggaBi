"use client";

import { useState } from "react";

export default function FaqClient({ faqData }: { faqData: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqData.map((faq, i) => (
        <div 
          key={i} 
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors group"
        >
          <div className="flex justify-between items-center gap-4">
            <h3 className="text-xl font-medium text-white group-hover:text-yellow-400 transition-colors">{faq.q}</h3>
            <span className="text-2xl text-yellow-400 flex-shrink-0 transition-transform duration-300">
              {openIndex === i ? '−' : '+'}
            </span>
          </div>
          {openIndex === i && (
            <p className="text-gray-300 mt-4 leading-relaxed font-light border-t border-white/10 pt-4 animate-in fade-in slide-in-from-top-2">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
