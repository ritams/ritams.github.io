import React, { useState, useEffect, useRef } from 'react';
import {
    Moon, Sun, Atom, Network, TrendingUp, BookOpen,
    Mail, ExternalLink, ChevronDown, FileText, Award,
    Cpu, Users, BarChart3
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
        { label: "Research Focus", value: "Sociophysics" }
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
            desc: "Our analysis of 34 nations reveals that voter turnout acts as a 'control parameter'—like temperature in thermodynamics—dictating the statistical distribution of victory margins.",
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

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
            ? (isDark ? 'bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#606c38]/20' : 'bg-white/90 backdrop-blur-md border-b border-[#606c38]/10')
            : (isDark ? 'bg-[#1a1a1a]/70 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm')
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Updated Title: Thin, Spaced Out */}
                <div className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase">
                    <span className={isDark ? 'text-white' : 'text-[#283618]'}>Ritam</span>
                    <span className="text-[#606c38] ml-3">Pal</span>
                </div>

                <div className="flex items-center gap-6">
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

                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-all ${isDark ? 'bg-[#283618] text-[#a3b18a]' : 'bg-[#e9edc9] text-[#606c38]'
                            } hover:scale-110`}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

const Hero = ({ isDark }) => {
    return (
        <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Mobile: Full-width Image at Top */}
            <div className="md:hidden w-full h-64 relative">
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
            <div className="w-full md:w-1/2 lg:w-[55%] flex items-center justify-center px-6 md:px-12 lg:px-16 pt-8 md:pt-24 pb-12 z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 max-w-xl"
                >


                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${isDark ? 'bg-[#606c38]/20 text-[#a3b18a]' : 'bg-[#606c38]/10 text-[#606c38]'
                        }`}>
                        <Atom size={14} /> Sociophysics Researcher
                    </div>

                    <h1 className={`text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight ${isDark ? 'text-white' : 'text-[#283618]'
                        }`}>
                        Order out of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#606c38] to-[#a3b18a]">
                            Chaos
                        </span>
                    </h1>

                    <p className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {DATA.tagline} Using the tools of statistical physics to understand the "noise" of democracy and social networks.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a
                            href="#research"
                            className={`px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${isDark
                                ? 'bg-[#606c38] text-white hover:bg-[#4d572d]'
                                : 'bg-[#606c38] text-white hover:bg-[#4d572d]'
                                }`}
                        >
                            Explore Research
                        </a>
                        <a
                            href="#contact"
                            className={`px-8 py-3 rounded-full font-medium border transition-all ${isDark
                                ? 'border-[#606c38] text-[#a3b18a] hover:bg-[#606c38]/10'
                                : 'border-[#606c38] text-[#606c38] hover:bg-[#606c38]/10'
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
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="hidden md:block md:w-1/2 lg:w-[45%] relative"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/ritam.jpg"
                        alt="Ritam Pal"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Gradient overlay for better text contrast */}
                    <div className={`absolute inset-0 ${isDark
                        ? 'bg-gradient-to-l from-transparent via-transparent to-[#151515]'
                        : 'bg-gradient-to-l from-transparent via-transparent to-[#f4f5f0]'
                        }`}></div>
                    <div className={`absolute inset-0 ${isDark ? 'bg-[#606c38]/10' : 'bg-[#606c38]/5'} mix-blend-overlay`}></div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50 z-20"
            >
                <ChevronDown size={32} className={isDark ? 'text-white' : 'text-[#283618]'} />
            </motion.div>
        </section>
    );
};

const About = ({ isDark }) => {
    return (
        <section id="about" className={`py-24 px-6 ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#fcfdfa]'}`}>
            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className={`text-sm font-bold tracking-widest uppercase mb-4 ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>About The Researcher</h2>
                        {/* Updated Header */}
                        <h3 className={`text-3xl md:text-4xl font-serif font-bold mb-6 ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                            From Statistical Physics to <span className="underline decoration-[#606c38] decoration-4 underline-offset-4">Social Reality</span>
                        </h3>
                        <div className={`space-y-4 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            <p>{DATA.about}</p>
                            <p>
                                Working with Prof. M. S. Santhanam's lab, my doctoral research focuses on establishing that social systems—despite their apparent complexity—often collapse onto simple, universal manifolds. This approach allows us to identify anomalies like electoral malpractice not as political opinions, but as mathematical deviations.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-10">
                            {DATA.stats.map((stat, idx) => (
                                <div key={idx} className={`p-4 border-l-2 ${isDark ? 'border-[#606c38]' : 'border-[#a3b18a]'}`}>
                                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#283618]'}`}>{stat.value}</div>
                                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`relative p-8 rounded-2xl ${isDark ? 'bg-[#283618]/30' : 'bg-[#606c38]/5'} border ${isDark ? 'border-[#606c38]/30' : 'border-[#606c38]/20'}`}>
                        <h4 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#283618]'}`}>Institutional Framework</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-[#606c38] text-white' : 'bg-[#606c38] text-white'}`}>
                                    <Users size={20} />
                                </div>
                                <div>
                                    <h5 className={`font-bold ${isDark ? 'text-white' : 'text-[#283618]'}`}>IISER Pune</h5>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Department of Physics</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-[#606c38] text-white' : 'bg-[#606c38] text-white'}`}>
                                    <Award size={20} />
                                </div>
                                <div>
                                    <h5 className={`font-bold ${isDark ? 'text-white' : 'text-[#283618]'}`}>PMRF Scholar</h5>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Prime Minister's Research Fellowship (Cycle 5)</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-[#606c38] text-white' : 'bg-[#606c38] text-white'}`}>
                                    <BarChart3 size={20} />
                                </div>
                                <div>
                                    <h5 className={`font-bold ${isDark ? 'text-white' : 'text-[#283618]'}`}>Election Insights Group</h5>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"Safeguarding Democracy through Data"</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Research = ({ isDark }) => {
    return (
        <section id="research" className="py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className={`text-sm font-bold tracking-widest uppercase mb-4 ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>Core Research</h2>
                    <h3 className={`text-3xl md:text-5xl font-serif font-bold ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                        The Mathematics of <br className="hidden md:block" /> Collective Behavior
                    </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {DATA.research.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -10 }}
                            className={`p-8 rounded-2xl border backdrop-blur-sm transition-colors duration-300 ${isDark
                                ? 'bg-[#1a1a1a]/80 border-[#606c38]/30 hover:border-[#606c38]'
                                : 'bg-white/80 border-[#606c38]/10 hover:border-[#606c38]'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${isDark ? 'bg-[#283618] text-[#a3b18a]' : 'bg-[#e9edc9] text-[#606c38]'
                                }`}>
                                {item.icon}
                            </div>
                            <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#283618]'}`}>{item.title}</h4>
                            <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.desc}
                            </p>
                            <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#a3b18a]' : 'text-[#606c38]'}`}>
                                Impact: {item.impact}
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
        <section id="publications" className={`py-24 px-6 ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#fcfdfa]'}`}>
            <div className="max-w-5xl mx-auto">
                <h3 className={`text-3xl font-serif font-bold mb-12 flex items-center gap-3 ${isDark ? 'text-white' : 'text-[#283618]'}`}>
                    <BookOpen className="text-[#606c38]" /> Selected Publications
                </h3>

                <div className="space-y-6">
                    {DATA.publications.map((pub, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`group p-6 rounded-xl border transition-all ${isDark
                                ? 'bg-[#252525] border-[#333] hover:border-[#606c38]'
                                : 'bg-white border-gray-200 hover:border-[#606c38]'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${isDark ? 'bg-[#606c38]/30 text-[#a3b18a]' : 'bg-[#606c38]/10 text-[#606c38]'
                                            }`}>
                                            {pub.year}
                                        </span>
                                        <span className={`text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {pub.tag}
                                        </span>
                                    </div>
                                    <h4 className={`text-lg font-bold group-hover:text-[#606c38] transition-colors ${isDark ? 'text-gray-200' : 'text-[#283618]'
                                        }`}>
                                        {pub.title}
                                    </h4>
                                    <p className={`font-serif italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {pub.journal}
                                    </p>
                                </div>
                                <a
                                    href={pub.link}
                                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-transform group-hover:rotate-45 ${isDark ? 'bg-[#333] text-white' : 'bg-gray-100 text-black'
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

const Footer = ({ isDark }) => {
    return (
        <footer id="contact" className={`py-16 px-6 border-t ${isDark ? 'bg-[#1a1a1a] border-[#606c38]/20' : 'bg-white border-[#606c38]/10'}`}>
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className={`text-4xl font-serif font-bold ${isDark ? 'text-white' : 'text-[#283618]'}`}>Let's Connect</h2>
                <p className={`max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Interested in the intersection of physics and social science? Feel free to reach out for collaborations or inquiries about the Election Insights initiative.
                </p>

                <div className="flex justify-center gap-6">
                    <a href="mailto:ritam.pal@students.iiserpune.ac.in" className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${isDark ? 'bg-[#283618] text-[#a3b18a] hover:bg-[#606c38] hover:text-white' : 'bg-[#e9edc9] text-[#606c38] hover:bg-[#606c38] hover:text-white'
                        }`}>
                        <Mail size={18} /> ritam.pal@students.iiserpune.ac.in
                    </a>
                </div>

                <div className={`pt-8 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    &copy; {new Date().getFullYear()} Ritam Pal. All rights reserved. <br />
                    Designed with <span className="text-[#606c38]">Universal Laws</span>.
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
                <NavBar isDark={isDark} toggleTheme={toggleTheme} />
                <Hero isDark={isDark} />
                <About isDark={isDark} />
                <Research isDark={isDark} />
                <Publications isDark={isDark} />
                <Footer isDark={isDark} />
            </div>
        </div>
    );
}
