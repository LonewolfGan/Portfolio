import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Layout, Server, Globe, Sparkles, Code2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TechMarquee } from '../components/TechMarquee';
import { SEO } from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const getFeaturedProjects = (language: string) => [
  {
    title: "Quoter",
    description: language === 'en'
      ? "React + Redux Toolkit app for browsing and saving quotes with smooth state transitions."
      : "Application React + Redux Toolkit pour parcourir et sauvegarder des citations avec des transitions d'état fluides.",
    image: "/quoter.webp",
    tags: ["React", "Redux", "Tailwind"],
    link: "https://quoter-ebon.vercel.app/",
  },
  {
    title: "Cinemate",
    description: language === 'en'
      ? "Movie discovery platform with real-time TMDB search, lazy-loaded images and local storage caching."
      : "Plateforme de découverte de films avec recherche TMDB en temps réel et mise en cache locale.",
    image: "/cinemate.webp",
    tags: ["React", "TMDB API", "Framer Motion"],
    link: "https://cinematelone.netlify.app/",
  },
  {
    title: "X-Files Archive",
    description: language === 'en'
      ? "Secure PHP file archive with encrypted metadata search and a moody minimalist UI."
      : "Archive de fichiers PHP sécurisée avec recherche de métadonnées chiffrée et UI minimaliste.",
    image: "/xfiles.webp",
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
    if (signatureRef.current) {
      gsap.fromTo(
        signatureRef.current,
        { opacity: 0, y: 30, skewX: -10, filter: 'blur(8px)' },
        { 
          opacity: 1, 
          y: 0, 
          skewX: 0, 
          filter: 'blur(0px)', 
          duration: 1.8, 
          ease: 'expo.out', 
          delay: 0.4,
          force3D: true 
        }
      );
    }

    gsap.from('.service-card', {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 1.2,
      ease: 'expo.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 90%',
        once: true,
      },
      force3D: true
    });

    gsap.from('.project-card', {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 1.3,
      ease: 'expo.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 90%',
        once: true,
      },
      force3D: true
    });

    gsap.from('.learning-item', {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 1.1,
      ease: 'expo.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.learning-section',
        start: 'top 90%',
        once: true,
      },
      force3D: true
    });
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col">
      <SEO page="home" />

      {/* ── Hero ── */}
      <section
        aria-label="Hero"
        className="grain relative overflow-hidden bg-background mb-12"
        style={{ height: 'calc(100vh - 5rem)', minHeight: 560 }}
      >
        <div
          className="hidden sm:block absolute top-0 right-0 h-full"
          style={{ width: '58%', zIndex: 0 }}
        >
          <img
            src="/profile.webp"
            alt="TCHOHLO K. Honore — Junior Full-Stack Developer"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 20%' }}
            fetchPriority="high"
          />
          {/* Overlay — dark mode only */}
          <div className="absolute inset-0 hidden dark:block dark:bg-black/35" style={{ zIndex: 1 }} />
          {/* Left edge: fades photo into page background */}
          <div
            className="hidden dark:block absolute inset-y-0 left-0"
            style={{
              width: '38%',
              zIndex: 2,
              background: 'linear-gradient(to right, var(--color-background) 0%, transparent 100%)',
            }}
          />
          {/* Top edge: dark mode only */}
          <div
            className="hidden dark:block absolute inset-x-0 top-0"
            style={{
              height: '20%',
              zIndex: 2,
              background: 'linear-gradient(to bottom, var(--color-background) 0%, transparent 100%)',
            }}
          />
          {/* Bottom edge: always visible */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '30%',
              zIndex: 2,
              background: 'linear-gradient(to top, var(--color-background) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* ── Main text content — left column ── */}
        <div
          className="relative h-full flex flex-col justify-start pt-[12vh] pl-6 pr-6 sm:pl-[7%] lg:pl-[9%] z-10 w-full sm:max-w-[68%]"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-foreground/50 text-xl md:text-2xl mb-2 font-normal will-change-transform"
          >
            {language === 'en' ? "Hey, I'm" : 'Salut, je suis'}
          </motion.p>

          <h1 className="font-display font-bold font-clash text-foreground leading-none mb-4">
            <span
              ref={signatureRef}
              className="block text-[clamp(4rem,10vw,9rem)] leading-none tracking-tight will-change-transform"
            >
              Honore
            </span>
            <span className="block text-xl md:text-2xl lg:text-3xl font-medium text-foreground/60 mt-3 leading-snug max-w-sm">
              {t('hero.title.part2')}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-foreground/45 max-w-xs font-light leading-relaxed mb-5 will-change-transform"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3 mb-5 will-change-transform"
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

          {/* ── Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-8 pt-2 will-change-transform"
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
        </div>

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
              { title: t('services.card3.title'), icon: <Globe className="text-primary" size={32} />, description: t('services.card3.desc') },
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
                    className="w-full h-full object-cover lg:grayscale lg:opacity-60 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-6">
                    <div className="lg:translate-y-4 lg:group-hover:translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
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
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-display font-clash font-bold text-foreground mb-8 will-change-transform"
          >
            {t('home.contact.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-foreground/50 max-w-xl mx-auto mb-12 font-light leading-relaxed will-change-transform"
          >
            {t('home.contact.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center will-change-transform"
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
