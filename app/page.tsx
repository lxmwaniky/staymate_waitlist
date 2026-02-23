import WaitlistForm from "@/components/WaitlistForm";
import Scene from "@/components/Scene";
import ScrollStory from "@/components/ScrollStory";
import { Users } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-white">
      <Scene />

      {/* ===== HERO ===== */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center">
        <div className="max-w-2xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Users className="w-4 h-4 text-orange-400" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-orange-300">Roommates, Reimagined</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-5 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Perfect Roommate</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 mb-3 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            StayMate matches university students with compatible roommates and verified housing near campus.
          </p>

          <p className="text-xs sm:text-sm text-gray-500 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Built by students, for students.
          </p>

          <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <WaitlistForm />
          </div>
        </div>

        <div className="absolute bottom-6 animate-bounce">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== SCROLL STORY ===== */}
      <section className="relative z-10 py-12 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4">
            How <span className="text-orange-400">StayMate</span> Works
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            One platform. From finding a roommate to moving in — we&apos;ve got every step covered.
          </p>
        </div>

        <ScrollStory />
      </section>

      {/* ===== TRACTION ===== */}
      <section className="relative z-10 py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Early Traction</h2>
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="text-center">
                <p className="text-2xl md:text-4xl font-bold text-orange-400">500+</p>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Waitlist Signups</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-4xl font-bold text-orange-400">10+</p>
                <p className="text-xs md:text-sm text-gray-400 mt-1">University Cities</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-4xl font-bold text-orange-400">50+</p>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Partner Landlords</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 py-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} StayMate. All rights reserved.</p>
          <p>Built with ❤️ for students, by students.</p>
        </div>
      </footer>
    </main>
  );
}
