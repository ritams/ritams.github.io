import React, { useState, useEffect, useRef } from 'react';
import {
    Moon, Sun, Atom, Network, TrendingUp, BookOpen,
    Mail, ExternalLink, ChevronDown, FileText, Award,
    Cpu, Users, BarChart3, Linkedin, Twitter, Github, Instagram,
    Copy, Check
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
            icon: <Atom className="w-6 h-6" />,
            desc: "Challenging conventional political science, we developed a parameter-free analytical framework. It proves that despite microscopic complexities, democratic elections exhibit robust, macroscopic universalities.",
            impact: "Predicts electoral competitiveness across diverse scales."
        },
        {
            id: 2,
            title: "Universality in Elections",
            icon: <BarChart3 className="w-6 h-6" />,
            desc: "Our analysis of 34 nations reveals that voter turnout and margins are inherently correlated. Crucially, we show that a scaled ratio of margin and turnout exhibits a robust universal distribution across diverse democratic systems.",
            impact: "Published in Physical Review Letters (2025)."
        },
        {
            id: 3,
            title: "Depolarizing Social Networks",
            icon: <Network className="w-6 h-6" />,
            desc: "Investigating the physics of echo chambers. We propose 'random nudges'—stochastic noise—as a mechanism to destabilize extreme consensus and foster social cohesion.",
            impact: "A physics-based solution to online polarization."
        }
    ],
    publications: [
        {
            title: "Universal Statistics of Competition in Democratic Elections",
            journal: "Physical Review Letters, 134, 017401",
            year: "2025",
            tag: "Nature Research Highlight",
            link: "#"
        },
        {
            title: "Voter Turnouts Govern Key Electoral Statistics",
            journal: "arXiv:2501.01896",
            year: "2025",
            tag: "Preprint",
            link: "#"
        },
        {
            title: "Depolarization of opinions on social networks through random nudges",
            journal: "Physical Review E, 108, 034307",
            year: "2023",
            tag: "Journal Article",
            link: "#"
        },
        {
            title: "The physics and maths of keeping elections fair and representative",
            journal: "The Hindu",
            year: "2024",
            tag: "Op-Ed",
            link: "#"
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (

        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isMenuOpen
            ? (isDark ? 'bg-[#1a1a1a]' : 'bg-[#f4f5f0]') // Solid background when menu is open
            : scrolled
                ? (isDark ? 'bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#606c38]/20' : 'bg-white/90 backdrop-blur-md border-b border-[#606c38]/10')
                : (isDark ? 'bg-[#1a1a1a]/70 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm')
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Updated Title: Thin, Spaced Out */}
                <div className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase relative z-50">
                    <span className={isDark ? 'text-white' : 'text-[#283618]'}>Ritam</span>
                    <span className="text-[#606c38] ml-3">Pal</span>
                </div>

                <div className="flex items-center gap-6">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
                        {['About', 'Research', 'Publications', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`${isDark ? 'text-gray-200 hover:text-[#a3b18a]' : 'text-[#283618] hover:text-[#606c38]'} transition-colors`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative z-50 p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className={`w-6 h-0.5 mb-1.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''} ${isDark ? 'bg-white' : 'bg-[#283618]'}`}></div>
                        <div className={`w-6 h-0.5 mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''} ${isDark ? 'bg-white' : 'bg-[#283618]'}`}></div>
                        <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${isDark ? 'bg-white' : 'bg-[#283618]'}`}></div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed inset-0 z-40 flex flex-col items-center justify-center ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f4f5f0]'
                            }`}
                    >
                        {/* Decorative background element for menu */}
                        <div className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 pointer-events-none ${isDark ? 'bg-[#606c38]/30' : 'bg-[#606c38]/20'}`} />

                        <div className="flex flex-col items-center gap-12">
                            {['About', 'Research', 'Publications', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-4xl font-serif font-bold tracking-wide transition-colors ${isDark ? 'text-white hover:text-[#a3b18a]' : 'text-[#283618] hover:text-[#606c38]'}`}
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
    return (
        <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Mobile: Full-width Image at Top */}
            <div className="md:hidden w-full h-[50vh] relative">
                <img
                    src="/ritam.jpg"
                    alt="Ritam Pal"
                    className="w-full h-full object-cover object-top"
                />
                <div className={`absolute inset-0 ${isDark
                    ? 'bg-gradient-to-b from-transparent via-transparent to-[#151515]'
                    : 'bg-gradient-to-b from-transparent via-transparent to-[#f4f5f0]'
                    }`}></div>
            </div>

            {/* Left: Content */}
            <div className="w-full md:w-1/2 lg:w-[55%] flex items-center justify-center px-6 md:px-12 lg:px-20 pt-8 md:pt-0 z-10 relative">
                {/* Background Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none ${isDark ? 'bg-[#606c38]/20' : 'bg-[#606c38]/10'}`} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="space-y-8 max-w-2xl relative"
                >
                    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase border ${isDark
                        ? 'bg-[#606c38]/10 text-[#a3b18a] border-[#606c38]/20'
                        : 'bg-[#606c38]/5 text-[#606c38] border-[#606c38]/10'
                        }`}>
                        <Atom size={14} /> Sociophysics Researcher
                    </div>

                    <h1 className={`text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.9] tracking-tight ${isDark ? 'text-white' : 'text-[#283618]'
                        }`}>
                        Order out of <br />
                        <span className={`italic ${isDark ? 'text-[#606c38]' : 'text-[#606c38]'}`}>
                            Chaos
                        </span>
                    </h1>

                    <p className={`text-xl md:text-2xl leading-relaxed font-light max-w-lg ${isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        {DATA.tagline} Using the tools of statistical physics to understand the "noise" of democracy and social networks.
                    </p>

                    <div className="flex flex-wrap gap-5 pt-4">
                        <a
                            href="#research"
                            className={`px-10 py-4 rounded-full font-medium text-lg transition-all transform hover:scale-105 shadow-xl ${isDark
                                ? 'bg-[#606c38] text-white hover:bg-[#4d572d] shadow-[#606c38]/20'
                                : 'bg-[#606c38] text-white hover:bg-[#4d572d] shadow-[#606c38]/20'
                                }`}
                        >
                            Explore Research
                        </a>
                        <a
                            href="#contact"
                            className={`px-10 py-4 rounded-full font-medium text-lg border transition-all hover:bg-[#606c38]/5 ${isDark
                                ? 'border-[#606c38]/50 text-[#a3b18a] hover:text-white hover:border-[#606c38]'
                                : 'border-[#606c38]/30 text-[#606c38] hover:border-[#606c38]'
                                }`}
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Right: Full-height Image */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="hidden md:block md:w-1/2 lg:w-[45%] relative h-screen sticky top-0"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/ritam.jpg"
                        alt="Ritam Pal"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Gradient overlay for better text contrast - Steeper left, gradual right */}
                    <div className={`absolute inset-0 ${isDark
                        ? 'bg-gradient-to-r from-[#151515] via-[#151515]/30 to-transparent'
                        : 'bg-gradient-to-r from-[#f4f5f0] via-[#f4f5f0]/30 to-transparent'
                        }`}></div>
                    <div className={`absolute inset-0 ${isDark ? 'bg-[#606c38]/10' : 'bg-[#606c38]/5'} mix-blend-overlay`}></div>
                </div>
            </motion.div>

            {/* Scroll indicator */}

        </section>
    );
};

