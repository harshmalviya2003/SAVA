import React, { useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const particleOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" }
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none" as const,
      random: true,
      straight: false,
      outModes: { default: "out" as const }
    },
    number: { value: 60, density: { enable: true, value_area: 800 } },
    opacity: {
      value: 0.3,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
    },
    shape: { type: "circle" },
    size: {
      value: { min: 1, max: 3 },
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
    }
  },
  detectRetina: true
};

const Hero = ()=> {
  

  return (
    <section style={{ 
      position: "relative", 
      width: "100%", 
      height: "100vh", 
      overflow: "hidden",
      maxWidth: "100vw"
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <source src="/herofinalfr.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced Particle Effect */}
      <Particles
        id="tsparticles"
        options={particleOptions}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2 }}
      />

      {/* Enhanced Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          background: "linear-gradient(120deg, rgba(0,0,0,0.8) 0%, rgba(0, 80, 255, 0.2) 100%)",
          backdropFilter: "blur(3px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div style={{ 
            letterSpacing: 2, 
            fontSize: 18, 
            marginBottom: 16,
            background: "rgba(255,255,255,0.1)",
            padding: "8px 16px",
            borderRadius: "4px",
            backdropFilter: "blur(4px)"
          }}>
            BACKED BY <span style={{ background: "#fff", color: "#222", borderRadius: 4, padding: "2px 8px", fontWeight: 700 }}>Y</span> COMBINATOR
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ 
            fontSize: "clamp(2.5rem, 5vw, 4rem)", 
            fontWeight: 800, 
            margin: 0, 
            lineHeight: 1.1,
            textShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}
        >
          INTELLIGENT<br />MANUFACTURING<br />ROBOTS
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{ 
            margin: "32px 0 24px 0", 
            fontSize: "clamp(1rem, 2vw, 1.375rem)", 
            letterSpacing: 1, 
            fontFamily: "monospace",
            maxWidth: "800px"
          }}
        >
          SAVA IS BUILDING THE FIRST PLUG-AND-PLAY PRESS BRAKE OPERATOR
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          whileHover={{ 
            scale: 1.08, 
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            backgroundColor: "#ffffff",
            color: "#000000"
          }}
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.1)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 20,
            borderRadius: 10,
            padding: "18px 44px",
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
            transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
            cursor: "pointer",
            marginTop: 10,
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        >
          LEARN MORE
        </motion.a>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: "2px",
              height: "40px",
              background: "rgba(255,255,255,0.5)",
              borderRadius: "2px"
            }}
          />
          <span style={{ fontSize: "12px", opacity: 0.7 }}>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
