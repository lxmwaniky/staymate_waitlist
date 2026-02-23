"use client";

import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";
import Scene from "@/components/Scene";
import ScrollStory from "@/components/ScrollStory";
import Countdown from "@/components/Countdown";
import { ChevronDown } from "lucide-react";

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden font-sans selection:bg-orange-500/30">
      <Scene />

      {/* ===== HERO ===== */}
      <section className="relative z-10 min-h-[100dvh] flex flex-col justify-center px-6 lg:px-12 pt-20 pb-12">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 lg:mb-8"
            >
              StayMate
            </motion.h2>

            <motion.h1 
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6 lg:pr-12"
            >
              Find Your <span className="text-orange-400">Perfect Roommate</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-300 mb-10 max-w-lg lg:max-w-xl leading-relaxed"
            >
              StayMate matches university students with compatible roommates and verified housing near campus. 
              <span className="text-gray-500 text-sm block mt-3">Built by students, for students.</span>
            </motion.p>

            {/* Countdown & Form Container */}
            <div className="w-full max-w-md flex flex-col gap-8">
              <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Launching In</p>
                  <p className="text-[10px] text-gray-500 font-mono">March 16, 2026</p>
                </div>
                <Countdown />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <WaitlistForm />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Empty to show 3D Scene */}
          <div className="hidden lg:block h-full min-h-[500px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-gray-600">Scroll</span>
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SCROLL STORY ===== */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent to-black/90">
        <div className="max-w-md mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            How <span className="text-orange-400">StayMate</span> Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-400 max-w-sm mx-auto"
          >
            One platform. From finding a roommate to moving in &mdash; every step covered.
          </motion.p>
        </div>

        <ScrollStory />
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 py-8 border-t border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} StayMate. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
