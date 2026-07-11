import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import AboutSection from "../components/landing/AboutSection";
import FaqSection from "../components/landing/FaqSection";
import ContactSection from "../components/landing/ContactSection";
import FloatingLines from "../components/landing/FloatingLines";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <HeroSection />

            {/* Everything below the hero sits on top of a shared animated
                background. The background is `fixed`, so it stays in view
                as you scroll through Features / About / FAQ / Contact. */}
            <div className="relative">
                <div className="fixed inset-0 z-0">
                    <FloatingLines
                        enabledWaves={["top", "middle", "bottom"]}
                        lineCount={8}
                        lineDistance={8}
                        bendRadius={8}
                        bendStrength={-2}
                        interactive
                        parallax
                        animationSpeed={1}
                        gradientStart="#e945f5"
                        gradientMid="#6f6f6f"
                        gradientEnd="#6a6a6a"
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