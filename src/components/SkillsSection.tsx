import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Droplets } from "lucide-react";

const skills = [
  { name: "Java", level: 90 },
  { name: "C", level: 75 },
  { name: "Data Structures & Algorithms", level: 85 },
  { name: "HTML & CSS", level: 92 },
  { name: "JavaScript", level: 88 },
  { name: "React", level: 80 },
  { name: "MySQL", level: 78 },
  { name: "OOP", level: 88 },
  { name: "DBMS", level: 80 },
  { name: "Git & GitHub", level: 85 },
  { name: "Operating Systems", level: 72 },
  { name: "Computer Networks", level: 70 },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="skills" className="py-32 relative ocean-layer" ref={ref}>
      <motion.div style={{ y }} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-5 h-5 text-neon/60" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Skills</h2>
          </div>
          <div className="w-20 h-0.5 bg-gradient-to-r from-neon to-transparent rounded-full mb-12 ml-8" />
        </motion.div>

        <div className="max-w-3xl mx-auto grid gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
              className="glass-ocean rounded-xl p-4"
            >
              <div className="flex justify-between mb-2">
                <span className="font-mono text-sm text-foreground">{skill.name}</span>
                <span className="font-mono text-xs text-neon/60">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ delay: 0.08 * i + 0.3, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
