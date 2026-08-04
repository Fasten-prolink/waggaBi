"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface SideNavigationProps {
  sections: Section[];
}

export default function SideNavigation({ sections }: SideNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed left-3 md:left-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 md:gap-6 pointer-events-auto">
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        
        return (
          <div key={section.id} className="relative group flex items-center justify-center">
            {/* Tooltip */}
            <div className="absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-zinc-900 text-white text-xs uppercase tracking-widest px-3 py-2 rounded-sm pointer-events-none font-bold">
              {section.label}
            </div>

            {/* Dot */}
            <button
              onClick={() => scrollTo(section.id)}
              className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center focus:outline-none"
              aria-label={`Scroll to ${section.label}`}
            >
              <div 
                className={`transition-all duration-500 ease-out rounded-full bg-white ${
                  isActive 
                    ? "w-1.5 h-1.5 md:w-2.5 md:h-2.5 scale-100 opacity-80 md:opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.6)] md:shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                    : "w-1 h-1 md:w-1.5 md:h-1.5 scale-75 opacity-20 md:opacity-30 group-hover:opacity-100 group-hover:scale-100"
                }`}
              />
            </button>
            
            {/* Connecting Line (except for the last item) */}
            {index < sections.length - 1 && (
              <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 w-[1px] h-4 md:h-6 bg-white/20" />
            )}
          </div>
        );
      })}
    </div>
  );
}
