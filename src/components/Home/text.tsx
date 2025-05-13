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

const TailwindStyles = () => (
  <style jsx global>{`
    .container {
      position: relative;
    }
    .word {
      border: 1.5px solid white;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(200, 200, 200, 1) 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
      height: auto;
      min-height: 30px;
      padding: 0.5rem;
      border-radius: 8px;
      margin: 0.15rem;
      display: inline-block;
      position: relative;
      font-size: clamp(1rem, 2vw, 1.5rem);
    }
    @media (min-width: 640px) {
      .word {
        height: 40px;
        padding: 0.75rem;
        margin: 0.2rem;
      }
    }
    @media (min-width: 768px) {
      .word {
        height: 50px;
        padding: 1rem;
        margin: 0.25rem;
      }
    }
    .word::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1.5px solid white;
      border-radius: 8px;
      pointer-events: none;
    }
    sup {
      line-height: 0;
      font-size: 0.7em;
      vertical-align: super;
    }
  `}</style>
);

const SplitTextAnimationWithStyles = () => (
  <>
    <SplitTextAnimation />
  </>
);

export default SplitTextAnimationWithStyles;
