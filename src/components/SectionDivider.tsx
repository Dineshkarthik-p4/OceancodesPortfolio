import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SectionDivider = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative py-4 ocean-layer">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        className="w-full max-w-md mx-auto h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(195 100% 50% / 0.2), hsl(185 100% 55% / 0.15), transparent)",
        }}
      />
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neon/30"
      />
    </div>
  );
};

export default SectionDivider;
