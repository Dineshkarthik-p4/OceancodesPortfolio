import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, Star, Trophy, Shell } from "lucide-react";

const achievements = [
  {
    icon: Award,
    title: "Java Certified",
    description: "Certified in Java Programming",
  },
  {
    icon: Trophy,
    title: "NMMS Scholar",
    description: "Selected for National Means-cum-Merit Scholarship (NMMS) – 9th Class",
  },
  {
    icon: Star,
    title: "B.Tech – 7.82 CGPA",
    description: "G. Pulla Reddy Engineering College, Expected Graduation 2027",
  },
  {
    icon: Award,
    title: "Intermediate – 95.7%",
    description: "SR Junior College, Kurnool (2021–2023)",
  },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="achievements" className="py-32 relative ocean-layer" ref={ref}>
      <motion.div style={{ y }} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Shell className="w-5 h-5 text-neon/60" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Achievements</h2>
          </div>
          <div className="w-20 h-0.5 bg-gradient-to-r from-neon to-transparent rounded-full mb-12 ml-8" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 * i, duration: 0.5 }}
              className="glass-ocean rounded-2xl p-6 text-center group hover:shadow-ocean transition-all duration-500 relative overflow-hidden"
            >
              {/* Ambient glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: 'radial-gradient(circle at 50% 0%, hsl(195 100% 50% / 0.06), transparent 70%)' }} />

              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-neon/5 border border-neon/15 flex items-center justify-center group-hover:bg-neon/10 group-hover:border-neon/30 group-hover:shadow-neon transition-all duration-300 relative z-10">
                <item.icon className="w-6 h-6 text-neon/70" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 relative z-10">{item.title}</h3>
              <p className="text-sm text-muted-foreground relative z-10">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AchievementsSection;
