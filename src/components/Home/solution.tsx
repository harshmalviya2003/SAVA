"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random/dist/maath-random.esm";

const ParticleBackground = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state, delta: number) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x -= delta / 10;
      particlesRef.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points
      ref={particlesRef}
      positions={
        random.inSphere(new Float32Array(2000), { radius: 1.5 }) as Float32Array
      }
    >
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

const SolutionSection = () => {
  const controls = useAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      if (videoRef.current) {
        videoRef.current
          .play()
          .catch((e) => console.log("Auto-play prevented:", e));
      }
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

  const solution = {
    name: "SAVA",
    model: "SATA",
    features: [
      "Automated job processing",
      "CAD volume analysis",
      "Real-time processing",
      "Smart material optimization",
      "Predictive maintenance",
    ],
    videoSrc: "/howitworks.mp4",
  };

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 bg-black overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12 px-4"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            <span className="text-gray-300">INTELLIGENT</span> MANUFACTURING
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Simply provide the CAD & quantity – the robot does the rest!
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto w-1/4 mt-6"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="bg-black border border-gray-800 rounded-lg overflow-hidden group mx-4"
          whileHover={{ y: -3 }}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {solution.name}
                </h3>
                <p className="text-gray-400 font-mono text-sm">
                  {solution.model}
                </p>
              </div>
              <div className="px-3 py-1 bg-gray-900 text-white rounded-full text-xs font-bold border border-gray-700">
                PROCESSING
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {solution.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="w-4 h-4 text-white mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-4 mb-6 rounded-md overflow-hidden ">
            <div className="relative pt-[45%] bg-gray-900 max-w-3xl mx-auto">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                style={{
                  objectPosition: "center",
                  transform: "scale(1.1)",
                }}
              >
                <source src={solution.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center px-4"
        ></motion.div>
      </div>

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: "100vh" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-white/20 blur-sm z-0"
      />
    </section>
  );
};

export default SolutionSection;
