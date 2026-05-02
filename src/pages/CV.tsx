import React from 'react';
import { motion } from 'motion/react';
import {
  Download, Mail, Github, Linkedin, MapPin,
  Code2, Database, GitBranch, Terminal, ExternalLink, GraduationCap, Briefcase, Star
} from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

const SKILLS = {
  languages: ['JavaScript / TypeScript', 'Python', 'SQL (MariaDB, MySQL)', 'PHP', 'C++'],
  frontend: ['React 19', 'Tailwind CSS v4', 'Framer Motion', 'Three.js', 'GSAP', 'Redux Toolkit'],
  backend: ['Node.js / Express', 'Flask', 'REST APIs', 'Database Modeling (MCD/MLD)'],
  tools: ['Git / GitHub', 'Vite', 'VS Code', 'Vercel', 'Netlify'],
};

const getProjects = (language: string) => [
  {
    title: 'Quoter',
    tech: 'React · Redux Toolkit · Tailwind CSS',
    desc: language === 'en'
      ? 'Quote browsing app with global state management via Redux Toolkit, ensuring seamless transitions between quotes without page reloads.'
      : "Application de citations avec gestion d'état global via Redux Toolkit, assurant des transitions fluides sans rechargement de page.",
    link: 'https://quoter-ebon.vercel.app/',
    github: 'https://github.com/LonewolfGan/Quoter',
  },
  {
    title: 'Cinemate',
    tech: 'React · TMDB API · Framer Motion',
    desc: language === 'en'
      ? 'Movie discovery platform with real-time search, lazy-loaded images, and localStorage caching for a snappy app-like experience.'
      : 'Plateforme de découverte de films avec recherche en temps réel, lazy loading et mise en cache localStorage.',
    link: 'https://cinematelone.netlify.app/',
    github: 'https://github.com/LonewolfGan/cinemate',
  },
  {
    title: 'Face Recognition System',
    tech: 'Python · OpenCV · Flask · JavaScript',
    desc: language === 'en'
      ? 'Full-stack vision system bridging a Python/OpenCV image processor with a custom JS frontend via a Flask REST API.'
      : "Système de vision full-stack reliant un processeur d'images Python/OpenCV à un frontend JS via une API REST Flask.",
    link: 'https://github.com/LonewolfGan/Face_Recognition',
    github: 'https://github.com/LonewolfGan/Face_Recognition',
  },
  {
    title: 'X-Files Archive',
    tech: 'PHP · MySQL · Security',
    desc: language === 'en'
      ? 'Secure file archive built with PHP native file systems and custom encryption layers for sensitive metadata handling.'
      : 'Archive de fichiers sécurisée avec systèmes de fichiers PHP natifs et couches de chiffrement personnalisées.',
    link: 'https://hdev.great-site.net',
    github: 'https://github.com/LonewolfGan',
  },
  {
    title: 'E-Commerce Architecture',
    tech: 'SQL · Node.js · MCD/MLD',
    desc: language === 'en'
      ? 'Robust cart system with a comprehensive MCD/MLD database schema ensuring industrial-grade data integrity across multiple tables.'
      : "Système de panier robuste avec schéma MCD/MLD complet garantissant l'intégrité des données entre plusieurs tables.",
    link: 'https://ecomat.netlify.app/products',
    github: 'https://github.com/LonewolfGan/E-commerce_sample',
  },
];

const getExperience = (language: string) => [
  {
    period: '2024 – Present',
    role: language === 'en' ? 'Freelance Web Developer' : 'Développeur Web Freelance',
    org: language === 'en' ? 'Self-employed / Personal Projects' : 'Indépendant / Projets personnels',
    points: language === 'en'
      ? [
        'Built 5+ full-stack web apps end-to-end with React, Node.js, and SQL databases',
        'Deployed projects on Vercel and Netlify with CI/CD pipelines',
        'Implemented RESTful APIs and third-party integrations (TMDB, custom backends)',
      ]
      : [
        'Développé 5+ applications web full-stack de bout en bout avec React, Node.js et SQL',
        'Déploiements sur Vercel et Netlify avec pipelines CI/CD',
        'Implémenté des APIs RESTful et des intégrations tierces (TMDB, backends personnalisés)',
      ],
  },
  {
    period: '2023',
    role: language === 'en' ? 'Independent Research & Development' : 'Recherche & Développement Indépendant',
    org: language === 'en' ? 'Personal Lab' : 'Lab Personnel',
    points: language === 'en'
      ? [
        'Developed face recognition system combining Python/OpenCV with a Flask API and JS frontend',
        'Explored WebGL and Three.js for interactive 3D web experiences',
        'Built secure PHP file archive with custom encryption and metadata search',
      ]
      : [
        'Système de reconnaissance faciale combinant Python/OpenCV avec API Flask et frontend JS',
        'Exploration de WebGL et Three.js pour des expériences web 3D interactives',
        'Archive PHP sécurisée avec chiffrement personnalisé et recherche de métadonnées',
      ],
  },
];

