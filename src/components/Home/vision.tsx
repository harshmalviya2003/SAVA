// components/AdvancedVisionSection.tsx
'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleBackground = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x -= delta / 10;
      particlesRef.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={particlesRef} positions={random.inSphere(new Float32Array(2000), { radius: 1.5 }) as Float32Array}>
      <PointMaterial 
        transparent
        color="#ffffff"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const HolographicText = ({ children }: { children: React.ReactNode }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.span
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        textShadow: '0 0 8px rgba(255, 255, 255, 0.7)',
      }}
      animate={{
        textShadow: hovered 
          ? [
              '0 0 2px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff',
              '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff',
            ]
          : '0 0 8px rgba(255, 255, 255, 0.7)',
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 1.5,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.span>
  );
};

const FloatingRobotArm = () => {
  return (
    <motion.div
      initial={{ y: 0, rotate: -15 }}
      animate={{
        y: [0, -20, 0],
        rotate: [-15, 15, -15],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="absolute left-1/4 top-1/3 opacity-80"
    >
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="text-white">
        <path d="M17 11V7a1 1 0 0 0-1-1h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 11V7a1 1 0 0 1 1-1h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 15v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 11V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="m4 15 3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="m20 15-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </motion.div>
  );
};

const VisionCard = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -45,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8
      }
    })
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="relative bg-black/80 backdrop-blur-lg rounded-2xl p-10 border border-white/30 shadow-2xl shadow-white/20 max-w-4xl mx-auto transform-style-preserve-3d perspective-1000"
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-[length:200px]"></div>
      </div>
      
      <div className="relative z-10">
        <motion.h3 
          custom={0}
          variants={textVariants}
          className="text-3xl md:text-5xl font-bold text-white mb-8 text-center"
        >
          <HolographicText>THE NEXT MANUFACTURING WORKFORCE</HolographicText>
        </motion.h3>
        
        <motion.blockquote 
          custom={1}
          variants={textVariants}
          className="text-xl md:text-2xl text-gray-300 text-center mb-10 leading-relaxed"
        >
          <span className="\text-white font-medium"></span>
          We envision a world where American manufacturing is fully automated, where humans are liberated from tedious labor to focus on creativity, humanity, and exploration.
          <span className="text-white font-medium"></span>
        </motion.blockquote>
        
        <motion.div 
          custom={2}
          variants={textVariants}
          className="text-right text-white font-medium tracking-wider"
        >
          — FOUNDERS <span className="text-gray-300">JAKOB</span>, <span className="text-gray-300">ALESSIO</span>, & <span className="text-gray-300">VEDIC</span>
        </motion.div>
      </div>
      
      {/* Holographic effect */}
      <div className="absolute -inset-2 rounded-2xl overflow-hidden pointer-events-none">
        <motion.div
          initial={{ x: -100, y: -100 }}
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, 100, 200, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-40 h-40 bg-white/10 rounded-full blur-xl"
        />
      </div>
    </motion.div>
  );
};

const AdvancedVisionSection = () => {
  const titleControls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  
  useEffect(() => {
    if (inView) {
      titleControls.start('visible');
    }
  }, [titleControls, inView]);


  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  
  return (
    <section 
      ref={ref}
      className="relative py-32 px-4 bg-black overflow-hidden min-h-screen flex items-center"
    >
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>
      
      {/* Floating elements */}
      {/* <FloatingRobotArm /> */}
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto relative z-10 w-full"
      >
        <div className="text-center mb-16 px-4">
          <motion.h2 
            initial="hidden"
            animate={titleControls}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            <span className="text-gray-300">OUR</span> VISION
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            We envision a world where American manufacturing is fully automated
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto w-1/4 mt-6"
          />
        </div>

        <VisionCard />
      </motion.div>
      
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

export default AdvancedVisionSection;