import { useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Bubbles = ({ count = 15, depth = 0 }: { count?: number; depth?: number }) => {
  const bubbles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 3 + Math.random() * 8,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.2,
    })), [count]);

  return (
    <>
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left: `${b.left}%`,
            bottom: `-${b.size}px`,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            opacity: b.opacity * (1 - depth * 0.3),
          }}
        />
      ))}
    </>
  );
};

const FloatingParticles = ({ count = 30, depth = 0 }: { count?: number; depth?: number }) => {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
    })), [count]);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.15 + depth * 0.1,
          }}
        />
      ))}
    </>
  );
};

const WaveLines = ({ count = 3 }: { count?: number }) => {
  const lines = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top: 20 + i * 30,
      duration: 15 + i * 5,
      opacity: 0.08 - i * 0.02,
    })), [count]);

  return (
    <>
      {lines.map((l) => (
        <div
          key={l.id}
          className="wave-line"
          style={{
            top: `${l.top}%`,
            animationDuration: `${l.duration}s`,
            opacity: l.opacity,
          }}
        />
      ))}
    </>
  );
};

const OceanBackground = () => {
  const { scrollYProgress } = useScroll();

  // Color transitions based on scroll depth
  const skyOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const surfaceOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.35], [0, 1, 0]);
  const shallowOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.55], [0, 1, 0]);
  const midOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [0, 1, 0]);
  const deepOpacity = useTransform(scrollYProgress, [0.65, 0.8, 0.9], [0, 1, 0]);
  const abyssOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // Light rays fade as we go deeper
  const lightRayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 0]);
  const vignetteIntensity = useTransform(scrollYProgress, [0, 1], [0.3, 0.8]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Sky / Above ocean layer */}
      <motion.div
        style={{ opacity: skyOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 120% 60% at 50% 100%, hsl(200 70% 12%) 0%, transparent 70%),
            radial-gradient(ellipse 80% 50% at 30% 20%, hsl(210 50% 18% / 0.5) 0%, transparent 60%),
            linear-gradient(180deg, hsl(220 40% 8%) 0%, hsl(210 50% 15%) 50%, hsl(200 60% 18%) 100%)
          `
        }} />
        {/* Stars */}
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-foreground/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              width: 1 + Math.random() * 2,
              height: 1 + Math.random() * 2,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Ocean surface */}
      <motion.div style={{ opacity: surfaceOpacity }} className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 100% 40% at 50% 20%, hsl(195 60% 20% / 0.4) 0%, transparent 60%),
            linear-gradient(180deg, hsl(200 60% 12%) 0%, hsl(205 55% 10%) 50%, hsl(210 50% 8%) 100%)
          `
        }} />
        <WaveLines count={4} />
      </motion.div>

      {/* Shallow water */}
      <motion.div style={{ opacity: shallowOpacity }} className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, hsl(200 55% 10%) 0%, hsl(210 50% 7%) 50%, hsl(215 45% 5%) 100%)`
        }} />
        <Bubbles count={12} depth={0.3} />
        <FloatingParticles count={20} depth={0.3} />
      </motion.div>

      {/* Mid ocean */}
      <motion.div style={{ opacity: midOpacity }} className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, hsl(210 50% 6%) 0%, hsl(215 45% 4%) 50%, hsl(220 40% 3%) 100%)`
        }} />
        <Bubbles count={8} depth={0.6} />
        <FloatingParticles count={35} depth={0.6} />
      </motion.div>

      {/* Deep ocean */}
      <motion.div style={{ opacity: deepOpacity }} className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, hsl(220 40% 3%) 0%, hsl(225 38% 2%) 100%)`
        }} />
        <Bubbles count={5} depth={0.8} />
        <FloatingParticles count={40} depth={0.8} />
      </motion.div>

      {/* Abyss */}
      <motion.div style={{ opacity: abyssOpacity }} className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 50%, hsl(195 100% 50% / 0.04) 0%, transparent 70%),
            linear-gradient(180deg, hsl(230 40% 2%) 0%, hsl(240 35% 1%) 100%)
          `
        }} />
        <FloatingParticles count={50} depth={1} />
      </motion.div>

      {/* Light rays from surface */}
      <motion.div style={{ opacity: lightRayOpacity }} className="absolute inset-0 light-rays" />

      {/* Vignette overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, hsl(220 40% 2% / 0.6) 100%)`,
        }}
      />
    </div>
  );
};

export default OceanBackground;
