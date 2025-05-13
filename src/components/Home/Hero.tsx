import { motion, useScroll, useTransform } from "framer-motion";
import Particles from "react-tsparticles";



const Hero = () => {
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const videoOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section style={{ 
      position: "relative", 
      width: "100%", 
      height: "100vh", 
      overflow: "hidden",
      maxWidth: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          scale: videoScale,
          opacity: videoOpacity,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/herofinalfr.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      <Particles
        id="tsparticles"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          background: "linear-gradient(120deg, rgba(0,0,0,0.9) 0%, rgba(255,255,255,0.1) 100%)",
          backdropFilter: "blur(4px)",
          pointerEvents: "none",
        }}
      />

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
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div style={{ 
            letterSpacing: 2, 
            fontSize: 18, 
            marginBottom: 16,
            background: "rgba(0,0,0,0.7)",
            padding: "8px 16px",
            borderRadius: "4px",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            BACKED BY <span style={{ background: "#fff", color: "#000", borderRadius: 4, padding: "2px 8px", fontWeight: 700 }}>Y</span> COMBINATOR
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 70 }}
          style={{ 
            fontSize: "clamp(2.5rem, 5vw, 4rem)", 
            fontWeight: 900, 
            margin: 0, 
            lineHeight: 1.1,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            letterSpacing: "-1px"
          }}
        >
          INTELLIGENT<br />MANUFACTURING<br />ROBOTS
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, type: "spring", stiffness: 50 }}
          style={{ 
            margin: "32px 0 24px 0", 
            fontSize: "clamp(1rem, 2vw, 1.375rem)", 
            letterSpacing: 1, 
            fontFamily: "monospace",
            maxWidth: "800px",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}
        >
          SAVA ROBOTICS IS BUILDING THE FIRST PLUG-AND-PLAY PRESS BRAKE OPERATOR
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.1, type: "spring", stiffness: 100 }}
          whileHover={{ 
            scale: 1.08, 
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            backgroundColor: "#ffffff",
            color: "#000000"
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.1)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 20,
            borderRadius: 10,
            padding: "18px 44px",
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
            cursor: "pointer",
            marginTop: 10,
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        >
          LEARN MORE
        </motion.a>

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
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: "2px",
              height: "40px",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "2px",
              boxShadow: "0 0 10px rgba(255,255,255,0.3)"
            }}
          />
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ 
              fontSize: "12px", 
              opacity: 0.8, 
              textShadow: "0 2px 4px rgba(0,0,0,0.3)" 
            }}
          >
            Scroll to explore
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
