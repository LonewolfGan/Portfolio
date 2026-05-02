import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Send, Briefcase, GraduationCap, MapPin, BookOpen } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

const ABOUT_IMAGE = "/atlas.png";

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      } else {
        setIsSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 6000);
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const experienceData = [
    {
      year: '2024–Now',
      role: language === 'en' ? 'Freelance Web Developer' : 'Développeur Web Freelance',
      company: language === 'en' ? 'Self-employed / Personal Projects' : 'Indépendant / Projets personnels',
      desc: language === 'en'
        ? 'Building full-stack web apps end-to-end: React frontends, Express/Node.js APIs, and relational SQL databases. Deployed on Vercel and Netlify.'
        : "Développement complet d'applications web : frontends React, APIs Express/Node.js, et bases de données SQL relationnelles. Déploiement sur Vercel et Netlify.",
    },
    {
      year: '2023',
      role: language === 'en' ? 'Creative Tech Exploration' : 'Exploration Tech Créative',
      company: language === 'en' ? 'Independent Experiments' : 'Expérimentations indépendantes',
      desc: language === 'en'
        ? 'Explored WebGL and Three.js through self-directed projects. Built a face recognition system with Python + OpenCV + Flask, serving results to a custom JS frontend.'
        : "Exploration de WebGL et Three.js via des projets auto-dirigés. Développement d'un système de reconnaissance faciale avec Python + OpenCV + Flask.",
    },
    {
      year: '2022',
      role: language === 'en' ? 'Computer Science Student' : 'Étudiant en Informatique',
      company: language === 'en' ? 'Academic Programme' : 'Programme Académique',
      desc: language === 'en'
        ? 'Mastered core CS fundamentals: algorithms, data structures, Python OOP, SQL database modeling (MCD/MLD), and low-level programming in C++.'
        : 'Maîtrise des fondamentaux CS : algorithmes, structures de données, POO Python, modélisation SQL (MCD/MLD), et programmation bas niveau en C++.',
    },
  ];

  const specs = [
    {
      icon: <BookOpen size={20} className="text-primary" />,
      title: language === 'en' ? 'Self-taught & Academic' : 'Autodidacte & Académique',
      desc: language === 'en'
        ? 'Combining a formal CS background with self-directed learning. I build real projects to solidify every concept — courses alone are not enough.'
        : "Combinaison d'une base CS formelle et d'apprentissage autonome. Je construis de vrais projets pour consolider chaque concept — les cours seuls ne suffisent pas.",
    },
    {
      icon: <Briefcase size={20} className="text-primary" />,
      title: language === 'en' ? 'Open to Junior Roles' : 'Ouvert aux postes Junior',
      desc: language === 'en'
        ? 'Actively seeking my first junior developer position or internship. Comfortable with code reviews, pair programming, and collaborative Git workflows.'
        : "À la recherche de mon premier poste de développeur junior ou stage. À l'aise avec les revues de code, la programmation en pair et les workflows Git collaboratifs.",
    },
    {
      icon: <GraduationCap size={20} className="text-primary" />,
      title: language === 'en' ? 'Always Growing' : 'Toujours en croissance',
      desc: language === 'en'
        ? 'Currently diving into Next.js, Docker, and PostgreSQL. I maintain a personal learning log and build a side project for every new concept I study.'
        : "En train d'approfondir Next.js, Docker et PostgreSQL. Je maintiens un journal d'apprentissage personnel et construis un projet annexe pour chaque concept étudié.",
    },
  ];

  return (
    <main>
      <title>About | Atlas Lonewolf</title>
      <meta name="description" content="About Atlas Lonewolf — junior full-stack developer building clean React interfaces and solid SQL backends." />

      <div className="flex flex-col">
        {/* ── Profile ── */}
        <section aria-label="Profile" className="py-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">

            {/* Photo */}
            <div className="lg:w-1/2 relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-primary/15 blur-[70px] -z-10 rounded-full scale-90" />
                {/* Rotated accent frame */}
                <div className="absolute inset-0 rounded-[56px] border-2 border-primary/20 rotate-3 scale-105 -z-10" />
                <div className="absolute inset-0 rounded-[56px] border border-primary/10 -rotate-2 scale-110 -z-10" />

                <div className="w-72 h-[22rem] md:w-96 md:h-[30rem] rounded-[48px] overflow-hidden shadow-2xl relative z-10">
                  <img
                    src={ABOUT_IMAGE}
                    alt="Atlas Lonewolf — Junior Full-Stack Developer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                  />
                  {/* Bottom name tag */}
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <p className="text-white font-display font-bold text-lg leading-none">Atlas Lonewolf</p>
                    <p className="text-white/60 text-xs font-mono uppercase tracking-widest mt-1">
                      {language === 'en' ? 'Full-Stack Developer' : 'Développeur Full-Stack'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bio */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <motion.h1
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-6xl font-display font-clash font-bold text-foreground"
              >
                {t('about.title')}<br />
                <span className="text-gradient font-serif italic font-normal">{t('about.logic')}</span>
              </motion.h1>

              <p className="text-lg text-foreground/60 leading-relaxed max-w-xl font-light">
                {t('about.bio')}
              </p>

              <div className="grid grid-cols-2 gap-6 mt-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-foreground/40 uppercase text-[10px] tracking-widest font-bold">
                    <MapPin size={12} /> {t('about.location')}
                  </div>
                  <span className="text-foreground font-medium">Remote / Global</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-foreground/40 uppercase text-[10px] tracking-widest font-bold">
                    <Briefcase size={12} /> {t('about.role')}
                  </div>
                  <span className="text-foreground font-medium">{t('about.role.value')}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Button asChild size="md" className="rounded-full justify-center min-w-[180px] h-12 whitespace-nowrap">
                  <a href="#contact">{t('about.contact')}</a>
                </Button>
                <Button asChild variant="outline" size="md" className="rounded-full w-12 h-12 min-w-0 p-0 text-foreground/40 hover:text-foreground shrink-0" aria-label="GitHub">
                  <a href="https://github.com/LonewolfGan" target="_blank" rel="noopener noreferrer">
                    <Github size={20} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Journey & Specialisations ── */}
        <section aria-label="Experience and Specialisations" className="py-24 px-6 bg-foreground/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

              {/* Timeline */}
              <div className="flex flex-col gap-12">
                <h2 className="flex items-center gap-4 text-2xl font-bold font-clash text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Briefcase size={20} /></div>
                  {t('about.experience.title')}
                </h2>
                <div className="space-y-12">
                  {experienceData.map((exp, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ delay: idx * 0.08, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex gap-8"
                    >
                      <div className="font-mono text-xs text-primary font-bold pt-1 shrink-0">{exp.year}</div>
                      <div className="flex-1">
                        <h3 className="text-foreground font-bold text-lg mb-1">{exp.role}</h3>
                        <p className="text-primary/70 text-sm font-medium mb-3">{exp.company}</p>
                        <p className="text-foreground/40 text-sm leading-relaxed font-light">{exp.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Specialisations */}
              <div className="flex flex-col gap-12">
                <h2 className="flex items-center gap-4 text-2xl font-bold font-clash text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><GraduationCap size={20} /></div>
                  {t('about.specializations.title')}
                </h2>
                <div className="glass p-10 rounded-[40px] border border-border space-y-8">
                  {specs.map(spec => (
                    <div key={spec.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        {spec.icon}
                      </div>
                      <div>
                        <h3 className="text-foreground font-bold mb-2">{spec.title}</h3>
                        <p className="text-foreground/40 text-sm leading-relaxed font-light">{spec.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" aria-label="Contact" className="py-32 px-6">
          <div className="max-w-5xl mx-auto glass rounded-[54px] p-8 md:p-20 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-20 relative z-10">
              <div className="lg:w-1/3 flex flex-col gap-8">
                <h2 className="text-4xl md:text-5xl font-display font-clash font-bold text-foreground leading-[1.1]">
                  {t('contact.title')}<br />
                  <span className="italic font-serif">{t('contact.future')}</span>
                </h2>
                <p className="text-foreground/40 font-light">{t('contact.subtitle')}</p>

                <address className="flex flex-col gap-6 mt-4 not-italic">
                  <a href="mailto:atlaslonewolf00@gmail.com" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/50 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      <Mail size={20} />
                    </div>
                    <span className="text-foreground/60 font-medium group-hover:text-foreground transition-colors">atlaslonewolf00@gmail.com</span>
                  </a>
                  <a href="https://www.linkedin.com/in/atlas-lonewolf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/50 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      <Linkedin size={20} />
                    </div>
                    <span className="text-foreground/60 font-medium group-hover:text-foreground transition-colors">linkedin.com/in/atlas-lonewolf</span>
                  </a>
                  <a href="https://github.com/LonewolfGan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/50 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      <Github size={20} />
                    </div>
                    <span className="text-foreground/60 font-medium group-hover:text-foreground transition-colors">github.com/LonewolfGan</span>
                  </a>
                </address>
              </div>

              <div className="lg:w-2/3">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-3xl border border-primary/20"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <Send size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {language === 'en' ? 'Message Sent!' : 'Message Envoyé !'}
                    </h3>
                    <p className="text-foreground/50 max-w-xs">
                      {language === 'en'
                        ? "Thank you for reaching out. I'll reply within 24 hours."
                        : "Merci de m'avoir contacté. Je répondrai sous 24 heures."}
                    </p>
                    <Button variant="ghost" className="mt-8 text-primary" onClick={() => setIsSuccess(false)}>
                      {language === 'en' ? 'Send another' : 'Envoyer un autre'}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-3">
                        <label htmlFor="name" className="text-[10px] font-bold text-foreground/30 uppercase tracking-[.2em] ml-2">{t('contact.name')}</label>
                        <input
                          required id="name" type="text" placeholder="John Doe"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="bg-foreground/5 border border-border rounded-2xl p-5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="text-[10px] font-bold text-foreground/30 uppercase tracking-[.2em] ml-2">{t('contact.email')}</label>
                        <input
                          required id="email" type="email" placeholder="john@example.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="bg-foreground/5 border border-border rounded-2xl p-5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="message" className="text-[10px] font-bold text-foreground/30 uppercase tracking-[.2em] ml-2">{t('contact.message')}</label>
                      <textarea
                        required id="message" rows={5}
                        placeholder={language === 'en' ? 'Tell me about your project or opportunity...' : 'Parlez-moi de votre projet ou opportunité...'}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="bg-foreground/5 border border-border rounded-2xl p-5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      />
                    </div>
                    {errorMsg && (
                      <p className="text-red-500 text-sm px-1">{errorMsg}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="md"
                      className="rounded-2xl group min-w-[180px] h-12 whitespace-nowrap"
                      rightIcon={<Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    >
                      {isSubmitting ? t('contact.sending') : t('contact.send')}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
