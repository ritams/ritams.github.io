import React, { useState, useEffect, useRef } from 'react';
import {
    Moon, Sun, Atom, Network, TrendingUp, BookOpen,
    Mail, ExternalLink, ChevronDown, FileText, Award,
    Cpu, Users, BarChart3, Linkedin, Twitter, Github, Instagram,
    Copy, Check, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Assets & Data ---

const DATA = {
    name: "Ritam Pal",
    title: "Physicist of Democracy",
    affiliation: "PhD Scholar & PMRF Fellow, IISER Pune",
    tagline: "Decoding the universal laws governing human collective behavior.",
    about: "I am a physicist moving beyond inanimate matter to study 'active matter'—human beings. Working with Prof. M. S. Santhanam's lab at IISER Pune, I use statistical physics, complex systems theory, and big data to uncover the hidden symmetries in democratic elections and social polarization.",
    stats: [
        { label: "Countries Analyzed", value: "34+" },
        { label: "Key Publications", value: "PRL, PRE" },
        { label: "Fellowship", value: "PMRF Cycle 5" },
        { label: "Research Focus", value: "Sociophysics" },
        { label: "Institution", value: "IISER Pune" }
    ],
    research: [
        {
            id: 1,
            title: "The Random Voting Model (RVM)",
            desc: "Challenging conventional political science, we developed a parameter-free analytical framework. It proves that despite microscopic complexities, democratic elections exhibit robust, macroscopic universalities.",
            impact: "Predicts electoral competitiveness across diverse scales."
        },
        {
            id: 2,
            title: "Universality in Elections",
            desc: "Our analysis of 34 nations reveals that voter turnout and margins are inherently correlated. Crucially, we show that a scaled ratio of margin and turnout exhibits a robust universal distribution across diverse democratic systems.",
            impact: "Universality acts as a diagnostic tool to flag large-scale electoral malpractice."
        },
        {
            id: 3,
            title: "Depolarizing Social Networks",
            desc: "Investigating the physics of echo chambers. We propose 'random nudges'—stochastic noise—as a mechanism to destabilize extreme consensus and foster social cohesion.",
            impact: "A proof of concept solution to online polarization."
        }
    ],
    publications: [
        {
            title: "Universal Statistics of Competition in Democratic Elections",
            journal: "Physical Review Letters, 134, 017401",
            year: "2025",
            tag: "Nature Research Highlight",
            link: "https://link.aps.org/doi/10.1103/PhysRevLett.134.017401"
        },
        {
            title: "Voter Turnouts Govern Key Electoral Statistics",
            journal: "arXiv:2501.01896",
            year: "2025",
            tag: "Preprint",
            link: "https://arxiv.org/abs/2501.01896"
        },
        {
            title: "Depolarization of opinions on social networks through random nudges",
            journal: "Physical Review E, 108, 034307",
            year: "2023",
            tag: "Journal Article",
            link: "https://journals.aps.org/pre/abstract/10.1103/PhysRevE.108.034307"
        },
        {
            title: "The physics and maths of keeping elections fair and representative",
            journal: "The Hindu",
            year: "2024",
            tag: "Op-Ed",
            link: "https://sites.iiserpune.ac.in/~santh/thehindu_elections_mss.png"
        }
    ]
};

// --- Components ---

const ParticleBackground = ({ isDark }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let width, height;
        let particles = [];

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const particleCount = width < 768 ? 40 : 80;
            particles = [];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.5 + 0.1
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `rgba(163, 177, 138, ${p.alpha})` // Light Olive/Sage
                    : `rgba(96, 108, 56, ${p.alpha})`;  // Dark Olive
                ctx.fill();

                // Draw connections (Social Network Metaphor)
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - p.x;
                    const dy = particles[j].y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = isDark
                            ? `rgba(163, 177, 138, ${0.15 - distance / 1000})`
                            : `rgba(96, 108, 56, ${0.15 - distance / 1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        init();
        draw();

        window.addEventListener('resize', init);
        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
        />
    );
};

const NavBar = ({ isDark, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['About', 'Research', 'Publications', 'Contact'];

    const handleMobileNavClick = (e, targetId) => {
        e.preventDefault();
        setMobileMenuOpen(false);

        setTimeout(() => {
            const element = document.querySelector(targetId);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
            ? (isDark ? 'bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#606c38]/20' : 'bg-white/90 backdrop-blur-md border-b border-[#606c38]/10')
            : (isDark ? 'bg-[#1a1a1a]/70 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm')
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Updated Title: Thin, Spaced Out */}
                <a href="#hero" className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase relative z-50 cursor-pointer block hover:opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                    <span className={isDark ? 'text-white' : 'text-[#283618]'}>Ritam</span>
                    <span className="text-[#606c38] ml-3">Pal</span>
                </a>

                <div className="flex items-center gap-6">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 text-xs font-light tracking-[0.2em] uppercase">
                        {navLinks.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`${isDark ? 'text-gray-200 hover:text-[#a3b18a]' : 'text-[#283618] hover:text-[#606c38]'} transition-colors duration-300`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#283618]'}`} />
                        ) : (
                            <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#283618]'}`} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Expansion */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-t border-[#606c38]/10"
                    >
                        <div className="flex flex-col items-end justify-center py-8 px-6 gap-6">
                            {navLinks.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) => handleMobileNavClick(e, `#${item.toLowerCase()}`)}
                                    className={`text-lg font-light tracking-[0.2em] uppercase ${isDark ? 'text-gray-200' : 'text-[#283618]'
                                        }`}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = ({ isDark }) => {
    const themeImage = isDark ? "/ritam-darkmode.jpg" : "/ritam-lightmode.jpg";
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]); // Adjust values for desired parallax strength

    return (
        <section id="hero" className="relative min-h-screen overflow-hidden">
            {/* Mobile: Full-width Image at Top (< md only) */}
            <div className="md:hidden w-full h-[50vh] relative">
                <img
                    src={themeImage}
                    alt="Ritam Pal"
                    className="w-full h-full object-cover object-top"
                />
                <div className={`absolute inset-0 ${isDark
                    ? 'bg-gradient-to-b from-transparent via-transparent to-[#151515]'
                    : 'bg-gradient-to-b from-transparent via-transparent to-[#f4f5f0]'
                    }`}></div>
            </div>

            {/* Desktop: Absolute Positioned Image Right (>= md only) */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ y }}
                className="hidden md:block absolute right-0 top-0 h-full w-1/2 lg:w-[45%]"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={themeImage}
                        alt="Ritam Pal"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 ${isDark
                        ? 'bg-gradient-to-r from-[#151515] via-[#151515]/30 to-transparent'
                        : 'bg-gradient-to-r from-[#f4f5f0] via-[#f4f5f0]/30 to-transparent'
                        }`}></div>
                    <div className={`absolute inset-0 ${isDark ? 'bg-[#606c38]/10' : 'bg-[#606c38]/5'} mix-blend-overlay`}></div>
                </div>
            </motion.div>

            {/* Content Container - Centered to match Nav */}
            <div className="md:absolute md:inset-0 pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 xl:px-0 h-full flex items-center">
                    {/* Left: Content Wrapper */}
                    <div className="w-full md:w-1/2 lg:w-[55%] pointer-events-auto pt-8 md:pt-0 z-10 relative pb-12 md:pb-0">
                        {/* Background Glow */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none ${isDark ? 'bg-[#606c38]/20' : 'bg-[#606c38]/10'}`} />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="max-w-2xl relative"
                        >
                            <div className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 inline-block ${isDark
                                ? 'text-[#a3b18a]'
                                : 'text-[#606c38]'
                                }`}>
                                <span className="border-b border-current pb-1">Sociophysics Researcher</span>
                            </div>

                            <h1 className={`text-6xl md:text-8xl font-serif font-medium leading-[0.95] tracking-tight mb-6 ${isDark ? 'text-white' : 'text-[#283618]'
                                }`}>
                                Order out of <br />
                                <span className={`italic font-light ${isDark ? 'text-[#606c38]' : 'text-[#606c38]'}`}>
                                    Chaos
                                </span>
                            </h1>

                            <p className={`text-xl md:text-2xl leading-relaxed font-light max-w-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                {DATA.tagline} Using the tools of statistical physics to understand the "noise" of democracy and social networks.
                            </p>

                            <div className="flex flex-wrap gap-6 pt-6">
                                <a
                                    href="#research"
                                    className={`group px-8 py-3 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 ${isDark
                                        ? 'bg-[#f4f5f0] text-[#151515] hover:bg-[#606c38] hover:text-white'
                                        : 'bg-[#283618] text-[#f4f5f0] hover:bg-[#606c38] hover:text-white'
                                        }`}
                                >
                                    Explore Research
                                </a>
                                <a
                                    href="#contact"
                                    className={`group px-8 py-3 rounded-full text-sm font-medium tracking-widest uppercase border transition-all duration-300 ${isDark
                                        ? 'border-white/20 text-white hover:border-[#606c38] hover:text-[#606c38]'
                                        : 'border-[#151515]/20 text-[#151515] hover:border-[#606c38] hover:text-[#606c38]'
                                        }`}
                                >
                                    Contact Me
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const About = ({ isDark }) => {
    return (
        <section id="about" className={`py-16 md:py-32 px-6 relative overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#fcfdfa]'}`}>
            {/* Subtle background element */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none ${isDark ? 'bg-[#606c38]/20' : 'bg-[#606c38]/10'}`} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="space-y-12">
                    {/* Main Narrative - Full Width/Centered */}
                    <div>
                        <h2 className={`text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>
                            <span className="border-b border-current pb-1">About The Researcher</span>
                        </h2>
                        <h3 className={`text-4xl md:text-6xl font-serif font-bold leading-tight mb-8 max-w-4xl ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                            From Statistical Physics to <br />
                            <span className={`italic relative inline-block px-2 ${isDark ? 'text-[#606c38]' : 'text-[#606c38]'}`}>
                                Social Reality
                            </span>
                        </h3>
                        <div className={`space-y-8 text-lg md:text-xl leading-relaxed font-light max-w-3xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            <p className="first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:leading-none">
                                {DATA.about}
                            </p>
                            <p>
                                Working with Prof. M. S. Santhanam's lab, my doctoral research focuses on establishing that social systems—despite their apparent complexity—often collapse onto simple, universal manifolds. This approach allows us to identify anomalies like electoral malpractice not as political opinions, but as mathematical deviations.
                            </p>
                        </div>
                    </div>

                    {/* Stats Row - Cleaning & Merging Institutional Info */}
                    <div className="flex flex-wrap gap-x-16 gap-y-10 pt-16 border-t border-dashed border-[#606c38]/30">
                        {DATA.stats.map((stat, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className={`text-3xl md:text-4xl font-serif font-bold ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                                    {stat.value}
                                </div>
                                <div className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Research = ({ isDark }) => {
    return (
        <section id="research" className="py-16 md:py-32 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-left md:text-center mb-20">
                    <h2 className={`text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>
                        <span className="border-b border-current pb-1">Core Research</span>
                    </h2>
                    <h3 className={`text-4xl md:text-6xl font-serif font-bold ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                        The Mathematics of <br className="hidden md:block" />
                        <span className={`italic ${isDark ? 'text-[#606c38]' : 'text-[#606c38]'}`}>Collective Behavior</span>
                    </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {DATA.research.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`group relative p-8 md:p-10 rounded-[2rem] border transition-all duration-500 overflow-hidden flex flex-col justify-between h-full ${isDark
                                ? 'bg-[#1a1a1a] border-[#333] hover:border-[#606c38]/50 hover:bg-[#222]'
                                : 'bg-white border-gray-100 hover:border-[#606c38]/30 hover:shadow-xl hover:shadow-[#606c38]/5'
                                }`}
                        >
                            {/* Artistic Background Number */}
                            <div className={`absolute -top-6 -right-6 text-[120px] leading-none font-serif font-bold opacity-[0.03] select-none transition-transform duration-700 group-hover:scale-110 group-hover:opacity-[0.06] ${isDark ? 'text-white' : 'text-[#283618]'
                                }`}>
                                0{item.id}
                            </div>

                            <div className="relative z-10">
                                <span className={`inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 ${isDark ? 'text-[#606c38]' : 'text-[#606c38]'
                                    }`}>
                                    0{item.id}
                                </span>

                                <h4 className={`text-2xl md:text-3xl font-serif font-bold mb-6 ${isDark ? 'text-white' : 'text-[#283618]'
                                    }`}>
                                    {item.title}
                                </h4>

                                <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {item.desc}
                                </p>
                            </div>

                            <div className={`relative z-10 pt-6 mt-auto border-t ${isDark ? 'border-[#333]' : 'border-gray-100'
                                }`}>
                                <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-[#a3b18a]' : 'text-[#4d572d]'
                                    }`}>
                                    Key Impact
                                </div>
                                <div className={`text-sm font-medium italic ${isDark ? 'text-gray-300' : 'text-[#283618]'
                                    }`}>
                                    "{item.impact}"
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Publications = ({ isDark }) => {
    return (
        <section id="publications" className={`py-16 md:py-32 px-6 ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#fcfdfa]'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex items-end justify-between border-b border-[#606c38]/20 pb-8">
                    <div>
                        <h2 className={`text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>
                            <span className="border-b border-current pb-1">Academic Output</span>
                        </h2>
                        <h3 className={`text-3xl md:text-4xl font-serif font-bold flex items-center gap-4 ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                            Selected Publications
                        </h3>
                    </div>
                </div>

                <div className="space-y-4">
                    {DATA.publications.map((pub, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`group relative p-6 md:p-8 rounded-2xl border transition-all duration-300 ${isDark
                                ? 'bg-[#252525] border-[#333] hover:border-[#606c38]/50 hover:bg-[#2a2a2a]'
                                : 'bg-white border-gray-100 hover:border-[#606c38]/30 hover:shadow-lg hover:shadow-[#606c38]/5'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Year & Tag */}
                                <div className="flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-2 md:w-32 shrink-0">
                                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${isDark ? 'bg-[#606c38]/20 text-[#a3b18a]' : 'bg-[#606c38]/10 text-[#606c38]'
                                        }`}>
                                        {pub.year}
                                    </span>
                                    <div className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {pub.tag}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow space-y-2">
                                    <h4 className={`text-lg md:text-xl font-bold leading-tight group-hover:text-[#606c38] transition-colors ${isDark ? 'text-gray-100' : 'text-[#283618]'
                                        }`}>
                                        {pub.title}
                                    </h4>
                                    <p className={`font-serif italic text-base md:text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {pub.journal}
                                    </p>
                                </div>

                                {/* Link Button */}
                                <a
                                    href={pub.link}
                                    className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:rotate-45 ${isDark
                                        ? 'border-[#444] text-gray-400 group-hover:bg-[#606c38] group-hover:border-[#606c38] group-hover:text-white'
                                        : 'border-gray-200 text-gray-400 group-hover:bg-[#606c38] group-hover:border-[#606c38] group-hover:text-white'
                                        }`}
                                >
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Social Icons (Custom SVGs for Academic Platforms) ---
const SocialIcons = {
    GoogleScholar: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
        </svg>
    ),
    ResearchGate: ({ isDark }) => (
        <svg viewBox="0 0 32 32" className="w-5 h-5 transition-opacity opacity-80 hover:opacity-100">
            <path
                d="M32.04 15.97c0,8.85 -7.18,16.03 -16.02,16.03 -8.85,0 -16.02,-7.18 -16.02,-16.03 0,-8.85 7.17,-16.03 16.02,-16.03 8.84,0 16.02,7.18 16.02,16.03zm-14.79 7c-1.43,-0.28 -2.28,-1.11 -4.45,-4.33 -0.72,-1.08 -0.72,-1.08 -1.42,-1.13 -1.03,-0.07 -0.95,-0.25 -0.92,2.02 0.04,2.58 0.01,2.52 1.5,2.77 0.39,0.06 0.42,0.09 0.42,0.32 0,0.26 0,0.26 -2.62,0.28 -2.46,0.02 -2.62,0.01 -2.67,-0.14 -0.1,-0.29 0.05,-0.43 0.59,-0.53 0.61,-0.11 0.93,-0.36 1.01,-0.78 0.04,-0.16 0.05,-2.32 0.03,-4.8 -0.03,-5.21 0.03,-4.9 -0.93,-5.11 -0.6,-0.13 -0.79,-0.27 -0.71,-0.51 0.06,-0.16 0.19,-0.17 2.92,-0.22 4.06,-0.08 4.82,0.05 5.9,1.01 1.13,1.01 1.29,2.55 0.39,3.84 -0.4,0.58 -1.2,1.2 -1.82,1.43 -0.29,0.11 -0.53,0.23 -0.53,0.27 0,0.12 0.92,1.43 1.49,2.13 1.52,1.85 2.34,2.57 3.19,2.79 0.53,0.14 0.68,0.29 0.53,0.55 -0.16,0.27 -0.96,0.33 -1.9,0.14zm-3.83 -6.63c2,-0.82 2.15,-3.57 0.25,-4.38 -0.49,-0.21 -0.62,-0.22 -1.85,-0.22 -1.33,0 -1.33,0 -1.35,2.31 -0.02,1.27 -0.01,2.37 0.02,2.43 0.09,0.21 2.34,0.1 2.93,-0.14zm6.97 -2.85c-1.55,-0.29 -2.06,-1.24 -1.98,-3.68 0.04,-1.35 0.15,-1.72 0.67,-2.28 0.92,-0.99 3.2,-0.9 4.04,0.16 0.36,0.45 0.33,0.59 -0.17,0.74 -0.39,0.13 -0.39,0.13 -0.75,-0.23 -0.85,-0.82 -2.32,-0.52 -2.58,0.54 -0.13,0.47 -0.12,2.46 0.01,2.91 0.35,1.27 2.46,1.27 2.82,0 0.22,-0.81 0.17,-0.87 -0.8,-0.92 -0.47,-0.02 -0.47,-0.02 -0.47,-0.41 0,-0.38 0,-0.38 1.12,-0.41 1.45,-0.03 1.43,-0.05 1.36,1.01 -0.09,1.33 -0.45,1.97 -1.32,2.35 -0.57,0.24 -1.35,0.33 -1.95,0.22z"
                className={isDark ? "fill-[#d1d5db]" : "fill-[#333333]"}
            />
            <path
                d="M17.25 22.97c-1.43,-0.28 -2.28,-1.11 -4.45,-4.33 -0.72,-1.08 -0.72,-1.08 -1.42,-1.13 -1.03,-0.07 -0.95,-0.25 -0.92,2.02 0.04,2.58 0.01,2.52 1.5,2.77 0.39,0.06 0.42,0.09 0.42,0.32 0,0.26 0,0.26 -2.62,0.28 -2.46,0.02 -2.62,0.01 -2.67,-0.14 -0.1,-0.29 0.05,-0.43 0.59,-0.53 0.61,-0.11 0.93,-0.36 1.01,-0.78 0.04,-0.16 0.05,-2.32 0.03,-4.8 -0.03,-5.21 0.03,-4.9 -0.93,-5.11 -0.6,-0.13 -0.79,-0.27 -0.71,-0.51 0.06,-0.16 0.19,-0.17 2.92,-0.22 4.06,-0.08 4.82,0.05 5.9,1.01 1.13,1.01 1.29,2.55 0.39,3.84 -0.4,0.58 -1.2,1.2 -1.82,1.43 -0.29,0.11 -0.53,0.23 -0.53,0.27 0,0.12 0.92,1.43 1.49,2.13 1.52,1.85 2.34,2.57 3.19,2.79 0.53,0.14 0.68,0.29 0.53,0.55 -0.16,0.27 -0.96,0.33 -1.9,0.14zm-3.83 -6.63c2,-0.82 2.15,-3.57 0.25,-4.38 -0.49,-0.21 -0.62,-0.22 -1.85,-0.22 -1.33,0 -1.33,0 -1.35,2.31 -0.02,1.27 -0.01,2.37 0.02,2.43 0.09,0.21 2.34,0.1 2.93,-0.14zm6.97 -2.85c-1.55,-0.29 -2.06,-1.24 -1.98,-3.68 0.04,-1.35 0.15,-1.72 0.67,-2.28 0.92,-0.99 3.2,-0.9 4.04,0.16 0.36,0.45 0.33,0.59 -0.17,0.74 -0.39,0.13 -0.39,0.13 -0.75,-0.23 -0.85,-0.82 -2.32,-0.52 -2.58,0.54 -0.13,0.47 -0.12,2.46 0.01,2.91 0.35,1.27 2.46,1.27 2.82,0 0.22,-0.81 0.17,-0.87 -0.8,-0.92 -0.47,-0.02 -0.47,-0.02 -0.47,-0.41 0,-0.38 0,-0.38 1.12,-0.41 1.45,-0.03 1.43,-0.05 1.36,1.01 -0.09,1.33 -0.45,1.97 -1.32,2.35 -0.57,0.24 -1.35,0.33 -1.95,0.22zm0 0z"
                className={isDark ? "fill-[#151515]" : "fill-[#f4f5f0]"}
            />
        </svg>
    ),
    Orcid: ({ isDark }) => (
        <svg viewBox="0 0 256 256" className="w-5 h-5 transition-opacity opacity-80 hover:opacity-100">
            <path
                d="M256,128c0,70.7-57.3,128-128,128C57.3,256,0,198.7,0,128C0,57.3,57.3,0,128,0C198.7,0,256,57.3,256,128z"
                className={isDark ? "fill-[#d1d5db]" : "fill-[#333333]"}
            />
            <g className={isDark ? "fill-[#151515]" : "fill-[#f4f5f0]"}>
                <path d="M86.3,186.2H70.9V79.1h15.4v48.4V186.2z" />
                <path d="M108.9,79.1h41.6c39.6,0,57,28.3,57,53.6c0,27.5-21.5,53.6-56.8,53.6h-41.8V79.1z M124.3,172.4h24.5c34.9,0,42.9-26.5,42.9-39.7c0-21.5-13.7-39.7-43.7-39.7h-23.7V172.4z" />
                <path d="M88.7,56.8c0,5.5-4.5,10.1-10.1,10.1c-5.6,0-10.1-4.6-10.1-10.1c0-5.6,4.5-10.1,10.1-10.1C84.2,46.7,88.7,51.3,88.7,56.8z" />
            </g>
        </svg>
    )
};

const Footer = ({ isDark }) => {
    const [copied, setCopied] = useState(false);
    const email = "ritam.pal@students.iiserpune.ac.in";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialLinks = [
        { icon: <SocialIcons.GoogleScholar />, label: "Google Scholar", href: "https://scholar.google.com/citations?user=9_ndyPcAAAAJ&hl=en" },
        { icon: <SocialIcons.ResearchGate isDark={isDark} />, label: "ResearchGate", href: "https://www.researchgate.net/profile/Ritam-Pal-3?ev=hdr_xprf" },
        { icon: <SocialIcons.Orcid isDark={isDark} />, label: "ORCID", href: "https://orcid.org/0009-0008-5220-2188" },
        { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/ritam-pal-93932b192/" },
        { icon: <Twitter size={20} />, label: "Twitter (X)", href: "https://x.com/ritam5013" },
        { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/ritams" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/ritam.5013" }
    ];

    return (
        <footer id="contact" className={`relative py-16 md:py-32 px-6 overflow-hidden ${isDark ? 'bg-[#151515] text-[#f4f5f0]' : 'bg-[#f4f5f0] text-[#1a1a1a]'}`}>
            {/* Decorative Background */}
            <div className={`absolute inset-0 opacity-50 pointer-events-none ${isDark
                ? 'bg-[radial-gradient(circle_at_50%_100%,rgba(96,108,56,0.15),transparent_50%)]'
                : 'bg-[radial-gradient(circle_at_50%_100%,rgba(96,108,56,0.1),transparent_50%)]'
                }`}></div>

            <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-start text-left md:items-center md:text-center">

                {/* Title */}
                <h2 className={`text-6xl md:text-7xl font-serif font-bold mb-8 ${isDark ? 'text-[#f4f5f0]' : 'text-[#283618]'}`}>
                    Let's Connect
                </h2>

                {/* Description */}
                <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mb-16 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Interested in the intersection of physics and social science? Feel free to
                    reach out for collaborations or inquiries about the Election Insights
                    initiative.
                </p>

                {/* Email Section */}
                <div className="w-full flex flex-col items-start md:items-center gap-4 mb-20">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#606c38]">Email</span>

                    <div className={`flex items-center justify-between w-full md:w-auto gap-2 md:gap-3 px-4 md:px-6 py-4 rounded-2xl border transition-all ${isDark
                        ? 'bg-[#1a1a1a] border-[#333]'
                        : 'bg-white border-[#e2e8f0]'
                        }`}>
                        <span className={`text-xs sm:text-sm md:text-xl font-medium truncate ${isDark ? 'text-gray-200' : 'text-[#283618]'}`}>
                            {email}
                        </span>

                        <button
                            onClick={handleCopy}
                            className={`p-2 rounded-lg transition-colors ${isDark
                                ? 'bg-[#2a2a2a] hover:bg-[#333] text-gray-400'
                                : 'bg-[#f1f5f9] hover:bg-[#e2e8f0] text-gray-600'
                                }`}
                            aria-label="Copy email"
                        >
                            {copied ? <Check size={18} className="text-[#606c38]" /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>

                {/* Socials Section */}
                <div className="flex flex-col items-start md:items-center gap-6">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#606c38]">Socials</span>

                    <div className="flex flex-wrap justify-start md:justify-center gap-4">
                        {socialLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                aria-label={link.label}
                                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${isDark
                                    ? 'bg-[#1a1a1a] text-gray-400 hover:text-white shadow-lg shadow-black/20'
                                    : 'bg-white text-gray-600 hover:text-[#283618] shadow-lg shadow-gray-200'
                                    }`}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className={`mt-20 pt-8 border-t w-full text-left md:text-center text-sm ${isDark ? 'border-[#333] text-gray-500' : 'border-[#606c38]/10 text-gray-500'}`}>
                    <p className="mb-2">&copy; {new Date().getFullYear()} Ritam Pal. All rights reserved.</p>
                    <p>Designed with <span className={`font-serif italic ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>Universal Laws</span>.</p>
                </div>
            </div>
        </footer>
    );
};

const ThemeToggle = ({ isDark, toggleTheme }) => {
    return (
        <motion.button
            onClick={toggleTheme}
            className={`fixed bottom-6 right-6 p-3 rounded-full z-50 flex items-center justify-center transition-all duration-500 backdrop-blur-sm border
                ${isDark
                    ? 'bg-[#1a1a1a]/30 border-white/10 hover:bg-[#1a1a1a]/80 text-[#a3b18a] hover:backdrop-blur-md'
                    : 'bg-white/30 border-black/5 hover:bg-white/80 text-[#606c38] hover:backdrop-blur-md'
                }
                group shadow-lg hover:shadow-2xl`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                >
                    {isDark ? (
                        <Sun size={20} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <Moon size={20} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

export default function App() {
    // Theme state with persistence
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved) {
                return saved === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Update theme and persist
    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    // Toggle theme
    const toggleTheme = () => setIsDark(!isDark);

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#151515]' : 'bg-[#f4f5f0]'}`}>
            <ParticleBackground isDark={isDark} />

            <div className="relative z-10">
                <NavBar isDark={isDark} />
                <Hero isDark={isDark} />
                <About isDark={isDark} />
                <Research isDark={isDark} />
                <Publications isDark={isDark} />
                <Footer isDark={isDark} />
            </div>

            {/* Floating Theme Toggle */}
            {/* Floating Theme Toggle */}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>
    );
}

