"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface Problem {
  title: string;
  description: string;
  icon: string;
}

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const problems: Problem[] = [
    {
      title: "NO ONE (OR THING) TO OPERATE PRESS BRAKES",
      description:
        "The manufacturing industry faces a critical shortage of skilled operators, with 2.1 million jobs expected to go unfilled by 2030. This skills gap is causing production delays, increased costs, and lost business opportunities. Many experienced operators are retiring, while younger generations show less interest in manufacturing careers.",
      icon: "M7 11V7a1 1 0 0 1 1-1h3M17 11V7a1 1 0 0 0-1-1h-3M12 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    },
    {
      title: "EQUIPMENT REPLACEMENT COSTS",
      description:
        "Traditional automation solutions require complete equipment replacement, with costs ranging from $500,000 to $2 million per cell. This massive investment creates significant barriers to entry, especially for small to medium-sized manufacturers. Many shops are forced to continue using outdated equipment due to these prohibitive costs.",
      icon: "M20 7h-4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
    },
    {
      title: "INEFFICIENT PROGRAMMING",
      description:
        "Current programming methods for press brakes are time-consuming and complex, requiring specialized expertise. On average, operators spend 2-3 hours programming a single part, leading to significant downtime. This inefficiency causes manufacturers to turn down profitable jobs and struggle with quick-turnaround requirements.",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            pin: true,
            start: "top top",
            end: "+=1000",
            pinSpacing: false,
          },
        });
      }

      document
        .querySelectorAll<HTMLAnchorElement>(".anchor")
        .forEach((anchor) => {
          anchor.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            const targetId = anchor.getAttribute("href")?.substring(1);
            if (!targetId) return;

            const targetElem = document.getElementById(targetId);
            if (!targetElem) return;

            let y: number | HTMLElement = targetElem;

            if (
              panelsContainerRef.current &&
              panelsContainerRef.current.contains(targetElem)
            ) {
              const panels = gsap.utils.toArray<HTMLElement>(".panel");
              const tween = gsap.getTweensOf(panels)[0];
              const totalScroll =
                tween.scrollTrigger!.end - tween.scrollTrigger!.start;
              const totalMovement =
                (panels.length - 1) * targetElem.offsetWidth;
              y =
                tween.scrollTrigger!.start +
                (targetElem.offsetLeft / totalMovement) * totalScroll;
            }

            gsap.to(window, {
              scrollTo: {
                y,
                autoKill: false,
              },
              duration: 1,
            });
          });
        });

      if (panelsContainerRef.current) {
        const panels = gsap.utils.toArray<HTMLElement>(".panel");
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: panelsContainerRef.current,
            pin: true,
            start: "top top",
            scrub: 1,
            snap: {
              snapTo: 1 / (panels.length - 1),
              inertia: false,
              duration: { min: 0.1, max: 0.1 },
            },
            end: () =>
              "+=" +
              (panelsContainerRef.current!.offsetWidth - window.innerWidth),
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
              animation: `float ${
                Math.random() * 10 + 5
              }s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-[8%]">
        <div
          className="absolute inset-0 bg-repeat bg-[size:200px]"
          style={{ backgroundImage: "url('/blueprint-pattern.svg')" }}
        />
      </div>

      <header></header>

      <main ref={sectionRef} className="relative">
        <section id="panels">
          <div
            ref={panelsContainerRef}
            id="panels-container"
            className="flex flex-nowrap min-h-screen"
            style={{ width: `${problems.length * 100}%` }}
          >
            <article
              id="intro"
              className="panel min-h-[20px] sm:min-h-screen w-full flex items-center justify-center bg-black relative"
            >
              <div className="absolute inset-0 border-2 border-white/20 m-1 sm:m-8 md:m-16 lg:m-24"></div>
              <div className="max-w-4xl mx-auto px-2 md:px-8 relative z-10">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight text-center mb-4 sm:mb-6">
                  Manufacturing Challenges
                </h1>
                <div className="flex justify-center mt-6 sm:mt-8">
                  <a
                    href="#panel-1"
                    className="anchor text-white hover:text-gray-300 transition-all duration-300 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg border-2 border-white/20 rounded-lg hover:bg-white/5 hover:border-white/40 flex items-center gap-2"
                  >
                    Explore Challenges
                    <svg
                      width="16"
                      height="16"
                      className="sm:w-5 sm:h-5 animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>

            {problems.map((problem, index) => (
              <article
                key={index}
                id={`panel-${index + 1}`}
                className="panel min-h-[20px] sm:min-h-screen w-full flex items-center justify-center bg-black border-l border-white/20 relative"
              >
                <div className="absolute inset-0 border-2 border-white/20 m-1 sm:m-8 md:m-16 lg:m-24"></div>

                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center px-2 md:px-8 relative z-10">
                  <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-black border-2 border-white/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      <svg
                        width="28"
                        height="28"
                        className="sm:w-9 sm:h-9 md:w-12 md:h-12 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={problem.icon} />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 flex flex-col">
                    <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight text-center md:text-left">
                      {problem.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed tracking-wide text-center md:text-left">
                      {problem.description}
                    </p>
                    <div className="flex justify-center md:justify-end space-x-3 sm:space-x-4">
                      {index > 0 && (
                        <a
                          href={`#panel-${index}`}
                          className="anchor text-white hover:text-gray-300 transition-all duration-300 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base border-2 border-white/20 rounded-lg hover:bg-white/5 hover:border-white/40"
                        >
                          Previous
                        </a>
                      )}
                      {index < problems.length - 1 && (
                        <a
                          href={`#panel-${index + 2}`}
                          className="anchor text-white hover:text-gray-300 transition-all duration-300 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base border-2 border-white/20 rounded-lg hover:bg-white/5 hover:border-white/40"
                        >
                          Next
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @media (max-width: 768px) {
          #panels-container {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          #panels-container::-webkit-scrollbar {
            display: none;
          }
          .panel {
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Mobile touch improvements */
        @media (hover: none) {
          .anchor {
            padding: 0.75rem 1rem;
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Better touch targets for mobile */
        @media (max-width: 640px) {
          .panel {
            padding: 1rem;
          }

          .anchor {
            touch-action: manipulation;
          }
        }
      `}</style>
    </div>
  );
};

export default ProblemSection;
