"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react";

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
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); if (status === "error") resetForm(); }}
          placeholder="Full name"
          required
          disabled={status === "loading" || status === "success"}
          className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/40 backdrop-blur-sm transition-all text-sm"
        />

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === "error" || status === "duplicate") resetForm(); }}
            placeholder="student@university.ac.ke"
            required
            disabled={status === "loading" || status === "success"}
            className="w-full pl-11 pr-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/40 backdrop-blur-sm transition-all text-sm"
          />
        </div>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/40 backdrop-blur-sm transition-all text-sm"
        >
          <option value="" className="bg-zinc-900">Gender (optional)</option>
          <option value="male" className="bg-zinc-900">Male</option>
          <option value="female" className="bg-zinc-900">Female</option>
          <option value="other" className="bg-zinc-900">Other</option>
        </select>

        <button
          type="submit"
          disabled={status === "loading" || status === "success" || !email || !name}
          className="w-full px-5 py-3.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Joining...</span>
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>You&apos;re In!</span>
            </>
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </form>

      {status === "success" && (
        <div className="mt-4 flex items-center gap-2 text-green-400 text-sm justify-center animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <p>{message}</p>
        </div>
      )}

      {status === "duplicate" && (
        <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm justify-center animate-in fade-in slide-in-from-bottom-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 text-red-400 text-sm justify-center animate-in fade-in slide-in-from-bottom-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{message}</p>
        </div>
      )}

      <p className="text-xs text-gray-600 text-center mt-3">
        Only student emails (.edu, .ac.ke, etc.) are accepted.
      </p>
    </div>
  );
}
