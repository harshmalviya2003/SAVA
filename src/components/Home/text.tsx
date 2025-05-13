"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const SplitTextAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      gsap.set("h2", { opacity: 1 });

      const headlineSplit = new SplitText("h2", {
        type: "words",
        wordsClass: "word++",
        ignore: "sup",
      });

      gsap.from(headlineSplit.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        stagger: 0.1,
        duration: 0.5,
        ease: "back",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      return () => {
        headlineSplit.revert();
      };
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="container w-full overflow-hidden px-4 sm:px-6 md:px-8"
    >
      <div className="flex flex-col items-center justify-center min-h-[50vh] mx-auto max-w-[90vw] rounded-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold opacity-0 text-center">
          Cutting-Edge Robotics Solutions<sup>™</sup> for Industrial Automation
        </h2>
      </div>
    </div>
  );
};

const SplitTextAnimationWithStyles = () => (
  <>
    <SplitTextAnimation />
  </>
);

export default SplitTextAnimationWithStyles;
