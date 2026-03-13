import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Anchor, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";


const roles = [
  "Java Full Stack Developer",
  "Web Developer",
  "React Engineer",
  "Problem Solver",
];

const TypingText = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 40 : 80;

    if (!deleting && charIndex === current.length) {
      const timeout = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (deleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <span className="text-lg md:text-xl text-muted-foreground font-mono">
      {roles[roleIndex].slice(0, charIndex)}
      <span className="inline-block w-0.5 h-5 md:h-6 bg-neon ml-0.5 align-middle animate-pulse" />
    </span>
  );
};

const navItems = ["About", "Skills", "Projects", "Achievements", "Contact"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="text-lg font-bold gradient-text font-mono flex items-center gap-2"
        >
          <Anchor className="w-4 h-4 text-neon" />
          &lt;DK /&gt;
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="text-sm text-muted-foreground hover:text-neon transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <Button variant="neon" size="sm" asChild>
            <a href="/DineshResume.pdf" download>Resume</a>
          </Button>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-neon transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass border-l border-border/20 p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-sm font-mono text-neon/70 tracking-widest uppercase">Navigate</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-neon transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item.toLowerCase())}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-base text-muted-foreground hover:text-neon transition-colors py-3 px-4 rounded-lg hover:bg-muted/30 font-mono"
                  >
                    <span className="text-neon/40 mr-3 text-xs">0{i + 1}</span>
                    {item}
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto">
                <Button variant="neon" size="lg" className="w-full" asChild>
                  <a href="/DineshResume.pdf" download>Resume</a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden ocean-layer">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20" style={{ background: 'hsl(195 100% 50%)' }} />

      <motion.div style={{ y, opacity, scale }} className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono border border-neon/20 text-neon/80 bg-neon/5 tracking-widest uppercase">
            Welcome to the depths
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-neon/70 font-mono text-sm mb-4 tracking-widest uppercase"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="gradient-text text-shadow-glow">Dinesh Karthik</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-10 max-w-2xl mx-auto h-8"
        >
          <TypingText />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="group">
            Dive Into Projects
            <ArrowDown className="ml-1 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button variant="neon" size="lg">
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex gap-4 justify-center mt-12"
        >
          {[
            { icon: Github, href: "https://github.com/Dineshkarthik-p4" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/dinesh-karthik-singarajupalle" },
            { icon: Mail, href: "mailto:dineshsingarajupalle@gmail.com" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-11 h-11 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/40 hover:shadow-neon transition-all duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono text-muted-foreground/50">scroll to dive</span>
            <div className="w-5 h-8 rounded-full border border-neon/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-neon/40 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export { Navbar, HeroSection };
