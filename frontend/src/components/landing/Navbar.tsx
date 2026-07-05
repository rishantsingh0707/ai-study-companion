import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const navLinks = [
    {
        name: "Features",
        href: "#features",
    },
    {
        name: "About",
        href: "#about",
    },
    {
        name: "FAQ",
        href: "#faq",
    },
    {
        name: "Contact",
        href: "#contact",
    },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header
            className="
    fixed
    top-4
    left-1/2
    z-50
    w-[95%]
    max-w-7xl
    -translate-x-1/2
    overflow-hidden
    rounded-2xl
    border
    border-white/10
    bg-black/10
    backdrop-blur-2xl
    shadow-[0_8px_40px_rgba(0,0,0,.35)]
    backdrop-blur-3xl
    backdrop-saturate-200
  "
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link to="/">
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">

                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-base-content/80 transition hover:text-primary"
                        >
                            {link.name}
                        </a>
                    ))}

                </nav>

                {/* Desktop Button */}
                <div className="hidden lg:block">

                    <Link
                        to="/login"
                        className="btn btn-primary rounded-xl px-6"
                    >
                        Get Started
                    </Link>

                </div>

                {/* Mobile Button */}
                <button
                    type="button"
                    className="btn btn-ghost btn-circle lg:hidden"
                    aria-controls="mobile-menu"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div id="mobile-menu" className="border-t border-white/10 bg-base-200 lg:hidden">
                    <div className="flex flex-col gap-2 p-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="rounded-lg px-3 py-2 transition hover:bg-base-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <Link
                            to="/login"
                            className="btn btn-primary mt-3"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}


        </header>
    );
}