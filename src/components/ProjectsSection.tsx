import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink, Fish, X, ChevronRight, Layers, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

import projectAttendance from "@/assets/project-attendance.jpg";
import projectCareerDna from "@/assets/project-careerdna.jpg";
import projectInterview from "@/assets/project-interview.jpg";

const projects = [
  {
    title: "Student Attendance Calculator",
    description: "Web app that calculates attendance percentage and required classes to maintain eligibility with real-time tracking.",
    longDescription: "Developed a web application that calculates attendance percentage and required classes to maintain eligibility. Features a responsive user interface with real-time calculations to help students track attendance efficiently, with a simple and interactive design for easy student interaction.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: projectAttendance,
    depth: "200m",
    highlights: [
      { icon: Layers, text: "Real-time attendance percentage calculations" },
      { icon: Users, text: "Responsive UI for easy student interaction" },
      { icon: Zap, text: "Tracks required classes to maintain eligibility" },
    ],
    github: "https://github.com/Dineshkarthik-p4",
    demo: "#",
  },
  {
    title: "CareerDNA – Career Guidance App",
    description: "Helps students identify suitable career paths and domains based on their interests and skills with interactive guidance.",
    longDescription: "Developed a web application that helps students identify suitable career paths and domains based on their interests and skills. Designed an interactive and user-friendly interface with logic to guide students toward appropriate technology domains and career options, improving decision-making for students exploring different opportunities.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: projectCareerDna,
    depth: "350m",
    highlights: [
      { icon: Layers, text: "Interest & skill-based career path matching" },
      { icon: Users, text: "Interactive and user-friendly guidance interface" },
      { icon: Zap, text: "Domain recommendations for technology careers" },
    ],
    github: "https://github.com/Dineshkarthik-p4",
    demo: "https://careerdna5p4.netlify.app",
  },
  {
    title: "Interview Simulator AI",
    description: "AI-powered platform that simulates real technical interviews with coding questions, automated evaluation, and feedback.",
    longDescription: "Developing an AI-powered platform that simulates real technical interviews with coding and problem-solving questions. Implements automated evaluation to analyze answers and provide feedback on code quality and time complexity, with an interactive interface featuring timed sessions and progress tracking for effective interview preparation.",
    tags: ["AI", "JavaScript", "React"],
    image: projectInterview,
    depth: "500m",
    highlights: [
      { icon: Layers, text: "AI-powered coding & problem-solving questions" },
      { icon: Users, text: "Automated answer evaluation with feedback" },
      { icon: Zap, text: "Timed sessions with progress tracking" },
    ],
    github: "https://github.com/Dineshkarthik-p4",
    demo: "#",
  },
];

const ProjectCard = ({ project, index, inView, onExpand }: {
  project: typeof projects[0];
  index: number;
  inView: boolean;
  onExpand: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.15 * index, duration: 0.5 }}
    className="group glass-ocean rounded-2xl overflow-hidden hover:shadow-ocean transition-all duration-500 relative cursor-pointer"
    onClick={onExpand}
  >
    {/* Depth indicator */}
    <div className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded text-[10px] font-mono text-neon/40 border border-neon/10 bg-background/50 backdrop-blur-sm">
      ⬇ {project.depth}
    </div>

    {/* Image */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Click hint */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-mono text-neon/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>View details</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    </div>

    {/* Top gradient bar */}
    <div className="h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

    <div className="p-6">
      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-neon transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-neon/5 text-neon/60 border border-neon/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          variant="glow"
          size="sm"
          className="flex-1"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </Button>
        <Button
          variant="neon"
          size="sm"
          className="flex-1"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Live Demo
        </Button>
      </div>
    </div>
  </motion.div>
);

const ExpandedProject = ({ project, onClose }: {
  project: typeof projects[0];
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    onClick={onClose}
  >
    {/* Backdrop */}
    <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

    <motion.div
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 30, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-ocean rounded-2xl shadow-ocean"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/30 transition-all"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Hero image */}
      <div className="relative h-56 md:h-72 overflow-hidden rounded-t-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Depth badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono text-neon/60 border border-neon/15 bg-background/50 backdrop-blur-sm">
          Depth: {project.depth}
        </div>
      </div>

      <div className="p-6 md:p-8 -mt-12 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-4">
          {project.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1.5 rounded-full bg-neon/5 text-neon/70 border border-neon/15"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-8">
          {project.longDescription}
        </p>

        {/* Highlights */}
        <div className="space-y-3 mb-8">
          <h3 className="text-sm font-mono text-neon/50 uppercase tracking-wider mb-4">Key Features</h3>
          {project.highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-neon/5 border border-neon/10"
            >
              <div className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center flex-shrink-0">
                <h.icon className="w-4 h-4 text-neon/70" />
              </div>
              <span className="text-sm text-foreground/80">{h.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <Button variant="glow" size="lg" className="flex-1">
            <Github className="w-4 h-4" />
            View on GitHub
          </Button>
          <Button variant="neon" size="lg" className="flex-1">
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </Button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 relative ocean-layer" ref={ref}>
      <motion.div style={{ y }} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Fish className="w-5 h-5 text-neon/60" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Projects</h2>
          </div>
          <div className="w-20 h-0.5 bg-gradient-to-r from-neon to-transparent rounded-full mb-12 ml-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              inView={inView}
              onExpand={() => setExpandedIndex(i)}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {expandedIndex !== null && (
          <ExpandedProject
            project={projects[expandedIndex]}
            onClose={() => setExpandedIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
