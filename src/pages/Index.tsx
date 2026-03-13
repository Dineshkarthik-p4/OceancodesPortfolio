import { Navbar, HeroSection } from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import OceanBackground from "@/components/OceanBackground";
import SectionDivider from "@/components/SectionDivider";
import DepthIndicator from "@/components/DepthIndicator";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import { useState, useCallback } from "react";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen bg-background relative">
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <OceanBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <AchievementsSection />
        <SectionDivider />
        <ContactSection />

        {/* Footer */}
        <footer className="py-8 border-t border-neon/5 ocean-layer">
          <p className="text-center text-sm text-muted-foreground font-mono">
            &copy; 2026 Dinesh Karthik. Built from the depths.
          </p>
        </footer>
      </div>

      <DepthIndicator />
      <ScrollToTop />
    </div>
  );
};

export default Index;
