import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Layout, Server, Database, Sparkles, Code2, GitBranch, Star } from 'lucide-react';

import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DEV_IMAGE = "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=900&auto=format&fit=crop";

const getFeaturedProjects = (language: string) => [
  {
    title: "Quoter",
    description: language === 'en'
      ? "React + Redux Toolkit app for browsing and saving quotes with smooth state transitions."
      : "Application React + Redux Toolkit pour parcourir et sauvegarder des citations avec des transitions d'état fluides.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1024&auto=format&fit=crop",
    tags: ["React", "Redux", "Tailwind"],
    link: "https://quoter-ebon.vercel.app/",
  },
  {
    title: "Cinemate",
    description: language === 'en'
      ? "Movie discovery platform with real-time TMDB search, lazy-loaded images and local storage caching."
      : "Plateforme de découverte de films avec recherche TMDB en temps réel et mise en cache locale.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1024&auto=format&fit=crop",
    tags: ["React", "TMDB API", "Framer Motion"],
    link: "https://cinematelone.netlify.app/",
  },
  {
    title: "X-Files Archive",
    description: language === 'en'
      ? "Secure PHP file archive with encrypted metadata search and a moody minimalist UI."
      : "Archive de fichiers PHP sécurisée avec recherche de métadonnées chiffrée et UI minimaliste.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1024&auto=format&fit=crop",
    tags: ["PHP", "MySQL", "Security"],
    link: "https://hdev.great-site.net",
  },
];

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLSpanElement>(null);
  const FEATURED_PROJECTS = getFeaturedProjects(language);

  useGSAP(() => {
    if (signatureRef.current) {
      gsap.fromTo(
        signatureRef.current,
        { opacity: 0, y: 20, skewX: -20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, skewX: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out', delay: 0.5 }
      );
    }
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-12 bg-background">
        <div className="max-w-7xl w-full mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full pt-10 pb-20">

          {/* Left: intro */}
          <div className="flex flex-col items-start text-left justify-center h-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full"
            >
              <Sparkles size={12} className="text-primary" />
              <span className="text-[10px] font-mono font-medium text-primary uppercase tracking-[0.2em]">{t('hero.tagline')}</span>
            </motion.div>

            <h1 className="font-display font-bold font-clash tracking-tighter leading-[1.05] text-foreground">
              <div className="overflow-hidden">
                <span className="block text-4xl md:text-7xl lg:text-8xl">
                  {language === 'en' ? "Hi, I'm " : 'Salut, je suis '}
                  <span ref={signatureRef} className="text-gradient font-serif italic inline-block font-normal">Atlas.</span>
                </span>
              </div>
              <div className="overflow-hidden mt-4">
                <span className="block text-3xl md:text-5xl text-foreground font-medium max-w-xl">
                  {t('hero.title.part2')}
                </span>
              </div>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-foreground/50 max-w-xl font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button asChild size="md" className="group justify-center" rightIcon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}>
                <Link to="/works">{t('hero.cta.primary')}</Link>
              </Button>
              <Button asChild variant="secondary" size="md" className="justify-center">
                <Link to="/about">{t('hero.cta.secondary')}</Link>
              </Button>
            </motion.div>

            {/* Quick stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-12 flex gap-8"
            >
              {[
                { value: '5+', label: language === 'en' ? 'Projects' : 'Projets' },
                { value: '3+', label: language === 'en' ? 'Languages' : 'Langages' },
                { value: '2+', label: language === 'en' ? 'Years Learning' : 'Ans d\'apprentissage' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold font-display text-foreground">{stat.value}</span>
                  <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: out-of-box image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative hidden lg:flex justify-center items-end h-full pb-16"
          >
            {/* Outer wrapper — large enough to contain the out-of-box elements */}
            <div className="relative w-[400px] h-[520px]">

              {/* "Open to work" pill — floats above the card frame (out of box top) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="absolute top-0 left-8 z-30 glass border border-primary/30 px-4 py-2 rounded-full shadow-xl flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[11px] font-mono text-foreground/70 uppercase tracking-widest">
                  {language === 'en' ? 'Open to work' : 'Disponible'}
                </span>
              </motion.div>

              {/* GitHub repos card — overlaps top-right corner of frame (out of box right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="absolute top-8 right-0 z-30 glass border border-border p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <GitBranch size={14} className="text-primary" />
                  <span className="text-[10px] font-mono text-foreground/50 uppercase tracking-wider">GitHub</span>
                </div>
                <p className="text-xl font-bold text-foreground">12+</p>
                <p className="text-[10px] text-foreground/40 font-mono">
                  {language === 'en' ? 'Public repos' : 'Dépôts publics'}
                </p>
              </motion.div>

              {/* Main card — starts below the pill so it appears "inside the box" */}
              <div className="absolute inset-x-0 bottom-0 top-[14%] rounded-3xl overflow-hidden glass border border-border shadow-2xl group">
                <img
                  src={DEV_IMAGE}
                  alt="Atlas — Junior Developer"
                  className="w-full h-[115%] object-cover object-top -translate-y-[6%] grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                {/* Terminal snippet overlay — bottom of card (inside box) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 font-mono text-xs z-10 bg-background/30 backdrop-blur-sm border-t border-border/40">
                  <div className="flex gap-1.5 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <p className="text-primary/90">
                    <span className="text-foreground/40">const </span>atlas
                    <span className="text-foreground/40"> = </span>
                    <span className="text-primary">new </span>
                    Developer
                    <span className="text-foreground/40">();</span>
                  </p>
                  <p className="text-foreground/30 mt-0.5">// building the future, one commit at a time</p>
                </div>
              </div>

              {/* Stack badge — overlaps the bottom-left corner of the card (out of box left-bottom) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-6 left-0 z-30 glass border border-border px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2"
              >
                <Star size={13} className="text-primary shrink-0" />
                <span className="text-xs font-bold text-foreground">React</span>
                <span className="text-foreground/20 text-xs">•</span>
                <span className="text-xs font-bold text-foreground">Node</span>
                <span className="text-foreground/20 text-xs">•</span>
                <span className="text-xs font-bold text-foreground">SQL</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 cursor-pointer group"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-foreground/40 group-hover:text-primary transition-colors">
            {language === 'en' ? 'Scroll' : 'Défiler'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border border-border group-hover:border-primary/50 flex justify-center pt-2 transition-colors"
          >
            <motion.div
              animate={{ height: [4, 8, 4], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 px-6 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-clash font-medium text-foreground mb-6">{t('services.title')}</h2>
              <p className="text-foreground/50 text-lg">{t('services.subtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('services.card1.title'), icon: <Server className="text-primary" size={32} />, description: t('services.card1.desc') },
              { title: t('services.card2.title'), icon: <Layout className="text-primary" size={32} />, description: t('services.card2.desc') },
              { title: t('services.card3.title'), icon: <Database className="text-primary" size={32} />, description: t('services.card3.desc') },
            ].map((service, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl border border-border hover:border-primary/20 group transition-all">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">{service.title}</h3>
                <p className="text-foreground/50 leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack strip ── */}
      <section className="py-16 px-6 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/30 mb-10">
            {language === 'en' ? 'Technologies I work with' : 'Technologies avec lesquelles je travaille'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Tailwind CSS', 'Git', 'Express', 'Three.js', 'REST APIs'].map(tech => (
              <span key={tech} className="px-5 py-2 rounded-full glass border border-border text-sm font-mono text-foreground/60 hover:text-primary hover:border-primary/30 transition-all">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Work ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-clash font-medium text-foreground">{t('works.featured')}</h2>
            <Button asChild variant="ghost" className="text-primary hover:text-primary/80 min-w-[180px] h-12 whitespace-nowrap" rightIcon={<ArrowRight size={16} />}>
              <Link to="/works">{t('works.viewAll')}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {FEATURED_PROJECTS.map((project, idx) => (
              <div key={idx} className="flex flex-col gap-6 group">
                <div className="aspect-video rounded-3xl overflow-hidden glass border border-border relative cursor-pointer">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <Button asChild size="sm" className="rounded-full min-w-[130px] h-10 whitespace-nowrap">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          {language === 'en' ? 'View Project' : 'Voir le projet'}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">{project.title}</h3>
                  <p className="text-foreground/50 line-clamp-2 mb-4 font-light leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono border border-border rounded-full px-3 py-1 text-foreground/40 uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I'm learning now ── */}
      <section className="py-20 px-6 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="glass border border-border rounded-[40px] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-8">
              <Code2 size={20} className="text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">
                {language === 'en' ? 'Currently learning' : 'En cours d\'apprentissage'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Next.js', desc: language === 'en' ? 'Server-side rendering & full-stack React apps' : 'Rendu côté serveur & applications React complètes' },
                { title: 'Docker', desc: language === 'en' ? 'Containerising apps for reproducible deployments' : 'Conteneuriser les apps pour des déploiements reproductibles' },
                { title: 'PostgreSQL', desc: language === 'en' ? 'Advanced querying, indexing & data modeling' : 'Requêtes avancées, indexation & modélisation de données' },
              ].map(item => (
                <div key={item.title} className="flex flex-col gap-2 border-l-2 border-primary/20 pl-6">
                  <h4 className="text-foreground font-bold tracking-tight">{item.title}</h4>
                  <p className="text-foreground/40 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-32 px-6 border-t border-border bg-foreground/[0.01]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-mono font-medium text-primary uppercase tracking-[0.2em]">
              {language === 'en' ? 'Available for junior roles & freelance' : 'Disponible pour postes juniors & freelance'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-clash font-bold text-foreground tracking-tight mb-8"
          >
            {t('home.contact.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/50 max-w-xl mx-auto mb-12 font-light leading-relaxed"
          >
            {t('home.contact.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild size="md" className="rounded-full shadow-lg shadow-primary/20">
              <Link to="/about#contact">{t('home.contact.cta')}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
