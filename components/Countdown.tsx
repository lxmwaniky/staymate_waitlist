"use client";

import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-03-16T00:00:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, LAUNCH_DATE - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {units.map((u, i) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl backdrop-blur-md shadow-lg">
            <span className="text-2xl sm:text-4xl font-mono font-bold text-orange-400 tabular-nums">
              {pad(u.value)}
            </span>
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-2 font-medium">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
