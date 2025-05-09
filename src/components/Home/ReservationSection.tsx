// components/ReservationSection.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const ReservationSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-07-04T00:00:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      // Calculate total days first
      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const months = Math.floor(totalDays / 30);
      const days = totalDays % 30;
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setTimeLeft({ months, days, hours });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section ref={ref} className="relative py-32 px-4 bg-black overflow-hidden border-t border-b border-gray-800">
      {/* Industrial background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern-dark.svg')] bg-repeat bg-[size:120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
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
            <span className="text-gray-300">RESERVE</span> YOUR ROBOT
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            LIMITED AVAILABILITY FOR 2025
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto w-1/4 mt-6"
          />
        </motion.div>

        {/* Countdown card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-black border border-gray-700 p-8 mb-12 max-w-2xl mx-auto relative"
        >
          <div className="absolute -top-3 left-6 bg-black px-3 text-gray-400 text-sm font-mono">
            PRODUCTION TIMELINE
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-6">The first SAVA press brake operator ships:</p>
            <div className="text-3xl font-bold text-white mb-2">JULY 4, 2026</div>
            <div className="h-px bg-gray-700 w-1/2 mx-auto my-6"></div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-4xl font-mono text-white mb-1">{timeLeft.months.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-400">MONTHS</div>
              </div>
              <div>
                <div className="text-4xl font-mono text-white mb-1">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-400">DAYS</div>
              </div>
              <div>
                <div className="text-4xl font-mono text-white mb-1">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-400">HOURS</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ 
              backgroundColor: "#ffffff",
              color: "#000000",
              scale: 1.03
            }}
            whileTap={{ scale: 0.97 }}
            className="px-12 py-4 bg-white text-black font-bold rounded-none border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">RESERVE A ROBOT</span>
            <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0"></span>
          </motion.button>
        </motion.div>
      </div>

      {/* Animated scanning beam */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: '100vh' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-1 bg-white/20 blur-sm z-0"
      />
    </section>
  );
};

export default ReservationSection;