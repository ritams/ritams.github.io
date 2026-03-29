export const siteConfig = {
  name: "Ritam Pal",
  title: "Ritam Pal — Building at the intersection of physics and AI",
  description:
    "Ritam Pal is a physicist turned AI researcher. Research Lead at Conscious Engines, founder of untitled.life, co-founder of monomials.",
  url: "https://ritampal.com",
  tagline: "Building at the intersection of physics and AI.",
  email: "ritam@untitled.life",
  legacyEmail: "ritam4jnu@gmail.com",
  location: "Bangalore, India",
  social: {
    twitter: "https://x.com/ritam5013",
    github: "https://github.com/ritams",
    instagram: "https://www.instagram.com/ritam.5013",
    linkedin: "https://www.linkedin.com/in/ritam-pal-93932b192/",
    scholar:
      "https://scholar.google.com/citations?user=9_ndyPcAAAAJ&hl=en",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/photos", label: "Photos" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export interface WorkItem {
  title: string;
  role: string;
  description: string;
  tags: string[];
  link?: string;
  current: boolean;
}

export const workItems: WorkItem[] = [
  {
    title: "Conscious Engines",
    role: "Research Lead",
    description:
      "Building Felix, a proactive AI assistant. Leading model research — from architecture decisions to training pipelines. Turning research intuitions into production systems.",
    tags: ["LLMs", "Model Research", "AI Agents", "Production ML"],
    link: "https://consciousengines.com",
    current: true,
  },
  {
    title: "untitled.life",
    role: "Founder",
    description:
      "building untitled.life — more soon.",
    tags: [],
    link: "https://untitled.life",
    current: true,
  },
  {
    title: "monomials",
    role: "Co-founder",
    description:
      "A platform to hire top PhD researchers for technical projects. Co-building with Nisarg and Vikhyat from IISER Pune. Early stage — solving the problem of connecting deep expertise with real-world needs.",
    tags: ["Platform", "PhD Talent", "Early Stage"],
    current: true,
  },
  {
    title: "Upsurge Labs / Bhindi",
    role: "AI Researcher",
    description:
      "Worked at Sowmay Jain's venture studio. Contributed to Bhindi — an agentic AI platform with 300+ background agents across 70+ applications.",
    tags: ["Agentic AI", "AI Research"],
    current: false,
  },
];

export interface Publication {
  title: string;
  journal: string;
  year: string;
  tag: string;
  link: string;
}

export const publications: Publication[] = [
  {
    title: "Universal Statistics of Competition in Democratic Elections",
    journal: "Physical Review Letters, 134, 017401",
    year: "2025",
    tag: "Nature Research Highlight",
    link: "https://link.aps.org/doi/10.1103/PhysRevLett.134.017401",
  },
  {
    title: "Voter Turnouts Govern Key Electoral Statistics",
    journal: "arXiv:2501.01896",
    year: "2025",
    tag: "Preprint",
    link: "https://arxiv.org/abs/2501.01896",
  },
  {
    title:
      "Depolarization of opinions on social networks through random nudges",
    journal: "Physical Review E, 108, 034307",
    year: "2023",
    tag: "Journal Article",
    link: "https://journals.aps.org/pre/abstract/10.1103/PhysRevE.108.034307",
  },
  {
    title:
      "The physics and maths of keeping elections fair and representative",
    journal: "The Hindu",
    year: "2024",
    tag: "Op-Ed",
    link: "https://sites.iiserpune.ac.in/~santh/thehindu_elections_mss.png",
  },
];

export const researchAreas = [
  {
    title: "Universal Laws in Elections",
    description:
      "Developed the Random Voting Model — a parameter-free analytical framework showing that democratic elections across 34+ countries exhibit robust macroscopic universalities in margins, turnouts, and competitiveness.",
  },
  {
    title: "Social Network Dynamics",
    description:
      "Studied the physics of echo chambers and polarization. Proposed stochastic perturbations ('random nudges') as mechanisms to destabilize extreme consensus and promote cohesion in social networks.",
  },
  {
    title: "Statistical Physics of Complex Systems",
    description:
      "Applying tools from statistical mechanics — scaling laws, universality classes, phase transitions — to systems far beyond traditional physics: elections, social dynamics, and collective behavior.",
  },
];

export interface WritingItem {
  title: string;
  description: string;
  date: string;
  link: string;
  source: string;
}

export const writingItems: WritingItem[] = [
  {
    title:
      "The physics and maths of keeping elections fair and representative",
    description:
      "On how statistical physics offers tools to detect electoral anomalies and protect democratic integrity.",
    date: "2024",
    link: "https://sites.iiserpune.ac.in/~santh/thehindu_elections_mss.png",
    source: "The Hindu",
  },
  {
    title: "Election Insights",
    description:
      "An interactive platform exploring the universal statistical patterns in democratic elections worldwide.",
    date: "2025",
    link: "https://electioninsights.in",
    source: "electioninsights.in",
  },
];

export const photos = [
  { id: 1, aspect: "portrait", alt: "Tree canopy near Indiranagar, Bangalore", src: "/photos/indiranagar-canopy.jpg", location: "Indiranagar, Bangalore", date: "March 2026" },
  { id: 2, aspect: "portrait", alt: "Warm gold pendant lamp shot from below, almost abstract", src: "/photos/guerrilla-diner-pendant-lamp.jpg", location: "Guerrilla Diner, Bangalore", date: "March 2026" },
  { id: 3, aspect: "portrait", alt: "Black and white reflection outside an analog store", src: "/photos/analog-store-reflection-bw.jpg", location: "Near Guerrilla Diner, Bangalore", date: "March 2026" },
  { id: 4, aspect: "square", alt: "Milky Way rising over a lone tree silhouette", src: "/photos/milky-way.jpg", location: "Santa Fe", date: "" },
  { id: 5, aspect: "portrait", alt: "Morning light through the trees at Osho Garden", src: "/photos/forest-path.jpg", location: "Osho Garden, Pune", date: "" },
];

export const readingList = [
  { title: "The Forty Rules of Love", author: "Elif Shafak" },
  { title: "If Truth Be Told", author: "Om Swami" },
];

export const photoPlaceholders = [
  { id: 101, aspect: "landscape", alt: "Placeholder" },
  { id: 102, aspect: "square", alt: "Placeholder" },
  { id: 103, aspect: "landscape", alt: "Placeholder" },
  { id: 104, aspect: "portrait", alt: "Placeholder" },
  { id: 105, aspect: "square", alt: "Placeholder" },
];
