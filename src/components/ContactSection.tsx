import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="py-32 relative ocean-layer" ref={ref}>
      {/* Deep ocean ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[120px] opacity-10" style={{ background: 'hsl(195 100% 50%)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-5 h-5 text-neon/60" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Get In Touch</h2>
          </div>
          <div className="w-20 h-0.5 bg-gradient-to-r from-neon to-transparent rounded-full mb-12 ml-8" />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="glass-ocean rounded-2xl p-8 md:p-10 space-y-6 relative overflow-hidden"
          >
            {/* Ambient glow inside form */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-10" style={{ background: 'hsl(195 100% 50%)' }} />

            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background/50 border border-neon/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon/30 focus:ring-1 focus:ring-neon/20 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background/50 border border-neon/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon/30 focus:ring-1 focus:ring-neon/20 transition-all"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="relative z-10">
              <label className="text-sm font-mono text-muted-foreground mb-2 block">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-background/50 border border-neon/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon/30 focus:ring-1 focus:ring-neon/20 transition-all resize-none"
                placeholder="What's on your mind?"
              />
            </div>

            <Button size="lg" className="w-full group relative z-10">
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              Send Message
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-5 mt-10"
          >
            {[
              { icon: Github, href: "https://github.com/Dineshkarthik-p4", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/dinesh-karthik-singarajupalle", label: "LinkedIn" },
              { icon: Mail, href: "mailto:dineshsingarajupalle@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-12 h-12 rounded-xl glass-ocean flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/30 hover:shadow-neon transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
