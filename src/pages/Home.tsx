import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Layout, Server, Database, Sparkles, Code2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { HeroImage } from '../components/HeroImage';
import { TechMarquee } from '../components/TechMarquee';

gsap.registerPlugin(ScrollTrigger);

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
  const FEATURED_PROJECTS = getFeaturedProjects(language);

  useGSAP(() => {
    // ── Signature entrance ──
    if (signatureRef.current) {
      gsap.fromTo(
        signatureRef.current,
        { opacity: 0, y: 20, skewX: -20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, skewX: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out', delay: 0.5 }
      );
    }

    // ── Service cards — staggered slide-up on scroll ──
    gsap.from('.service-card', {
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.85,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 82%',
        once: true,
      },
    });


    // ── Featured project cards — staggered slide-up ──
    gsap.from('.project-card', {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        once: true,
      },
    });

    // ── "Currently learning" section ──
    gsap.from('.learning-item', {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.learning-section',
        start: 'top 85%',
        once: true,
      },
    });
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col">
      {/* ── Page-level meta (React 19 hoists these to <head>) ── */}
      <title>Atlas Lonewolf | Junior Full-Stack Developer — Portfolio</title>
      <meta name="description" content="Atlas Lonewolf — Junior Full-Stack Developer. React, Node.js, SQL. Open to junior roles and freelance." />
      <meta property="og:title" content="Atlas Lonewolf | Junior Full-Stack Developer" />
      <meta property="og:description" content="Building clean interfaces & solid databases. Open to junior roles and freelance." />

      {/* ── Hero ── */}
      <section
        aria-label="Hero"
        className="grain relative overflow-hidden bg-background mb-12"
        style={{ height: 'calc(100vh - 5rem)', minHeight: 560 }}
      >
        {/* ── Full-height portrait — absolutely fills right side ── */}
        <div
          className="absolute top-0 right-0 h-full"
          style={{ width: '58%', zIndex: 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=90&w=900&auto=format&fit=crop"
            alt="Atlas — Junior Full-Stack Developer"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
          {/* Left edge: fades photo into page background */}
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: '55%',
              background: 'linear-gradient(to right, var(--color-background) 0%, transparent 100%)',
            }}
          />
          {/* Bottom edge: subtle fade */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '30%',
              background: 'linear-gradient(to top, var(--color-background) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* ── Main text content — left column ── */}
        <div
          className="relative h-full flex flex-col justify-center px-6 lg:px-16 z-10"
          style={{ maxWidth: '52%' }}
        >
          {/* Mobile only tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5 inline-flex lg:hidden items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full self-start"
          >
            <Sparkles size={12} className="text-primary" />
            <span className="text-[10px] font-mono font-medium text-primary uppercase tracking-[0.2em]">{t('hero.tagline')}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif italic text-foreground/50 text-xl md:text-2xl mb-2 font-normal"
          >
            {language === 'en' ? "Hey, I'm" : 'Salut, je suis'}
          </motion.p>

          <h1 className="font-display font-bold font-clash text-foreground leading-none mb-6">
            <span
              ref={signatureRef}
              className="block text-[clamp(4rem,10vw,9rem)] leading-none tracking-tight"
            >
              Atlas.
            </span>
            <span className="block text-xl md:text-2xl lg:text-3xl font-medium text-foreground/60 mt-3 leading-snug max-w-sm">
              {t('hero.title.part2')}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-sm md:text-base text-foreground/45 max-w-xs font-light leading-relaxed mb-8"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              asChild size="md"
              className="group justify-center min-w-[160px] h-11 whitespace-nowrap"
              rightIcon={<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            >
              <Link to="/works">{t('hero.cta.primary')}</Link>
            </Button>
            <Button
              asChild variant="secondary" size="md"
              className="justify-center min-w-[160px] h-11 whitespace-nowrap"
            >
              <Link to="/about">{t('hero.cta.secondary')}</Link>
            </Button>
          </motion.div>
        </div>

        {/* ── Bottom stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="absolute bottom-8 left-6 lg:left-16 flex gap-10 z-10"
        >
          {[
            { value: '5+', label: language === 'en' ? 'Projects' : 'Projets' },
            { value: '3+', label: language === 'en' ? 'Languages' : 'Langages' },
            { value: '2+', label: language === 'en' ? 'Yrs learning' : "Ans d'appr." },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-2xl font-bold font-display text-foreground">{stat.value}</span>
              <span className="text-[9px] font-mono text-foreground/35 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 cursor-pointer group z-10"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-foreground/30 group-hover:text-primary transition-colors">
            {language === 'en' ? 'Scroll' : 'Défiler'}
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-border/50 group-hover:border-primary/40 flex justify-center pt-1.5 transition-colors"
          >
            <motion.div
              animate={{ height: [3, 6, 3], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Services ── */}
      <section aria-label="Services" className="py-24 px-6 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-clash font-medium text-foreground mb-6">{t('services.title')}</h2>
              <p className="text-foreground/50 text-lg">{t('services.subtitle')}</p>
            </div>
          </div>

          <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('services.card1.title'), icon: <Server className="text-primary" size={32} />, description: t('services.card1.desc') },
              { title: t('services.card2.title'), icon: <Layout className="text-primary" size={32} />, description: t('services.card2.desc') },
              { title: t('services.card3.title'), icon: <Database className="text-primary" size={32} />, description: t('services.card3.desc') },
            ].map((service, idx) => (
              <article key={idx} className="service-card glass p-8 rounded-3xl border border-border hover:border-primary/20 group transition-all">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-foreground/50 leading-relaxed font-light">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack infinite marquee ── */}
      <TechMarquee language={language} />

      {/* ── Featured Work ── */}
      <section aria-label="Featured Projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-clash font-medium text-foreground">{t('works.featured')}</h2>
            <Button asChild variant="ghost" className="text-primary hover:text-primary/80 min-w-[180px] h-12 whitespace-nowrap" rightIcon={<ArrowRight size={16} />}>
              <Link to="/works">{t('works.viewAll')}</Link>
            </Button>
          </div>

          <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {FEATURED_PROJECTS.map((project, idx) => (
              <article key={idx} className="project-card flex flex-col gap-6 group">
                <div className="aspect-video rounded-3xl overflow-hidden glass border border-border relative cursor-pointer">
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title} project`}
                    loading="lazy"
                    decoding="async"
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
                  <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-foreground/50 line-clamp-2 mb-4 font-light leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono border border-border rounded-full px-3 py-1 text-foreground/40 uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Currently learning ── */}
      <section aria-label="Currently Learning" className="learning-section py-20 px-6 bg-foreground/[0.02]">
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
                <div key={item.title} className="learning-item flex flex-col gap-2 border-l-2 border-primary/20 pl-6">
                  <h4 className="text-foreground font-bold">{item.title}</h4>
                  <p className="text-foreground/40 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section aria-label="Contact" className="py-32 px-6 border-t border-border bg-foreground/[0.01]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-clash font-bold text-foreground mb-8"
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
