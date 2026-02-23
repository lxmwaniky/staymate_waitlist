"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

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

interface ScrollSectionProps {
  emoji: string;
  title: string;
  description: string;
  index: number;
}

function ScrollSection({ emoji, title, description, index }: ScrollSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12 py-8 md:pl-16 group"
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 top-10 w-8 h-8 rounded-full bg-zinc-900 border border-orange-500/30 flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-orange-500 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
      </div>

      <div className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-colors backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-3">
          <div className="text-3xl filter drop-shadow-lg">{emoji}</div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
            {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative max-w-2xl mx-auto px-4 pb-20">
      {/* Vertical Timeline Line */}
      <div className="absolute left-[1.9rem] md:left-[2.9rem] top-10 bottom-20 w-px bg-zinc-800" />
      
      {/* Active Line (Animated) */}
      <motion.div 
        className="absolute left-[1.9rem] md:left-[2.9rem] top-10 bottom-20 w-px bg-gradient-to-b from-orange-500 to-amber-500 origin-top"
        style={{ scaleY }}
      />

      <div className="flex flex-col gap-2">
        {SECTIONS.map((s, i) => (
          <ScrollSection key={i} index={i} {...s} />
        ))}
      </div>
    </div>
  );
}
