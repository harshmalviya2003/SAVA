// components/ProblemSection.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ProblemSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -30 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const problems = [
    {
      title: "NO ONE (OR THING) TO OPERATE PRESS BRAKES",
      description: "Critical shortage of skilled manufacturing operators.",
      icon: "M7 11V7a1 1 0 0 1 1-1h3M17 11V7a1 1 0 0 0-1-1h-3M12 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
    },
    {
      title: "EQUIPMENT REPLACEMENT COSTS",
      description: "Automation cells require shops to replace existing equipment.",
      icon: "M20 7h-4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
    },
    {
      title: "INEFFICIENT PROGRAMMING",
      description: "Tedious programming causes shops to turn down profitable jobs.",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    }
  ];

  return (
    <section ref={ref} className="relative py-32 px-4 bg-black overflow-hidden">
      {/* Industrial blueprint background */}
      <div className="absolute inset-0 opacity-[3%]">
        <div className="absolute inset-0 bg-[url('/blueprint-pattern.svg')] bg-repeat bg-[size:200px]"></div>
      </div>
      
      {/* Animated scanning effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-px bg-white/10 z-0"
        />
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 3 }}
          className="absolute top-1/3 w-full h-px bg-white/5 z-0"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16 px-4"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            <span className="text-gray-300">THE</span> PROBLEM
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Modern manufacturing faces critical bottlenecks that hinder productivity and profitability.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto w-1/4 mt-6"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting lines animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/10 z-0"
          />
          
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group"
              whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.3)' }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Industrial icon */}
              <motion.div 
                className="w-16 h-16 bg-black border-2 border-white/20 rounded-full flex items-center justify-center mb-6"
                whileHover={{ rotate: 10, scale: 1.05 }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d={problem.icon} />
                </svg>
              </motion.div>
              
              <motion.h3 
                className="text-2xl font-bold text-white mb-4 uppercase tracking-tight"
                whileHover={{ x: 5 }}
              >
                {problem.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed mb-6"
                whileHover={{ x: 5 }}
              >
                {problem.description}
              </motion.p>
              
              {/* Animated indicator */}
              <motion.div 
                className="flex items-center text-white/50 group-hover:text-white transition-colors"
                whileHover={{ x: 5 }}
              >
                <span className="mr-2">Learn more</span>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.div>
              
              {/* Animated border */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-px bg-white/30 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-24 text-center"
        >
          <motion.button
            className="px-10 py-5 bg-white text-black font-bold rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              Discover Our Solutions
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
                className="ml-2"
              >
                →
              </motion.span>
            </span>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 25 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-black/5 rounded-full opacity-0 group-hover:opacity-100"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;