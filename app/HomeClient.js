"use client";

import React, { useEffect, useState } from "react";
import Hero from "./components/website/home/Hero";
import Slider from "./components/website/home/Slider";
import Services from "./components/website/home/Services";
import Download from "./components/website/home/Download";
import About from "./components/website/home/About";
import AnimatedWaitlistButton from "./components/website/AnimatedWaitlistButton";

const HomeClient = () => {
  const [showTop, setShowTop] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      setShowTop(scrollY > 200);
      setAtBottom(innerHeight + scrollY >= fullHeight - 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <Hero />
      <Slider />
      <Services />
      <Download />
      <About />

      {!atBottom && <AnimatedWaitlistButton />}

      {atBottom && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 text-[#A4251E] scale-120 border-2 border-[#A4251E]
                     z-50 border-dashed bg-white w-10 h-10 rounded-full flex items-center
                     justify-center shadow-lg hover:shadow-xl transition-all"
        >
          ↑
        </button>
      )}
    </main>
  );
};

export default HomeClient;