const About = ({ isDark }) => {
    return (
        <section id="about" className={`py-32 px-6 relative overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#fcfdfa]'}`}>
            {/* Subtle background element */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none ${isDark ? 'bg-[#606c38]/20' : 'bg-[#606c38]/10'}`} />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="space-y-12">
                    {/* Main Narrative - Full Width/Centered */}
                    <div>
                        <h2 className={`text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3 ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>
                            <span className="w-8 h-[1px] bg-current"></span>
                            About The Researcher
                        </h2>
                        <h3 className={`text-4xl md:text-6xl font-serif font-bold leading-tight mb-8 max-w-4xl ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                            From Statistical Physics to <br />
                            <span className={`italic relative inline-block px-2 ${isDark ? 'text-[#e9edc9]' : 'text-[#606c38]'}`}>
                                Social Reality
                                <span className={`absolute bottom-2 left-0 w-full h-3 -z-10 opacity-30 ${isDark ? 'bg-[#606c38]' : 'bg-[#e9edc9]'}`}></span>
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
        <section id="research" className="py-32 px-6 relative z-10">
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
                            whileHover={{ y: -10 }}
                            className={`group relative p-6 md:p-10 rounded-[2rem] border transition-all duration-500 ${isDark
                                ? 'bg-[#1a1a1a] border-[#333] hover:border-[#606c38]/50 hover:bg-[#222]'
                                : 'bg-white border-gray-100 hover:border-[#606c38]/30 hover:shadow-xl hover:shadow-[#606c38]/5'
                                }`}
                        >
                            {/* Number watermark */}
                            <div className={`absolute top-6 right-8 text-6xl font-serif font-bold opacity-5 pointer-events-none ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                                0{item.id}
                            </div>

                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 ${isDark
                                ? 'bg-[#283618] text-[#a3b18a] group-hover:bg-[#606c38] group-hover:text-white'
                                : 'bg-[#f4f5f0] text-[#606c38] group-hover:bg-[#606c38] group-hover:text-white'
                                }`}>
                                {item.icon}
                            </div>

                            <h4 className={`text-2xl font-bold mb-4 pr-8 ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                                {item.title}
                            </h4>

                            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.desc}
                            </p>

                            <div className={`pt-6 border-t ${isDark ? 'border-[#333]' : 'border-gray-100'}`}>
                                <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-[#606c38]' : 'text-[#a3b18a]'}`}>
                                    Key Impact
                                </div>
                                <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-[#4d572d]'}`}>
                                    {item.impact}
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
        <section id="publications" className={`py-32 px-6 ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#fcfdfa]'}`}>
            <div className="max-w-5xl mx-auto">
                <div className="mb-16 flex items-end justify-between border-b border-[#606c38]/20 pb-8">
                    <div>
                        <h2 className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>
                            Academic Output
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
    ResearchGate: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.91-1.215 1.606-.12.33-.196.72-.226 1.165l-.004.22H2.892v15.97h6.686c.04.53.15 1.01.325 1.44.33.81.87 1.48 1.61 2.01.74.53 1.66.8 2.76.8 1.16 0 2.1-.32 2.83-.97.72-.64 1.2-1.54 1.43-2.69l.02-.13h3.55v-4.55h-3.37c.05-.29.08-.62.08-1.01 0-1.04-.26-1.89-.77-2.55-.51-.66-1.23-1.06-2.15-1.21l-.26-.03h6.15V.57h-2.01zM16.5 14.97c.48 0 .87.16 1.17.48.3.32.45.74.45 1.27 0 .53-.15.95-.45 1.27-.3.32-.69.48-1.17.48-.48 0-.87-.16-1.17-.48-.3-.32-.45-.74-.45-1.27 0-.53.15-.95.45-1.27.3-.32.69-.48 1.17-.48z" />
        </svg>
    ),
    Orcid: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.948.948 0 0 1-.947-.947c0-.516.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.306v7.419h2.197c1.062 0 2.053-.506 2.053-2.338 0-1.525-.809-2.338-1.997-2.338h-2.253z" />
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
        { icon: <SocialIcons.ResearchGate />, label: "ResearchGate", href: "https://www.researchgate.net/profile/Ritam-Pal-3?ev=hdr_xprf" },
        { icon: <SocialIcons.Orcid />, label: "ORCID", href: "https://orcid.org/0009-0008-5220-2188" },
        { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/ritam-pal-93932b192/" },
        { icon: <Twitter size={20} />, label: "Twitter (X)", href: "https://x.com/ritam5013" },
        { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/ritams" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/ritam.5013" }
    ];

    return (
        <footer id="contact" className={`relative py-32 px-6 overflow-hidden ${isDark ? 'bg-[#151515] text-[#f4f5f0]' : 'bg-[#f4f5f0] text-[#1a1a1a]'}`}>
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
                <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mb-16 ${isDark ? 'text-[#a3b18a]' : 'text-[#4d572d]'}`}>
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

export default function App() {
    // Theme state
    const [isDark, setIsDark] = useState(false);

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
            <button
                onClick={toggleTheme}
                className={`fixed bottom-6 right-6 p-3 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110 ${isDark ? 'bg-[#1a1a1a]/80 text-[#a3b18a] border border-[#606c38]/30 backdrop-blur-md' : 'bg-white/80 text-[#606c38] border border-[#606c38]/20 backdrop-blur-md'
                    }`}
                aria-label="Toggle Theme"
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
    );
}

