"use client";

import { motion } from "framer-motion";
import {
  FaTwitter,
  FaEnvelope,
  FaExternalLinkAlt,
  FaRocket,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react"; // Import useEffect

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme mode

  // Sync theme state with localStorage and system preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Update localStorage and apply theme class to the root element
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const links = [
    {
      title: "CosmoConverter",
      href: "https://cosmo-converter.vercel.app/",
      icon: <FaRocket className="w-8 h-8" />,
      description: "Free, Fast & User-friendly Online File Converter!",
    },
    {
      title: "Twitter",
      href: "https://twitter.com/_CosmoCrafters_",
      icon: <FaTwitter className="w-8 h-8" />,
      description: "Follow us on Twitter/X!",
    },
    {
      title: "Email",
      href: "mailto:official.cosmocrafters@gmail.com",
      icon: <FaEnvelope className="w-8 h-8" />,
      description: "Contact us via Email!",
    },
  ];

  return (
    <main
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } flex flex-col items-center justify-center p-6 relative`}
    >
      {/* Theme Toggle Button */}
      <Button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? (
          <FaSun className="w-6 h-6 text-yellow-500" />
        ) : (
          <FaMoon className="w-6 h-6 text-gray-700" />
        )}
      </Button>

      <div className="stars"></div>
      <Card
        className={`w-full max-w-2xl ${
          isDarkMode
            ? "bg-black/60 border-gray-700"
            : "bg-white/60 border-gray-300"
        } backdrop-blur-lg`}
      >
        <div className="p-6 md:p-10 space-y-6 md:space-y-12">
          <div className="text-center space-y-4 md:space-y-6">
            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CosmoCrafters
            </motion.h1>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              We are a group of recent graduates studying software engineering.
              Currently, we are building web applications and tools mainly to
              improve your productivity and workflow to make your life easier.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={`w-full ${
                    isDarkMode
                      ? "bg-black/50 border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                      : "bg-white/50 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                  } text-left flex items-center justify-between group py-6 px-4 md:py-10 md:px-6`}
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center space-x-4 md:space-x-6">
                      {link.icon}
                      <div>
                        <div
                          className={`font-semibold text-lg md:text-xl ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {link.title}
                        </div>
                        <div
                          className={`text-sm md:text-md ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {link.description}
                        </div>
                      </div>
                    </div>
                    <FaExternalLinkAlt
                      className={`w-4 h-4 md:w-6 md:h-6 ${
                        isDarkMode ? "text-white" : "text-black"
                      } opacity-0 group-hover:opacity-100 transition-opacity`}
                    />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </main>
  );
}
