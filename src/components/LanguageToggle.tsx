import React from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { cn } from '../lib/utils';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border-border hover:bg-foreground/5 transition-all outline-none font-mono text-[10px] uppercase tracking-wider font-bold"
    >
      <span className={cn(language === 'en' ? "text-primary" : "text-foreground/40")}>EN</span>
      <span className="text-border">/</span>
      <span className={cn(language === 'fr' ? "text-primary" : "text-foreground/40")}>FR</span>
    </button>
  );
};
