import WaitlistForm from "@/components/WaitlistForm";
import Scene from "@/components/Scene";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
      <Scene />
      
      <div className="z-10 flex flex-col items-center justify-center px-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide">Coming Soon</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">StayMate</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          The ultimate platform to find, manage, and elevate your stays. 
          Join the waitlist today to get early access and exclusive perks when we launch.
        </p>
        
        <div className="w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <WaitlistForm />
        </div>
      </div>
      
      <div className="absolute bottom-8 text-sm text-gray-500 z-10">
        © {new Date().getFullYear()} StayMate. All rights reserved.
      </div>
    </main>
  );
}