export const CV: React.FC = () => {
  const { language } = useLanguage();
  const projects = getProjects(language);
  const experience = getExperience(language);

  return (
    <main>
      <title>CV | Atlas Lonewolf — Junior Full-Stack Developer</title>
      <meta name="description" content="Curriculum Vitae of Atlas Lonewolf — skills, projects, experience. Download PDF." />

      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* ── Header ── */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
                Curriculum Vitae
              </p>
              <h1 className="text-5xl md:text-7xl font-display font-clash font-bold text-foreground leading-none mb-4">
                Atlas<br /><span className="text-gradient font-serif italic font-normal">Lonewolf.</span>
              </h1>
              <p className="text-lg text-foreground/50 font-light">
                {language === 'en' ? 'Junior Full-Stack Developer' : 'Développeur Full-Stack Junior'}
              </p>

              <address className="flex flex-wrap gap-4 mt-6 not-italic">
                {[
                  { icon: <Mail size={13} />, label: 'atlaslonewolf00@gmail.com', href: 'mailto:atlaslonewolf00@gmail.com' },
                  { icon: <Github size={13} />, label: 'github.com/LonewolfGan', href: 'https://github.com/LonewolfGan' },
                  { icon: <Linkedin size={13} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/atlas-lonewolf' },
                  { icon: <MapPin size={13} />, label: 'Remote / Global', href: null },
                ].map(item => (
                  item.href
                    ? <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-foreground/50 hover:text-primary transition-colors">
                      <span className="text-primary">{item.icon}</span>{item.label}
                    </a>
                    : <span key={item.label} className="flex items-center gap-1.5 text-xs font-mono text-foreground/50">
                      <span className="text-primary">{item.icon}</span>{item.label}
                    </span>
                ))}
              </address>
            </div>

            <div className="shrink-0">
              <Button
                asChild
                size="md"
                className="min-w-[180px] h-12 whitespace-nowrap rounded-full shadow-lg shadow-primary/20"
                rightIcon={<Download size={18} />}
              >
                <a href="#" onClick={(e) => { e.preventDefault(); alert(language === 'en' ? 'PDF coming soon — upload your CV file to /public/atlas-cv.pdf' : 'PDF bientôt — uploadez votre CV dans /public/atlas-cv.pdf'); }}>
                  {language === 'en' ? 'Download PDF' : 'Télécharger PDF'}
                </a>
              </Button>
              <p className="text-[10px] font-mono text-foreground/30 text-center mt-2">
                {language === 'en' ? 'PDF version' : 'Version PDF'}
              </p>
            </div>
          </motion.header>

          <div className="space-y-12">

            {/* ── Summary ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              aria-label="Profile Summary"
              className="glass border border-border rounded-3xl p-8"
            >
              <h2 className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-5">
                <Star size={14} />
                {language === 'en' ? 'Profile' : 'Profil'}
              </h2>
              <p className="text-foreground/70 leading-relaxed font-light text-lg">
                {language === 'en'
                  ? 'Motivated junior full-stack developer with a solid CS foundation and a strong focus on building real, deployed applications. Proficient in React, Node.js, Python and SQL. Passionate about minimalist UI design, clean code architecture, and continuous learning. Actively seeking a junior developer role or internship.'
                  : "Développeur full-stack junior motivé avec une solide base en informatique et un fort accent sur la construction d'applications réelles et déployées. Maîtrise de React, Node.js, Python et SQL. Passionné par le design UI minimaliste, l'architecture de code propre et l'apprentissage continu. Recherche activement un poste de développeur junior ou un stage."}
              </p>
            </motion.section>

            {/* ── Experience ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              aria-label="Work Experience"
            >
              <h2 className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6">
                <Briefcase size={14} />
                {language === 'en' ? 'Experience' : 'Expérience'}
              </h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <article key={idx} className="glass border border-border rounded-2xl p-7">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                        <p className="text-primary/70 text-sm font-medium">{exp.org}</p>
                      </div>
                      <span className="text-xs font-mono text-foreground/40 bg-foreground/5 px-3 py-1 rounded-full shrink-0">{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.points.map((pt, i) => (
                        <li key={i} className="flex gap-3 text-sm text-foreground/60 font-light">
                          <span className="text-primary mt-1.5 shrink-0" aria-hidden="true">▸</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </motion.section>

            {/* ── Education ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              aria-label="Education"
            >
              <h2 className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6">
                <GraduationCap size={14} />
                {language === 'en' ? 'Education' : 'Formation'}
              </h2>
              <article className="glass border border-border rounded-2xl p-7">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {language === 'en' ? 'Computer Science — Database Management & Systems' : 'Informatique — Gestion de Bases de Données & Systèmes'}
                    </h3>
                    <p className="text-primary/70 text-sm font-medium">
                      {language === 'en' ? 'Academic Programme' : 'Programme Académique'}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-foreground/40 bg-foreground/5 px-3 py-1 rounded-full shrink-0">2021 – 2023</span>
                </div>
                <ul className="space-y-2 mt-4">
                  {(language === 'en'
                    ? [
                      'Database design: MCD/MLD relational modeling with MariaDB & MySQL',
                      'Algorithms, data structures, and object-oriented programming in Python',
                      'Low-level programming fundamentals in C++',
                      'Systems analysis and software architecture principles',
                    ]
                    : [
                      'Conception de bases de données : modélisation relationnelle MCD/MLD avec MariaDB & MySQL',
                      'Algorithmes, structures de données et programmation orientée objet en Python',
                      'Fondamentaux de programmation bas niveau en C++',
                      "Analyse des systèmes et principes d'architecture logicielle",
                    ]
                  ).map((pt, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/60 font-light">
                      <span className="text-primary mt-1.5 shrink-0" aria-hidden="true">▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.section>

            {/* ── Projects ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              aria-label="Projects"
            >
              <h2 className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6">
                <Code2 size={14} />
                {language === 'en' ? 'Projects' : 'Projets'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {projects.map((project) => (
                  <article key={project.title} className="glass border border-border rounded-2xl p-6 hover:border-primary/20 transition-all group">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                      <div className="flex gap-2">
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                          className="text-foreground/30 hover:text-primary transition-colors" aria-label={`Live demo — ${project.title}`}>
                          <ExternalLink size={14} />
                        </a>
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="text-foreground/30 hover:text-primary transition-colors" aria-label={`GitHub — ${project.title}`}>
                          <Github size={14} />
                        </a>
                      </div>
                    </div>
                    <p className="text-[10px] font-mono text-primary/60 mb-3 uppercase tracking-wider">{project.tech}</p>
                    <p className="text-sm text-foreground/50 leading-relaxed font-light">{project.desc}</p>
                  </article>
                ))}
              </div>
            </motion.section>

            {/* ── Skills ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              aria-label="Technical Skills"
            >
              <h2 className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6">
                <Terminal size={14} />
                {language === 'en' ? 'Technical Skills' : 'Compétences Techniques'}
              </h2>
              <div className="glass border border-border rounded-2xl p-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { icon: <Terminal size={15} />, label: language === 'en' ? 'Languages' : 'Langages', items: SKILLS.languages },
                    { icon: <Code2 size={15} />, label: 'Frontend', items: SKILLS.frontend },
                    { icon: <Database size={15} />, label: language === 'en' ? 'Backend & Data' : 'Backend & Données', items: SKILLS.backend },
                    { icon: <GitBranch size={15} />, label: language === 'en' ? 'Tools' : 'Outils', items: SKILLS.tools },
                  ].map(group => (
                    <div key={group.label}>
                      <h3 className="flex items-center gap-2 text-xs font-bold text-foreground/50 uppercase tracking-widest mb-3">
                        <span className="text-primary">{group.icon}</span>
                        {group.label}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map(item => (
                          <span key={item} className="text-xs font-mono bg-foreground/5 border border-border rounded-lg px-3 py-1 text-foreground/70">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* ── Currently learning ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              aria-label="Currently Learning"
              className="glass border border-primary/15 rounded-2xl p-7"
            >
              <h2 className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
                <Star size={14} />
                {language === 'en' ? 'Currently Learning' : "En cours d'apprentissage"}
              </h2>
              <div className="flex flex-wrap gap-3">
                {['Next.js', 'Docker', 'PostgreSQL', 'Jest (Testing)'].map(item => (
                  <span key={item} className="text-xs font-mono border border-primary/20 bg-primary/5 text-primary/80 rounded-lg px-3 py-1.5">
                    {item}
                  </span>
                ))}
              </div>
            </motion.section>

          </div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button
              asChild size="md"
              className="min-w-[180px] h-12 whitespace-nowrap rounded-full shadow-lg shadow-primary/20"
              rightIcon={<Download size={18} />}
            >
              <a href="#" onClick={(e) => { e.preventDefault(); alert(language === 'en' ? 'Upload your CV PDF to /public/atlas-cv.pdf and update this href.' : 'Uploadez votre CV PDF dans /public/atlas-cv.pdf et mettez à jour ce lien.'); }}>
                {language === 'en' ? 'Download PDF CV' : 'Télécharger CV PDF'}
              </a>
            </Button>
            <p className="text-xs text-foreground/30 mt-3 font-mono">
              {language === 'en'
                ? 'Place your CV PDF at /public/atlas-cv.pdf to enable the download'
                : 'Placez votre CV PDF dans /public/atlas-cv.pdf pour activer le téléchargement'}
            </p>
          </motion.div>

        </div>
      </div>
    </main>
  );
};
