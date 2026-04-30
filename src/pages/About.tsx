import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Send, Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const experienceData = [
    { 
      year: "2024", 
      role: language === 'en' ? "Junior Full-Stack Developer" : "Développeur Full-Stack Junior", 
      company: "Freelance / Personal Labs", 
      desc: language === 'en' ? "Developing end-to-end web applications with a focus on React, Node.js, and SQL integrity." : "Développement d'applications web de bout en bout axé sur React, Node.js et l'intégrité SQL." 
    },
    { 
      year: "2023", 
      role: language === 'en' ? "Creative Tech Exploration" : "Exploration Tech Créative", 
      company: "Independent Projects", 
      desc: language === 'en' ? "Deep dive into WebGL and Three.js through academic and personal experiments." : "Immersion dans WebGL et Three.js via des expériences académiques et personnelles." 
    },
    { 
      year: "2022", 
      role: language === 'en' ? "Computer Science Fundamentals" : "Fondamentaux Informatique", 
      company: "Academic Years", 
      desc: language === 'en' ? "Mastering Python, SQL modeling (MCD/MLD), and algorithmic base." : "Maîtrise de Python, de la modélisation SQL (MCD/MLD) et bases algorithmiques." 
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Profile Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="aspect-square rounded-[80px] overflow-hidden glass border-8 border-border relative z-10"
             >
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Atlas Lonewolf" 
                  className="w-full h-full object-cover grayscale brightness-75"
                  referrerPolicy="no-referrer"
                />
             </motion.div>
             <div className="absolute -bottom-10 -right-10 flex flex-col gap-4 z-20">
                <div className="glass p-6 rounded-3xl border border-border backdrop-blur-xl animate-bounce-slow">
                   <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-foreground font-mono text-xs uppercase tracking-widest">{language === 'en' ? 'Available Now' : 'Disponible'}</span>
                   </div>
                </div>
             </div>
             <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
          </div>

          <div className="lg:w-1/2 flex flex-col gap-8">
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-display font-clash font-bold text-foreground tracking-tight"
            >
              {t('about.title')} <br /> <span className="text-gradient font-serif italic font-normal">{t('about.logic')}</span>
            </motion.h2>
            <p className="text-lg text-foreground/50 leading-relaxed max-w-xl font-light">
              {t('about.bio')}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-4">
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
              <Button asChild size="md" className="rounded-full justify-center">
                <a href="#contact">{t('about.contact')}</a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="md" 
                className="rounded-full w-12 h-12 min-w-0 p-0 text-foreground/40 hover:text-foreground shrink-0"
                aria-label="GitHub Profile"
              >
                <a href="https://github.com/LonewolfGan" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Journey */}
      <section className="py-24 px-6 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Learning Path */}
            <div className="flex flex-col gap-12">
               <h3 className="flex items-center gap-4 text-2xl font-bold font-clash text-foreground tracking-tight">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Briefcase size={20} /></div>
                  {t('about.experience.title')}
               </h3>
               <div className="space-y-12">
                  {experienceData.map((exp, idx) => (
                    <div key={idx} className="flex gap-8 group">
                      <div className="font-mono text-xs text-primary font-bold pt-1">{exp.year}</div>
                      <div className="flex-1">
                        <h4 className="text-foreground font-bold text-lg mb-1">{exp.role}</h4>
                        <p className="text-primary/70 text-sm font-medium mb-3">{exp.company}</p>
                        <p className="text-foreground/40 text-sm leading-relaxed font-light">{exp.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Specializations */}
            <div className="flex flex-col gap-12">
               <h3 className="flex items-center gap-4 text-2xl font-bold font-clash text-foreground tracking-tight">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><GraduationCap size={20} /></div>
                  {t('about.specializations.title')}
               </h3>
               <div className="glass p-12 rounded-[40px] border border-border space-y-8">
                  <div className="flex flex-col gap-4">
                     <h4 className="text-foreground font-bold text-xl">{t('about.spec1.title')}</h4>
                     <p className="text-foreground/40 leading-relaxed font-light">{t('about.spec1.desc')}</p>
                  </div>
                  <div className="flex flex-col gap-4">
                     <h4 className="text-foreground font-bold text-xl">{t('about.spec2.title')}</h4>
                     <p className="text-foreground/40 leading-relaxed font-light">{t('about.spec2.desc')}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto glass rounded-[54px] p-8 md:p-20 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-20 relative z-10">
            <div className="lg:w-1/3 flex flex-col gap-8">
              <h2 className="text-4xl md:text-5xl font-display font-clash font-bold text-foreground tracking-tight leading-[1.1]">{t('contact.title')} <br /> <span className="italic font-serif">{t('contact.future')}</span></h2>
              <p className="text-foreground/40 font-light">{t('contact.subtitle')}</p>
              
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/50 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                    <Mail size={20} />
                  </div>
                  <span className="text-foreground/60 font-medium group-hover:text-foreground transition-colors">atlaslonewolf00@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/50 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                    <Linkedin size={20} />
                  </div>
                  <span className="text-foreground/60 font-medium group-hover:text-foreground transition-colors">LinkedIn Profile</span>
                </div>
              </div>
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
                      ? "Thank you for reaching out. I'll get back to you shortly." 
                      : "Merci de m'avoir contacté. Je vous répondrai sous peu."}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-8 text-primary" 
                    onClick={() => setIsSuccess(false)}
                  >
                    {language === 'en' ? 'Send another' : 'Envoyer un autre'}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <label htmlFor="name" className="text-[10px] font-bold text-foreground/30 uppercase tracking-[.2em] ml-2">{t('contact.name')}</label>
                      <input 
                        required
                        id="name"
                        type="text" 
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="bg-foreground/5 border border-border rounded-2xl p-5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="email" className="text-[10px] font-bold text-foreground/30 uppercase tracking-[.2em] ml-2">{t('contact.email')}</label>
                      <input 
                        required
                        id="email"
                        type="email" 
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="bg-foreground/5 border border-border rounded-2xl p-5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="message" className="text-[10px] font-bold text-foreground/30 uppercase tracking-[.2em] ml-2">{t('contact.message')}</label>
                    <textarea 
                      required
                      id="message"
                      rows={5}
                      placeholder={language === 'en' ? "Tell me about your project..." : "Parlez-moi de votre projet..."}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="bg-foreground/5 border border-border rounded-2xl p-5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    size="md" 
                    className="rounded-2xl group"
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
  );
};
