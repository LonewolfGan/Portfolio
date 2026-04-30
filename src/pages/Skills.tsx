import React from 'react';
import { motion } from 'motion/react';
import { Database, Palette, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const getSkillGroups = (language: string) => [
  {
    title: language === 'en' ? "Languages" : "Langages",
    icon: <Terminal className="text-primary" size={24} />,
    skills: [
      { name: "Python", details: language === 'en' ? "Advanced OOP & System Automation" : "POO Avancée & Automatisation Système" },
      { name: "SQL", details: language === 'en' ? "MariaDB, MySQL, Implementation" : "MariaDB, MySQL, Implémentation" },
      { name: "TypeScript", details: language === 'en' ? "Strict Typing & React Ecosystem" : "Typage Strict & Écosystème React" },
      { name: "C++", details: language === 'en' ? "Embedded Systems & Low Level" : "Systèmes Embarqués & Bas Niveau" }
    ]
  },
  {
    title: language === 'en' ? "Modeling & Data" : "Modélisation & Données",
    icon: <Database className="text-primary" size={24} />,
    skills: [
      { name: language === 'en' ? "Database Design" : "Conception BD", details: "MCD / MLD Architectures" },
      { name: language === 'en' ? "System Design" : "Design Système", details: language === 'en' ? "Clean Application Logic" : "Logique d'Application Propre" },
      { name: "API Logic", details: language === 'en' ? "RESTful Patterns" : "Modèles RESTful" }
    ]
  },
  {
    title: language === 'en' ? "Design & UX" : "Design & UX",
    icon: <Palette className="text-primary" size={24} />,
    skills: [
      { name: language === 'en' ? "UI/UX Design" : "Design UI/UX", details: language === 'en' ? "Interface Architecture" : "Architecture d'Interface" },
      { name: language === 'en' ? "Minimalist Styling" : "Stylisme Minimaliste", details: language === 'en' ? "Visual Systems" : "Systèmes Visuels" },
      { name: language === 'en' ? "Asset Creation" : "Création d'Assets", details: language === 'en' ? "AI-Driven Professional Assets" : "Assets Professionnels IA" }
    ]
  },
  {
    title: language === 'en' ? "Frameworks & Tools" : "Frameworks & Outils",
    icon: <ShieldCheck className="text-primary" size={24} />,
    skills: [
      { name: "React 18", details: language === 'en' ? "Modern Hook-based Workflows" : "Workflows Modernes basés sur les Hooks" },
      { name: "Node.js", details: language === 'en' ? "Express & Backend Services" : "Express & Services Backend" },
      { name: "Tailwind CSS", details: language === 'en' ? "Utility-First Styling" : "Stylisme Utility-First" }
    ]
  }
];

export const Skills: React.FC = () => {
  const { language } = useLanguage();
  const SKILL_GROUPS = getSkillGroups(language);

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-clash text-4xl md:text-6xl font-medium tracking-tight mb-6 text-foreground"
          >
            {language === 'en' ? "Technical Stack" : "Stack Technique"}
          </motion.h2>
          <p className="text-foreground/50 text-lg leading-relaxed font-light">
            {language === 'en' 
              ? "A focused overview of my core technical pillars, from foundational logic to modern frontend implementation." 
              : "Un aperçu ciblé de mes piliers techniques, de la logique fondamentale à l'implémentation frontend moderne."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_GROUPS.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 rounded-[32px] border border-border relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                {React.cloneElement(group.icon as React.ReactElement, { size: 120 })}
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {group.icon}
                </div>
                <h3 className="text-2xl font-bold font-clash text-foreground tracking-tight">{group.title}</h3>
              </div>

              <div className="space-y-6">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1 border-l-2 border-border pl-6 hover:border-primary/40 transition-colors">
                    <h4 className="text-foreground font-semibold tracking-wide uppercase text-xs">{skill.name}</h4>
                    <p className="text-foreground/40 text-sm font-light">{skill.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Philosophy */}
        <div className="mt-24 glass p-12 rounded-[40px] border border-border text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
           <Layers className="mx-auto mb-6 text-primary/40" size={40} />
           <h3 className="text-2xl font-display font-clash text-foreground mb-4">
             {language === 'en' ? 'The Logic-First Architecture' : 'L\'Architecture Orientée Logique'}
           </h3>
           <p className="max-w-2xl mx-auto text-foreground/50 leading-relaxed font-light">
             {language === 'en' 
               ? "I prioritize the underlying structure and modularity of code. For me, every tool selected must reinforce the industrial-grade integrity of the application."
               : "Je privilégie la structure sous-jacente et la modularité du code. Pour moi, chaque outil sélectionné doit renforcer l'intégrité de niveau industriel de l'application."}
           </p>
        </div>
      </div>
    </section>
  );
};
