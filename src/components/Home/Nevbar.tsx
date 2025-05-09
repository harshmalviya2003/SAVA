"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "VISION", path: "/vision" },
    { name: "PROBLEM", path: "/problem" },
    { name: "SOLUTION", path: "/solution" },
    { name: "RESERVE", path: "/reserve" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="fixed w-full z-50 bg-white dark:bg-black backdrop-blur-md border-b border-black dark:border-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-roboto-mono text-xl font-bold text-black dark:text-white"
          >
            SAVA ROBOTICS
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <motion.span
                whileHover={{ y: -2 }}
                className="font-roboto-mono text-black dark:text-white cursor-pointer text-sm font-medium"
              >
                {link.name}
              </motion.span>
            </Link>
          ))}
        </nav>

        {/* Dark/Light Mode Toggle */}
        {mounted && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </motion.button>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 py-2 flex flex-col space-y-4 bg-white dark:bg-black">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="font-roboto-mono text-black dark:text-white block py-2"
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
