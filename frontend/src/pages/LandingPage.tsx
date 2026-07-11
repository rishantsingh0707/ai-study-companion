import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import AboutSection from "../components/landing/AboutSection";
import FaqSection from "../components/landing/FaqSection";
import ContactSection from "../components/landing/ContactSection";
import Lightfall from "../components/landing/LightFall";
import { useInViewport } from "../hooks/useInViewport";

export default function LandingPage() {
    
    const { ref: contentRef, isVisible } = useInViewport<HTMLDivElement>(0);

    return (
        <>
            <Navbar />
            <HeroSection />

        
            <div ref={contentRef} className="relative">
                <div className="fixed inset-0 z-0">
                    <Lightfall
                        paused={!isVisible}
                        colors={["#e945f5", "#7c3aed", "#22d3ee"]}
                        backgroundColor="#09090b"
                        speed={0.5}
                        streakCount={3}
                        streakWidth={1}
                        streakLength={1.2}
                        glow={1}
                        density={0.6}
                        twinkle={1}
                        zoom={3}
                        backgroundGlow={0.4}
                        opacity={0.8}
                        mouseInteraction
                        mouseStrength={0.6}
                        mouseRadius={1}
                        mouseDampening={0.15}
                    />
                </div>

                <div className="relative z-10">
                    <FeaturesSection />
                    <AboutSection />
                    <FaqSection />
                    <ContactSection />
                </div>
            </div>
        </>
    );
}