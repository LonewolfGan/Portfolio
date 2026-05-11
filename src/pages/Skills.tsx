import React from 'react';
import { motion } from 'motion/react';
import { Database, Palette, Terminal, Layers, GitBranch, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

const getSkillGroups = (language: string) => [
  {
    title: language === 'en' ? 'Languages' : 'Langages',
    icon: <Terminal className="text-primary" size={24} />,
    skills: [
      { name: 'JavaScript / TypeScript', details: language === 'en' ? 'ES6+, async/await, type-safe React' : 'ES6+, async/await, React typé' },
      { name: 'Python', details: language === 'en' ? 'OOP, scripting, Flask APIs, OpenCV' : 'POO, scripts, APIs Flask, OpenCV' },
      { name: 'SQL', details: language === 'en' ? 'MariaDB, MySQL, relational design' : 'MariaDB, MySQL, conception relationnelle' },
      { name: 'PHP', details: language === 'en' ? 'Server-side logic, file handling' : 'Logique serveur, gestion de fichiers' },
      { name: 'C++', details: language === 'en' ? 'Fundamentals, embedded systems basics' : 'Fondamentaux, bases systèmes embarqués' },
    ],
  },
  {
    title: language === 'en' ? 'Frontend' : 'Frontend',
    icon: <Palette className="text-primary" size={24} />,
    skills: [
      { name: 'React 19', details: language === 'en' ? 'Hooks, Context, React Router, Redux Toolkit' : 'Hooks, Context, React Router, Redux Toolkit' },
      { name: 'WordPress', details: language === 'en' ? 'Custom themes, plugins, ACF, WooCommerce' : 'Thèmes sur mesure, plugins, ACF, WooCommerce' },
      { name: 'Tailwind CSS', details: language === 'en' ? 'Utility-first, responsive, dark mode' : 'Utility-first, responsive, dark mode' },
      { name: 'Framer Motion', details: language === 'en' ? 'Animations, page transitions' : 'Animations, transitions de pages' },
      { name: 'Three.js', details: language === 'en' ? 'WebGL particle systems, 3D scenes' : 'Particules WebGL, scènes 3D' },
      { name: 'GSAP', details: language === 'en' ? 'Timeline animations, ScrollTrigger' : 'Animations en timeline, ScrollTrigger' },
    ],
  },
  {
    title: language === 'en' ? 'Backend & Data' : 'Backend & Données',
    icon: <Database className="text-primary" size={24} />,
    skills: [
      { name: 'Node.js / Express', details: language === 'en' ? 'REST APIs, middleware, routing' : 'APIs REST, middleware, routage' },
      { name: 'Database Modeling', details: language === 'en' ? 'Relational schemas, normalization, integrity' : 'Schémas relationnels, normalisation, intégrité' },
      { name: 'REST API Integration', details: language === 'en' ? 'TMDB, third-party services, JSON' : 'TMDB, services tiers, JSON' },
      { name: 'Flask', details: language === 'en' ? 'Python microservices, image processing' : "Microservices Python, traitement d'images" },
    ],
  },
  {
    title: language === 'en' ? 'Tools & Workflow' : 'Outils & Workflow',
    icon: <GitBranch className="text-primary" size={24} />,
    skills: [
      { name: 'Git / GitHub', details: language === 'en' ? 'Version control, branches, pull requests' : 'Contrôle de version, branches, PRs' },
      { name: 'Vite', details: language === 'en' ? 'Fast bundling, HMR, module config' : 'Bundling rapide, HMR, config modules' },
      { name: 'VS Code', details: language === 'en' ? 'Extensions, debugger, workspace setup' : 'Extensions, débogueur, config workspace' },
      { name: 'Vercel / Netlify', details: language === 'en' ? 'CI/CD deployments, preview URLs' : "Déploiements CI/CD, URLs de preview" },
    ],
  },
];

const getLearning = (language: string) => [
  { name: 'Next.js', desc: language === 'en' ? 'SSR, App Router, full-stack React' : 'SSR, App Router, React full-stack' },
  { name: 'Docker', desc: language === 'en' ? 'Containerisation & reproducible builds' : "Conteneurisation & builds reproductibles" },
  { name: 'PostgreSQL', desc: language === 'en' ? 'Advanced SQL, indexing strategies' : "SQL avancé, stratégies d'indexation" },
  { name: 'Testing (Jest)', desc: language === 'en' ? 'Unit tests & TDD fundamentals' : 'Tests unitaires & bases TDD' },
];

export const Skills: React.FC = () => {
  const { language } = useLanguage();
  const SKILL_GROUPS = getSkillGroups(language);
  const LEARNING = getLearning(language);

  return (
    <main>
      <SEO page="skills" />

      <section aria-label="Technical Skills" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <header className="text-center max-w-3xl mx-auto mb-24">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display font-clash text-4xl md:text-6xl font-medium mb-6 text-foreground"
            >
              {language === 'en' ? 'Technical Stack' : 'Stack Technique'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-foreground/65 text-lg leading-relaxed font-light"
            >
              {language === 'en'
                ? "A practical overview of the tools and languages I use to build real projects — from React frontends to WordPress sites and backend APIs."
                : "Un aperçu pratique des outils et langages que j'utilise pour construire de vrais projets — des frontends React aux sites WordPress et APIs backend."}
            </motion.p>
          </header>

          {/* Skill groups grid — whileInView so they animate as they scroll into view */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_GROUPS.map((group, idx) => (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: idx * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="glass p-10 rounded-[32px] border border-border relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  {React.cloneElement(group.icon as React.ReactElement<{ size?: number }>, { size: 120 })}
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {group.icon}
                  </div>
                  <h2 className="text-2xl font-bold font-clash text-foreground">{group.title}</h2>
                </div>

                <div className="space-y-6">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-1 border-l-2 border-border pl-6 hover:border-primary/40 transition-colors">
                      <h3 className="text-foreground font-semibold tracking-wide uppercase text-xs">{skill.name}</h3>
                      <p className="text-foreground/60 text-sm font-light">{skill.details}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Currently learning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="mt-16 glass p-10 md:p-14 rounded-[40px] border border-border relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-3 mb-10">
              <Zap size={20} className="text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">
                {language === 'en' ? 'Currently learning' : "En cours d'apprentissage"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LEARNING.map(item => (
                <div key={item.name} className="flex flex-col gap-2">
                  <h3 className="text-foreground font-bold">{item.name}</h3>
                  <p className="text-foreground/60 text-sm font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="mt-10 glass p-12 rounded-[40px] border border-border text-center relative overflow-hidden"
          >
            <Layers className="mx-auto mb-6 text-primary/40" size={40} />
            <h2 className="text-2xl font-display font-clash text-foreground mb-4">
              {language === 'en' ? 'The Logic-First Approach' : "L'approche orientée logique"}
            </h2>
            <p className="max-w-2xl mx-auto text-foreground/65 leading-relaxed font-light">
              {language === 'en'
                ? "I focus on understanding the fundamentals deeply before reaching for libraries. Every tool I add must solve a real problem — not just look impressive on a resume."
                : "Je me concentre sur une compréhension profonde des fondamentaux avant d'utiliser des bibliothèques. Chaque outil que j'ajoute doit résoudre un vrai problème — pas juste impressionner sur un CV."}
            </p>
          </motion.div>

        </div>
      </section>
    </main>
  );
};

export default Skills;
