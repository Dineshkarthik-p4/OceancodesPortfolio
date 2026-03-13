import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const bubbles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 3 + Math.random() * 8,
  delay: Math.random() * 2,
  duration: 2 + Math.random() * 3,
}));

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"surface" | "diving" | "deep" | "exit">("surface");
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("diving"), 600);
    const t2 = setTimeout(() => setPhase("deep"), 2200);
    const t3 = setTimeout(() => setPhase("exit"), 3200);
    const t4 = setTimeout(onComplete, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  useEffect(() => {
    if (phase === "diving") {
      const interval = setInterval(() => {
        setDepth((d) => Math.min(d + 12, 3600));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(180deg, 
              hsl(195 80% ${Math.max(8, 30 - depth / 150)}%) 0%, 
              hsl(210 60% ${Math.max(3, 12 - depth / 400)}%) 50%, 
              hsl(220 50% ${Math.max(2, 6 - depth / 800)}%) 100%)`,
          }}
        >
          {/* Bubbles */}
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              className="absolute rounded-full"
              style={{
                left: `${b.x}%`,
                width: b.size,
                height: b.size,
                background: "hsla(195, 100%, 70%, 0.3)",
                border: "1px solid hsla(195, 100%, 80%, 0.2)",
              }}
              initial={{ bottom: -20, opacity: 0 }}
              animate={{
                bottom: ["0%", "110%"],
                opacity: [0, 0.6, 0],
                x: [0, Math.sin(b.id) * 20, 0],
              }}
              transition={{
                duration: b.duration,
                delay: b.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Light rays from surface */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: phase === "surface" ? 0.3 : 0 }}
            transition={{ duration: 1.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0"
                style={{
                  left: `${15 + i * 18}%`,
                  width: "3%",
                  height: "60%",
                  background: "linear-gradient(180deg, hsla(195,100%,70%,0.15) 0%, transparent 100%)",
                  transform: `rotate(${-8 + i * 4}deg)`,
                  transformOrigin: "top center",
                }}
              />
            ))}
          </motion.div>

          {/* Diver silhouette */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={{
              y: phase === "diving" ? [0, 20, 0] : 0,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Diver icon */}
            <motion.svg
              width="48" height="48" viewBox="0 0 24 24" fill="none"
              stroke="hsl(195 100% 60%)"
              strokeWidth="1.5"
              className="mb-6"
              animate={{ rotate: phase === "diving" ? [0, 5, -5, 0] : 0 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <circle cx="12" cy="5" r="3" />
              <path d="M12 8v6M8 12h8M10 14l-3 6M14 14l3 6" />
              <motion.path
                d="M6 10c0 0 2-1 6-1s6 1 6 1"
                animate={{ d: ["M6 10c0 0 2-1 6-1s6 1 6 1", "M6 10c0 0 2 1 6 1s6-1 6-1", "M6 10c0 0 2-1 6-1s6 1 6 1"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.svg>

            {/* Depth counter */}
            <motion.div
              className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "hsl(195 80% 60%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "diving" || phase === "deep" ? 1 : 0 }}
            >
              depth: {depth.toFixed(0)}m
            </motion.div>

            {/* Text */}
            <motion.h2
              className="text-2xl md:text-3xl font-bold font-mono"
              style={{ color: "hsl(195 100% 70%)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {phase === "surface" && "Preparing to dive..."}
              {phase === "diving" && "Descending..."}
              {phase === "deep" && "Welcome to the depths"}
            </motion.h2>

            {/* Loading bar */}
            <div className="mt-6 w-48 h-px rounded-full overflow-hidden" style={{ background: "hsla(195,100%,50%,0.15)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "hsl(195 100% 50%)" }}
                initial={{ width: "0%" }}
                animate={{ width: phase === "deep" ? "100%" : phase === "diving" ? "70%" : "10%" }}
                transition={{ duration: phase === "diving" ? 1.6 : 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Particles / sea snow */}
          {phase !== "surface" && [...Array(15)].map((_, i) => (
            <motion.div
              key={`p${i}`}
              className="absolute rounded-full"
              style={{
                width: 2,
                height: 2,
                background: "hsla(195, 60%, 60%, 0.3)",
                left: `${Math.random() * 100}%`,
              }}
              initial={{ top: "-5%" }}
              animate={{ top: "105%" }}
              transition={{
                duration: 3 + Math.random() * 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
