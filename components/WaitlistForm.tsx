"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) return;
    
    setStatus("loading");
    
    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ name, email, gender: gender || null }]);

      if (error) {
        if (error.code === "23505") { // Unique violation
          throw new Error("You're already on the waitlist!");
        }
        throw new Error("Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage("Thanks for joining! We'll be in touch soon.");
      setName("");
      setEmail("");
      setGender("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "An error occurred.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          required
          disabled={status === "loading" || status === "success"}
          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-sm transition-all"
        />
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          disabled={status === "loading" || status === "success"}
          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-sm transition-all"
        />
        
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-sm transition-all"
        >
          <option value="" className="bg-black">Prefer not to say</option>
          <option value="male" className="bg-black">Male</option>
          <option value="female" className="bg-black">Female</option>
          <option value="other" className="bg-black">Other</option>
        </select>
        
        <button
          type="submit"
          disabled={status === "loading" || status === "success" || !email || !name}
          className="w-full px-6 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Joining...</span>
            </>
          ) : (
            "Join Waitlist"
          )}
        </button>
      </form>

      {status === "success" && (
        <div className="mt-4 flex items-center gap-2 text-green-400 text-sm justify-center animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4" />
          <p>{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 text-red-400 text-sm justify-center animate-in fade-in slide-in-from-bottom-2">
          <AlertCircle className="w-4 h-4" />
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
