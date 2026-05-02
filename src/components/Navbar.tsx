import React from 'react';
import { motion } from 'motion/react';
import { Link, NavLink } from 'react-router-dom';
import { Github } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none"
    >
      <div className="flex items-center gap-2 px-6 py-2 pointer-events-auto glass rounded-full shadow-2xl backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-primary to-emerald-600 rounded-lg flex items-center justify-center text-background font-display font-bold">
            A
          </div>
          <span className="font-display font-bold text-lg hidden sm:block tracking-tighter text-foreground uppercase">ATLAS LONEWOLF</span>
        </Link>

        <div className="w-px h-4 bg-border mx-4" />

        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em]">
          {[
            { name: t('nav.home'), path: '/' },
            { name: t('nav.works'), path: '/works' },
            { name: t('nav.skills'), path: '/skills' },
            { name: t('nav.about'), path: '/about' },
            { name: 'CV', path: '/cv' },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                cn(
                  "transition-colors",
                  isActive ? "text-primary" : "text-foreground/40 hover:text-foreground"
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="w-px h-4 bg-border mx-4" />

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle className="w-8 h-8 bg-transparent border-none ring-0 shadow-none glass active:scale-95" />
          <a
            href="https://github.com/LonewolfGan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-1.5 rounded-full hover:bg-foreground/5 transition-colors text-foreground/40 hover:text-foreground"
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
