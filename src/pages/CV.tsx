import React from 'react';
import { motion } from 'motion/react';
import {
  Download, Mail, Github, Linkedin, MapPin, Phone,
  Code2, Database, GitBranch, Terminal, ExternalLink, GraduationCap, Briefcase, Star
} from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

const SKILLS = {
  languages: ['JavaScript / TypeScript', 'Python', 'SQL (MariaDB, MySQL)', 'PHP', 'C++'],
  frontend: ['React 19', 'Tailwind CSS v4', 'Framer Motion', 'Three.js', 'GSAP', 'Redux Toolkit'],
  backend: ['Node.js / Express', 'Flask', 'REST APIs', 'Database Modeling'],
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
    tech: 'SQL · Node.js · Multi-Page Logic',
    desc: language === 'en'
      ? 'Robust cart system with a comprehensive relational database schema ensuring industrial-grade data integrity across multiple tables.'
      : "Système de panier robuste avec schéma relationnel complet garantissant l'intégrité des données entre plusieurs tables.",
    link: 'https://ecomat.netlify.app/products',
    github: 'https://github.com/LonewolfGan/E-commerce_sample',
  },
];

const getExperience = (language: string) => [
  {
    period: '2025',
    role: language === 'en' ? 'Web Development Intern' : 'Stagiaire Développement Web',
    org: 'Weblinking',
    points: language === 'en'
      ? [
        'Developed and customized WordPress websites based on responsive UI mockups',
        'Configured themes and plugins while optimizing website performance and SEO',
        'Improved user experience and maintained clean, scalable website structures',
      ]
      : [
        'Développement et personnalisation de sites WordPress basés sur des maquettes UI responsives',
        'Configuration de thèmes et plugins avec optimisation des performances et du SEO',
        "Amélioration de l'expérience utilisateur et maintenance de structures de site propres et évolutives",
      ],
  },
  {
    period: '2024 – Present',
    role: language === 'en' ? 'Full-Stack Developer' : 'Développeur Full-Stack',
    org: language === 'en' ? 'Personal Projects' : 'Projets personnels',
    points: language === 'en'
      ? [
        'Designed and developed multiple full-stack web applications using React, Node.js, PHP, and SQL',
        'Built responsive user interfaces with focus on performance, usability, and clean design',
        'Implemented REST APIs, authentication systems, and database architectures',
        'Deployed projects using modern hosting platforms and version control workflows with Git/GitHub',
      ]
      : [
        'Conception et développement de plusieurs applications web full-stack avec React, Node.js, PHP et SQL',
        "Création d'interfaces utilisateurs responsives axées sur les performances, l'ergonomie et le design épuré",
        'Implémentation des APIs REST, systèmes d\'authentification et architectures de base de données',
        'Déploiement via des plateformes modernes et workflows de contrôle de version avec Git/GitHub',
      ],
  },
  {
    period: '2023 – Present',
    role: language === 'en' ? 'Independent Research & Development' : 'Recherche & Développement Indépendant',
    org: language === 'en' ? 'Personal Lab' : 'Lab Personnel',
    points: language === 'en'
      ? [
        'Developed a facial recognition authentication system using Python, OpenCV, Flask, and React',
        'Explored interactive 3D web experiences with Three.js and WebGL',
        'Built secure archive and file management systems with custom encryption and metadata handling using PHP and MySQL',
      ]
      : [
        "Développement d'un système d'authentification par reconnaissance faciale avec Python, OpenCV, Flask et React",
        'Exploration des expériences web 3D interactives avec Three.js and WebGL',
        'Création de systèmes d\'archives sécurisés avec chiffrement personnalisé et gestion des métadonnées via PHP et MySQL',
      ],
  },
];

