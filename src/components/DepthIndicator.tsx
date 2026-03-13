import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Sky" },
  { id: "about", label: "Surface" },
  { id: "skills", label: "Shallow" },
  { id: "projects", label: "Mid" },
  { id: "achievements", label: "Deep" },
  { id: "contact", label: "Abyss" },
];

const DepthIndicator = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-1">
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className="group flex items-center gap-2 py-1 cursor-pointer"
        >
          <motion.span
            initial={false}
            animate={{ opacity: activeIndex === i ? 1 : 0 }}
            className="text-[9px] font-mono text-neon/60 whitespace-nowrap"
          >
            {section.label}
          </motion.span>
          <motion.div
            initial={false}
            animate={{
              height: activeIndex === i ? 20 : 8,
              backgroundColor: activeIndex === i
                ? "hsl(185 100% 55% / 0.5)"
                : "hsl(185 100% 55% / 0.1)",
            }}
            transition={{ duration: 0.3 }}
            className="w-0.5 rounded-full group-hover:!bg-neon/30 transition-colors"
          />
        </button>
      ))}
    </div>
  );
};

export default DepthIndicator;
