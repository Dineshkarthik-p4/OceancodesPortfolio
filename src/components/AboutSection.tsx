import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Waves } from "lucide-react";

const skills = ["Java", "HTML", "CSS", "JavaScript", "React", "MySQL", "Spring Boot", "Git"];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="py-32 relative ocean-layer" ref={ref}>
      <motion.div style={{ y }} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-2">
            <Waves className="w-5 h-5 text-neon/60" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">About Me</h2>
          </div>
          <div className="w-20 h-0.5 bg-gradient-to-r from-neon to-transparent rounded-full mb-10 ml-8" />

          <div className="glass-ocean rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Subtle ambient light inside card */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-10" style={{ background: 'hsl(195 100% 50%)' }} />

            <p className="text-muted-foreground leading-relaxed text-lg mb-8 relative z-10">
              Highly motivated Computer Science student at G. Pulla Reddy Engineering College with a strong foundation 
              in Java programming, data structures, and web development. Skilled in building responsive web applications 
              using HTML, CSS, JavaScript, and React, along with experience in database management using MySQL. 
              Passionate about problem solving, learning modern technologies, and developing scalable software solutions. 
              Seeking an opportunity to start my career as a Java Full Stack Developer.
            </p>

            <div className="flex flex-wrap gap-3 relative z-10">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                  className="px-4 py-2 rounded-full text-sm font-mono border border-neon/20 text-neon/80 bg-neon/5 hover:bg-neon/10 hover:border-neon/40 hover:shadow-neon transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
