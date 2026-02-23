import WaitlistForm from "@/components/WaitlistForm";
import Scene from "@/components/Scene";
import ScrollStory from "@/components/ScrollStory";
import Countdown from "@/components/Countdown";
import { Users } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-white">
      <Scene />

      {/* ===== HERO ===== */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-3 text-center">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-orange-400 mb-1 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            StayMate
          </h2>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Users className="w-3 h-3 text-orange-400" />
            <span className="text-[10px] sm:text-xs font-medium tracking-wide text-orange-300">Roommates, Reimagined</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-2 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Perfect Roommate</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 mb-1.5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            StayMate matches university students with compatible roommates and verified housing near campus.
          </p>

          <p className="text-[10px] text-gray-500 mb-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Built by students, for students.
          </p>

          {/* Countdown */}
          <div className="mb-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Launching in</p>
            <Countdown />
            <p className="text-[10px] text-gray-600 mt-1">March 16, 2026</p>
          </div>

          <div className="w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <WaitlistForm />
          </div>
        </div>

        <div className="absolute bottom-4 animate-bounce">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== SCROLL STORY ===== */}
      <section className="relative z-10 py-6 md:py-10 px-3">
        <div className="max-w-md mx-auto text-center mb-5 md:mb-8">
          <h2 className="text-lg sm:text-xl md:text-3xl font-bold tracking-tight mb-1.5">
            How <span className="text-orange-400">StayMate</span> Works
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-400 max-w-sm mx-auto">
            One platform. From finding a roommate to moving in &mdash; every step covered.
          </p>
        </div>

        <ScrollStory />
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 py-3 border-t border-white/10">
        <div className="max-w-md mx-auto px-3 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] sm:text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} StayMate. All rights reserved.</p>
          <p>Built with ❤️ for students, by students.</p>
        </div>
      </footer>
    </main>
  );
}
