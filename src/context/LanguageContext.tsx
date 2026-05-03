import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.works': 'Works',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    // Hero
    'hero.tagline': 'Building Tomorrow • Junior Dev',
    'hero.title.part1': "Hi, I'm Atlas.",
    'hero.title.part2': 'I build clean interfaces & powerful websites.',
    'hero.subtitle': 'Junior Full-Stack Dev with a focus on React, Node.js and WordPress. I love minimalist design and solving complex problems.',
    'hero.cta.primary': 'View my projects',
    'hero.cta.secondary': "Let's talk",
    // Services/Expertise
    'services.title': 'Learning Path & Core Skills',
    'services.subtitle': 'Building a strong foundation in modern engineering through dedicated practice and academic rigor.',
    'services.card1.title': 'Full-Stack Architecture',
    'services.card1.desc': 'Building robust web applications from scratch using React, Node.js, and modern TypeScript workflows.',
    'services.card2.title': 'UI/UX Design',
    'services.card2.desc': 'Crafting clean, minimalist interfaces with a focus on usability and professional aesthetics.',
    'services.card3.title': 'WordPress & CMS',
    'services.card3.desc': 'Building custom themes, plugins and performant WordPress sites — from simple blogs to full client projects.',
    // Works
    'works.title': 'The Gallery.',
    'works.subtitle': 'An archive of academic projects, technical deep-dives, and early-stage commercial explorations.',
    'works.viewAll': 'View All Projects',
    'works.featured': 'Featured Work',
    'works.caseStudy': 'Case Study',
    // Home Contact
    'home.contact.title': 'Ready to start a project?',
    'home.contact.subtitle': "Got a project or an idea? Let's build something beautiful together.",
    'home.contact.cta': 'Get in touch',
    // About
    'about.title': 'The Architect behind',
    'about.logic': 'the logic.',
    'about.bio': "Hello, I'm Atlas. A motivated developer focused on mastering scalable digital ecosystems. I believe that true innovation starts with solid fundamentals and professional-grade engineering.",
    'about.contact': 'Contact Me',
    'about.location': 'Location',
    'about.role': 'Current Path',
    'about.role.value': 'Junior Full-Stack Dev',
    'about.experience.title': 'Learning Path',
    'about.specializations.title': 'Academic Focus',
    'about.spec1.title': 'Advanced OOP & Logic',
    'about.spec1.desc': 'Focused on Python and SQL modeling (MCD/MLD), ensuring that data architectures are built correctly from day one.',
    'about.spec2.title': 'Minimalist UX',
    'about.spec2.desc': 'Devoted to the philosophy of "Less is More". I study how to remove friction and highlight core value.',
    // Contact
    'contact.title': "Let's build the",
    'contact.future': 'future.',
    'contact.subtitle': 'Got a project or an opportunity? Reach out and I\'ll get back to you within 24 hours.',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
  },
  fr: {
    // Navbar
    'nav.home': 'Accueil',
    'nav.works': 'Projets',
    'nav.skills': 'Compétences',
    'nav.about': 'À Propos',
    // Hero
    'hero.tagline': 'Bâtir Demain • Dév Junior',
    'hero.title.part1': 'Salut, je suis Atlas.',
    'hero.title.part2': 'Je crée des interfaces épurées et des sites web puissants.',
    'hero.subtitle': 'Dév Full-stack Junior axé sur React, Node.js et WordPress. Passionné par le design minimaliste et la résolution de problèmes complexes.',
    'hero.cta.primary': 'Voir mes projets',
    'hero.cta.secondary': 'Discutons',
    // Services/Expertise
    'services.title': 'Parcours & Compétences de Base',
    'services.subtitle': "Construire une base solide en ingénierie moderne par une pratique dédiée et une rigueur académique.",
    'services.card1.title': 'Architecture Full-Stack',
    'services.card1.desc': 'Création d\'applications web robustes à partir de zéro en utilisant React, Node.js et TypeScript.',
    'services.card2.title': 'Design UI/UX',
    'services.card2.desc': 'Conception d\'interfaces épurées et minimalistes axées sur l\'ergonomie et une esthétique professionnelle.',
    'services.card3.title': 'WordPress & CMS',
    'services.card3.desc': 'Création de thèmes personnalisés, plugins et sites WordPress performants — des blogs simples aux projets clients complets.',
    // Works
    'works.title': 'La Galerie.',
    'works.subtitle': 'Une archive de projets académiques, d\'approfondissements techniques et de premières explorations commerciales.',
    'works.viewAll': 'Voir tous les projets',
    'works.featured': 'Projets Phares',
    'works.caseStudy': 'Étude de cas',
    // Home Contact
    'home.contact.title': 'Prêt à lancer un projet ?',
    'home.contact.subtitle': 'Un projet ou une idée ? Construisons quelque chose de magnifique ensemble.',
    'home.contact.cta': 'Me contacter',
    // About
    'about.title': "L'Architecte derrière",
    'about.logic': 'la logique.',
    'about.bio': "Bonjour, je suis Atlas. Un développeur motivé axé sur la maîtrise des écosystèmes numériques évolutifs. Je crois que la véritable innovation commence par des bases solides.",
    'about.contact': 'Me Contacter',
    'about.location': 'Lieu',
    'about.role': 'Parcours Actuel',
    'about.role.value': 'Développeur Full-Stack Jr.',
    'about.experience.title': 'Parcours d\'apprentissage',
    'about.specializations.title': 'Focus Académique',
    'about.spec1.title': 'POO Avancée & Logique',
    'about.spec1.desc': 'Concentré sur Python et la modélisation SQL (MCD/MLD), garantissant que les architectures de données sont construites correctement dès le départ.',
    'about.spec2.title': 'UX Minimaliste',
    'about.spec2.desc': 'Voué à la philosophie "Less is More". J\'étudie comment supprimer les frictions et souligner la valeur fondamentale.',
    // Contact
    'contact.title': 'Bâtissons le',
    'contact.future': 'futur.',
    'contact.subtitle': 'Un projet ou une opportunité ? Contactez-moi et je vous répondrai sous 24 heures.',
    'contact.name': 'Votre Nom',
    'contact.email': 'Adresse Email',
    'contact.message': 'Votre Message',
    'contact.send': 'Envoyer le message',
    'contact.sending': 'Envoi en cours...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      return savedLang || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