export const CV: React.FC = () => {
  const { t, language } = useLanguage();
  const projects = getProjects(language);
  const experience = getExperience(language);

  return (
    <main>
      <SEO page="cv" />

      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* ── Header ── */}
          <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
                Curriculum Vitae
              </p>
              <h1 className="text-4xl md:text-6xl font-display font-clash font-bold text-foreground leading-none mb-4">
                TCHOHLO<br /><span className="text-gradient font-serif italic font-normal">K. Honore</span>
              </h1>
              <p className="text-lg text-foreground/65 font-light">
                {language === 'en' ? 'Junior Full-Stack Developer' : 'Développeur Full-Stack Junior'}
              </p>

              <address className="flex flex-wrap gap-4 mt-6 not-italic">
                {[
                  { icon: <Mail size={13} />, label: 'atlaslonewolf00@gmail.com', href: 'mailto:atlaslonewolf00@gmail.com' },
                  { icon: <Github size={13} />, label: 'github.com/LonewolfGan', href: 'https://github.com/LonewolfGan' },
                  { icon: <Linkedin size={13} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/h-dev' },
                  { icon: <Phone size={13} />, label: '+212 706 135 005', href: 'https://wa.me/212706135005' },
                  { icon: <MapPin size={13} />, label: t('about.location.value'), href: null },
                ].map(item => (
                  item.href
                    ? <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-primary sm:text-foreground/65 sm:hover:text-primary transition-colors">
                      <span className="text-primary">{item.icon}</span>{item.label}
                    </a>
                    : <span key={item.label} className="flex items-center gap-1.5 text-xs font-mono text-primary sm:text-foreground/65">
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
                <a href="/cv.pdf" download="Honore-CV.pdf">
                  {language === 'en' ? 'Download PDF' : 'Télécharger PDF'}
                </a>
              </Button>
            </div>
          </motion.header>

          <div className="space-y-12">

            {/* ── Summary ── */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                      <span className="text-xs font-mono text-foreground/60 bg-foreground/5 px-3 py-1 rounded-full shrink-0">{exp.period}</span>
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
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              aria-label="Education"
            >
              <h2 className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6">
                <GraduationCap size={14} />
                {language === 'en' ? 'Education' : 'Formation'}
              </h2>
              <div className="space-y-6">
                <article className="glass border border-border rounded-2xl p-7">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {language === 'en' ? 'Computer Science Engineering — Information Systems Management & Governance' : 'Génie Informatique — Management & Gouvernance des Systèmes d\'Information'}
                      </h3>
                      <p className="text-primary/70 text-sm font-medium">ENSIASD</p>
                    </div>
                    <span className="text-xs font-mono text-foreground/60 bg-foreground/5 px-3 py-1 rounded-full shrink-0">2025 – Present</span>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {(language === 'en'
                      ? [
                        'Engineering curriculum focused on information systems, software architecture, databases, and digital governance',
                        'Developing advanced skills in full-stack web development, system design, and project management',
                        'Working on practical software engineering and business-oriented IT projects',
                      ]
                      : [
                        'Cursus d\'ingénierie axé sur les systèmes d\'information, l\'architecture logicielle, les bases de données et la gouvernance digitale',
                        'Développement de compétences avancées en développement web full-stack, conception de systèmes et gestion de projet',
                        'Réalisation de projets pratiques en ingénierie logicielle et informatique orientée business',
                      ]
                    ).map((pt, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/60 font-light">
                        <span className="text-primary mt-1.5 shrink-0" aria-hidden="true">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
                <article className="glass border border-border rounded-2xl p-7">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {language === 'en' ? 'DEUG in Mathematics & Computer Science' : 'DEUG en Mathématiques & Informatique'}
                      </h3>
                      <p className="text-primary/70 text-sm font-medium">Faculté des Sciences d\'Agadir</p>
                    </div>
                    <span className="text-xs font-mono text-foreground/60 bg-foreground/5 px-3 py-1 rounded-full shrink-0">2023 – 2025</span>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {(language === 'en'
                      ? [
                        'Studied algorithms, data structures, object-oriented programming, and database systems',
                        'Built strong foundations in mathematics, programming logic, and software development',
                        'Worked with technologies such as Java, PHP, Python, SQL, and web development tools',
                      ]
                      : [
                        'Étude des algorithmes, structures de données, programmation orientée objet et systèmes de bases de données',
                        'Construction de bases solides en mathématiques, logique de programmation et développement logiciel',
                        'Maîtrise des technologies Java, PHP, Python, SQL et outils de développement web',
                      ]
                    ).map((pt, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/60 font-light">
                        <span className="text-primary mt-1.5 shrink-0" aria-hidden="true">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </motion.section>

            {/* ── Projects ── */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                    <p className="text-sm text-foreground/65 leading-relaxed font-light">{project.desc}</p>
                  </article>
                ))}
              </div>
            </motion.section>

            {/* ── Skills ── */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                      <h3 className="flex items-center gap-2 text-xs font-bold text-foreground/65 uppercase tracking-widest mb-3">
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
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              <a href="/cv.pdf" download="Honore-CV.pdf">
                {language === 'en' ? 'Download PDF CV' : 'Télécharger CV PDF'}
              </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default CV;
