"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle2, AlertCircle, Mail, User, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const STUDENT_EMAIL_PATTERN = /\.(edu|ac\.[a-z]{2,})$/i;

function isStudentEmail(email: string): boolean {
  const domain = email.split("@")[1];
  if (!domain) return false;
  return STUDENT_EMAIL_PATTERN.test(domain);
}

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) return;

    if (!isStudentEmail(email)) {
      setStatus("error");
      setMessage("Please use a valid student email (e.g. .edu or .ac.ke)");
      return;
    }

    setStatus("loading");

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ name, email, gender: gender || null }]);

      if (error) {
        if (error.code === "23505") {
          setStatus("duplicate");
          setMessage("This email is already on the waitlist. We've got you covered!");
          return;
        }
        throw new Error("Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage("You're on the list! We'll reach out when it's time.");
      setName("");
      setEmail("");
      setGender("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "An error occurred.");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setMessage("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-sm mx-auto relative group"
    >
      {/* Glow effect behind the form */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

      <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl">
        
        {/* Name Input */}
        <div className="relative group/input">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within/input:text-orange-400 transition-colors" />
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); if (status === "error") resetForm(); }}
            placeholder="Full name"
            required
            disabled={status === "loading" || status === "success"}
            className="w-full pl-11 pr-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent focus:bg-white/10 transition-all text-sm"
          />
        </div>

        {/* Email Input */}
        <div className="relative group/input">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within/input:text-orange-400 transition-colors" />
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === "error" || status === "duplicate") resetForm(); }}
            placeholder="student@university.ac.ke"
            required
            disabled={status === "loading" || status === "success"}
            className="w-full pl-11 pr-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent focus:bg-white/10 transition-all text-sm"
          />
        </div>

        {/* Gender Select */}
        <div className="relative">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={status === "loading" || status === "success"}
            className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white/80 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent focus:bg-white/10 transition-all text-sm appearance-none cursor-pointer"
          >
            <option value="" className="bg-zinc-900 text-gray-500">Gender (optional)</option>
            <option value="male" className="bg-zinc-900">Male</option>
            <option value="female" className="bg-zinc-900">Female</option>
            <option value="other" className="bg-zinc-900">Other</option>
          </select>
           {/* Custom arrow for select */}
           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
             <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === "loading" || status === "success" || !email || !name}
          className={cn(
            "w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-lg",
            status === "success" 
              ? "bg-green-500/20 text-green-400 border border-green-500/50" 
              : "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-orange-500/25 border border-transparent"
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Joining...</span>
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>You're In!</span>
            </>
          ) : (
            <>
              <span>Join the Waitlist</span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </>
          )}
        </motion.button>
      </form>

      {/* Status Messages */}
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 text-green-400 text-sm justify-center bg-green-500/10 p-3 rounded-xl border border-green-500/20"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <p>{message}</p>
          </motion.div>
        )}

        {status === "duplicate" && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 text-amber-400 text-sm justify-center bg-amber-500/10 p-3 rounded-xl border border-amber-500/20"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{message}</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 text-red-400 text-sm justify-center bg-red-500/10 p-3 rounded-xl border border-red-500/20"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[10px] text-white/30 text-center mt-4">
        Only student emails (.edu, .ac.ke, etc.) are accepted.
      </p>
    </motion.div>
  );
}
