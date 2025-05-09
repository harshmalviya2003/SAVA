import React, { useState } from "react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://linkedin.com/company/savarobotics",
    label: "LinkedIn",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v5.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 4 19.5V14a6 6 0 0 1 6-6h6z" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
  {
    href: "https://twitter.com/savarobotics",
    label: "Twitter",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6.99A4.1 4.1 0 0 0 11.5 9.03a11.65 11.65 0 0 1-8.45-4.29a4.1 4.1 0 0 0 1.27 5.47A4.07 4.07 0 0 1 2 9.13v.05a4.1 4.1 0 0 0 3.29 4.02a4.09 4.09 0 0 1-1.85.07a4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68c0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 5.92z" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
  {
    href: "https://youtube.com/@savarobotics",
    label: "YouTube",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/><path d="M10 9.5v5l4.5-2.5-4.5-2.5z" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
];

const quickLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate async subscribe
    setTimeout(() => {
      if (email.includes("@") && email.includes(".")) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    }, 1200);
  };

  return (
    <footer className="relative z-10 w-full bg-black text-white border-t border-white/10">
      {/* Pure black background, no gradients */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row md:justify-between gap-12 md:gap-0">
        {/* Left: Logo, contact, socials */}
        <div className="flex-1 flex flex-col gap-6 min-w-[220px]">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-widest font-mono">SAVA</span>
          </div>
          <a href="mailto:founders@savarobotics.com" className="text-lg font-mono text-white/80 hover:text-white transition underline underline-offset-4">founders@savarobotics.com</a>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-lg p-2 bg-black border border-white/20 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                whileHover={{ scale: 1.18, rotate: [0, 8, -8, 0] }}
                whileTap={{ scale: 0.95 }}
                style={{ color: 'inherit' }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Center: Newsletter */}
        <div className="flex-1 flex flex-col items-center justify-center min-w-[320px]">
          <h3 className="text-lg font-bold tracking-wider mb-4 text-white">SUBSCRIBE FOR UPDATES</h3>
          <form onSubmit={handleSubscribe} className="w-full max-w-md flex relative">
            <input
              type="email"
              aria-label="Your email address"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-l-lg bg-black text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white font-mono text-base border border-white/20"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
              required
              disabled={status === "loading"}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-r-lg bg-white text-black font-bold hover:bg-black hover:text-white border border-white/20 transition disabled:opacity-60"
              disabled={status === "loading"}
              aria-label="Subscribe"
            >
              {status === "loading" ? (
                <span className="animate-spin inline-block w-5 h-5 border-2 border-t-transparent border-black rounded-full"></span>
              ) : (
                <span>&rarr;</span>
              )}
            </button>
          </form>
          {status === "success" && <div className="text-white mt-2 text-sm">Subscribed!</div>}
          {status === "error" && <div className="text-white mt-2 text-sm">Please enter a valid email.</div>}
        </div>

        {/* Right: Quick links */}
        <div className="flex-1 flex flex-col items-end min-w-[180px]">
          <nav className="flex flex-col gap-2 text-right">
            {quickLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white font-mono text-base transition underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Animated divider (white/gray only) */}
      <motion.div
        className="mx-auto w-11/12 h-px bg-white/20 my-6"
        initial={{ opacity: 0, scaleX: 0.7 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
      />

      {/* Bottom copyright */}
      <div className="relative text-center text-xs text-white/60 font-mono pb-6">
        © {new Date().getFullYear()} SAVA ROBOTICS // ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}
