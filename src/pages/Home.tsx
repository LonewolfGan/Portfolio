import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Layout, Server, Database, Sparkles, Code2, GitBranch, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Portrait for pop-out effect — swap src for your own 800×900px photo
const PORTRAIT = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=90&w=600&auto=format&fit=crop";

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
  const container    = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLSpanElement>(null);
  const heroRef      = useRef<HTMLElement>(null);
  const frameRef     = useRef<HTMLDivElement>(null);
  const personRef    = useRef<HTMLDivElement>(null);
  const FEATURED_PROJECTS = getFeaturedProjects(language);

  useGSAP(() => {
    // Signature entrance
    if (signatureRef.current) {
      gsap.fromTo(
        signatureRef.current,
        { opacity: 0, y: 20, skewX: -20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, skewX: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out', delay: 0.5 }
      );
    }

    // Subtle float on the person
    if (personRef.current) {
      gsap.to(personRef.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Mouse parallax — person moves ~2× faster than the frame for depth
    const hero = heroRef.current;
    if (!hero || !frameRef.current || !personRef.current) return;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const dx = ((e.clientX - left) / width  - 0.5) * 2; // -1 → 1
      const dy = ((e.clientY - top)  / height - 0.5) * 2;

      gsap.to(frameRef.current,  { x: dx * 8,  y: dy * 5,  duration: 1,   ease: 'power2.out', overwrite: 'auto' });
      gsap.to(personRef.current, { x: dx * 18, y: dy * 10, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
    };

    const onLeave = () => {
      gsap.to([frameRef.current, personRef.current], { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1,0.5)' });
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col">

      {/* ── Hero: exactly fills the viewport below the fixed 80px navbar ── */}
      <section
        ref={heroRef}
        className="relative flex flex-col bg-background overflow-hidden"
        style={{ height: 'calc(100vh - 5rem)' }}
      >
        {/* Grid content — fills space, leaving 72px at bottom for scroll indicator */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-6 min-h-0">

          {/* ── Left: intro ── */}
          <div className="flex flex-col items-start text-left justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full"
            >
              <Sparkles size={12} className="text-primary" />
              <span className="text-[10px] font-mono font-medium text-primary uppercase tracking-[0.2em]">{t('hero.tagline')}</span>
            </motion.div>

            <h1 className="font-display font-bold font-clash tracking-tighter leading-[1.05] text-foreground">
              <div className="overflow-hidden">
                <span className="block text-4xl md:text-6xl lg:text-7xl">
                  {language === 'en' ? "Hi, I'm " : 'Salut, je suis '}
                  <span ref={signatureRef} className="text-gradient font-serif italic inline-block font-normal">Atlas.</span>
                </span>
              </div>
              <div className="overflow-hidden mt-3">
                <span className="block text-2xl md:text-4xl lg:text-4xl text-foreground font-medium max-w-xl">
                  {t('hero.title.part2')}
                </span>
              </div>
            </h1>

            <p className="mt-5 text-base md:text-lg text-foreground/50 max-w-xl font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button
                asChild size="md"
                className="group justify-center min-w-[180px] h-12 whitespace-nowrap"
                rightIcon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              >
                <Link to="/works">{t('hero.cta.primary')}</Link>
              </Button>
              <Button
                asChild variant="secondary" size="md"
                className="justify-center min-w-[160px] h-12 whitespace-nowrap"
              >
                <Link to="/about">{t('hero.cta.secondary')}</Link>
              </Button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-8 flex gap-8"
            >
              {[
                { value: '5+', label: language === 'en' ? 'Projects' : 'Projets' },
                { value: '3+', label: language === 'en' ? 'Languages' : 'Langages' },
                { value: '2+', label: language === 'en' ? 'Yrs learning' : "Ans d'appr." },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold font-display text-foreground">{stat.value}</span>
                  <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3-Layer Pop-Out ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex justify-center items-center h-full"
          >
            {/*
              OUTER WRAPPER — overflow:visible so the head can escape the frame.
              Fixed size so nothing overflows the hero height.
            */}
            <div className="relative w-[300px]" style={{ height: 'min(440px, 68vh)' }}>

              {/* ── LAYER 0: ambient glow behind everything ── */}
              <div className="absolute inset-x-6 top-[28%] bottom-0 rounded-[32px] blur-3xl opacity-40 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 70%)' }} />

              {/* ── LAYER 1 (Background / The Box): glass card ── */}
              {/*   Starts at 24% from top → head will overflow above this line  */}
              <div
                ref={frameRef}
                className="absolute inset-x-0 bottom-0 rounded-[32px] glass shadow-2xl"
                style={{ top: '24%', border: '1px solid color-mix(in oklch, var(--color-primary) 18%, transparent)' }}
              />

              {/* ── LAYER 2 (Subject): portrait — head breaks above Layer 1 ── */}
              {/*   z-index > frame so person appears in front inside the box   */}
              {/*   No overflow:hidden here — the head is FREE above the frame  */}
              <div
                ref={personRef}
                className="absolute inset-x-6 top-0 bottom-[6%]"
                style={{ zIndex: 20 }}
              >
                <img
                  src={PORTRAIT}
                  alt="Atlas — Junior Developer"
                  className="w-full h-full object-cover object-top"
                  style={{ borderRadius: '24px 24px 28px 28px' }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* ── LAYER 3a: border ring — sits IN FRONT of the portrait ── */}
              {/*   Same geometry as Layer 1 but NO background — only the border  */}
              {/*   This border line appears to "trap" the person at the frame edge */}
              <div
                className="absolute inset-x-0 bottom-0 rounded-[32px] pointer-events-none"
                style={{
                  top: '24%',
                  zIndex: 30,
                  border: '1.5px solid color-mix(in oklch, var(--color-primary) 35%, transparent)',
                  boxShadow: 'inset 0 1px 0 color-mix(in oklch, white 8%, transparent)',
                }}
              />

              {/* ── LAYER 3b: bottom fade — blends feet into background ── */}
              {/*   Hides the image bottom; person appears to "stand" in the frame */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: '18%',
                  zIndex: 40,
                  background: 'linear-gradient(to top, var(--color-background) 30%, transparent 100%)',
                  borderRadius: '0 0 32px 32px',
                }}
              />

              {/* ── Floating UI chips (z above all layers) ── */}

              {/* "Open to work" pill — above the frame top edge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="absolute top-1 left-0 flex items-center gap-2 px-4 py-2 rounded-full shadow-xl"
                style={{
                  zIndex: 50,
                  background: 'color-mix(in oklch, var(--color-background) 70%, transparent)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid color-mix(in oklch, var(--color-primary) 30%, transparent)',
                }}
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[11px] font-mono text-foreground/70 uppercase tracking-widest">
                  {language === 'en' ? 'Open to work' : 'Disponible'}
                </span>
              </motion.div>

              {/* GitHub card — top-right, overlapping the frame corner */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="absolute top-[22%] -right-14 p-3 rounded-2xl shadow-xl"
                style={{
                  zIndex: 50,
                  background: 'color-mix(in oklch, var(--color-background) 80%, transparent)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid color-mix(in oklch, var(--color-border) 60%, transparent)',
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <GitBranch size={12} className="text-primary" />
                  <span className="text-[9px] font-mono text-foreground/50 uppercase tracking-wider">GitHub</span>
                </div>
                <p className="text-lg font-bold text-foreground leading-none">12+</p>
                <p className="text-[9px] text-foreground/40 font-mono mt-0.5">
                  {language === 'en' ? 'Public repos' : 'Dépôts publics'}
                </p>
              </motion.div>

              {/* Stack badge — bottom-left, peeking out of frame */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-[14%] -left-14 flex items-center gap-2 px-3 py-2 rounded-xl shadow-xl"
                style={{
                  zIndex: 50,
                  background: 'color-mix(in oklch, var(--color-background) 80%, transparent)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid color-mix(in oklch, var(--color-border) 60%, transparent)',
                }}
              >
                <Star size={12} className="text-primary shrink-0" />
                <span className="text-xs font-bold text-foreground">React</span>
                <span className="text-foreground/20 text-[10px]">•</span>
                <span className="text-xs font-bold text-foreground">Node</span>
                <span className="text-foreground/20 text-[10px]">•</span>
                <span className="text-xs font-bold text-foreground">SQL</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator — always visible at the bottom of the hero ── */}
        <div className="flex-none h-18 flex items-center justify-center pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-foreground/40 group-hover:text-primary transition-colors">
              {language === 'en' ? 'Scroll' : 'Défiler'}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-9 rounded-full border border-border group-hover:border-primary/50 flex justify-center pt-2 transition-colors"
            >
              <motion.div
                animate={{ height: [3, 7, 3], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
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
      <section className="py-16 px-6 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/30 mb-10">
            {language === 'en' ? 'Technologies I work with' : 'Technologies avec lesquelles je travaille'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Tailwind CSS', 'Git', 'Express', 'Three.js', 'REST APIs'].map(tech => (
              <span key={tech} className="px-5 py-2 rounded-full glass border border-border text-sm font-mono text-foreground/60 hover:text-primary hover:border-primary/30 transition-all cursor-default">
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

      {/* ── Currently learning ── */}
      <section className="py-20 px-6 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="glass border border-border rounded-[40px] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-8">
              <Code2 size={20} className="text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">
                {language === 'en' ? 'Currently learning' : "En cours d'apprentissage"}
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
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="md" className="rounded-full shadow-lg shadow-primary/20 min-w-[180px] h-12 whitespace-nowrap">
              <Link to="/about#contact">{t('home.contact.cta')}</Link>
            </Button>
            <Button asChild variant="outline" size="md" className="rounded-full min-w-[180px] h-12 whitespace-nowrap">
              <Link to="/cv">{language === 'en' ? 'View my CV' : 'Voir mon CV'}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
