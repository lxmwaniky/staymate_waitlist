"use client";

import { useEffect, useRef } from "react";

interface ScrollSectionProps {
  emoji: string;
  title: string;
  description: string;
  index: number;
}

function ScrollSection({ emoji, title, description, index }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`scroll-section flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-3 md:gap-6 py-6 md:py-8 px-1`}
    >
      <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
        <span className="text-2xl md:text-3xl">{emoji}</span>
      </div>

      <div className={`text-center ${isEven ? "md:text-left" : "md:text-right"} max-w-md`}>
        <h3 className="text-base md:text-xl font-bold mb-1.5">{title}</h3>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

const SECTIONS = [
  {
    emoji: "🔍",
    title: "Find Your Ideal Roommate",
    description:
      "Search by budget, lifestyle, study habits, and campus proximity. Our matching algorithm pairs you with people you'll actually enjoy living with.",
  },
  {
    emoji: "✅",
    title: "Verified Student Profiles",
    description:
      "Every user is verified through their university email. No fake accounts, no strangers — just real students looking for a place to stay.",
  },
  {
    emoji: "💬",
    title: "Chat Before You Commit",
    description:
      "Message potential roommates directly on the platform. Get to know them, discuss ground rules, and make sure it's the right fit before signing anything.",
  },
  {
    emoji: "🏠",
    title: "Browse Verified Listings",
    description:
      "Access a curated database of student-friendly housing. Real photos, transparent pricing, and honest reviews from fellow students.",
  },
  {
    emoji: "⚡",
    title: "Book Instantly",
    description:
      "Found the one? Secure your spot online in minutes. No paperwork shuffle, no back-and-forth with landlords — just tap and move in.",
  },
  {
    emoji: "🛡️",
    title: "Safe & Transparent",
    description:
      "Standardised lease terms, clear costs upfront, and a support team that has your back if anything goes sideways.",
  },
];

export default function ScrollStory() {
  return (
    <div className="max-w-md mx-auto">
      {SECTIONS.map((s, i) => (
        <ScrollSection key={i} index={i} emoji={s.emoji} title={s.title} description={s.description} />
      ))}
    </div>
  );
}
