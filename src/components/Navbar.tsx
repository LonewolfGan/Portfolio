import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Github, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

const NAV_ITEMS = (t: (k: string) => string) => [
  { name: t('nav.home'),   path: '/' },
  { name: t('nav.works'),  path: '/works' },
  { name: t('nav.skills'), path: '/skills' },
  { name: t('nav.about'),  path: '/about' },
  { name: 'CV',            path: '/cv' },
];

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const items = NAV_ITEMS(t);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none"
      >
        {/* ── Desktop pill ── */}
        <div className="hidden md:flex items-center gap-2 px-6 py-2 pointer-events-auto glass rounded-full shadow-2xl backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background font-display font-bold text-sm">
              T
            </div>
            <span className="font-display font-bold text-base tracking-tighter text-foreground uppercase">
              TCHOHLO K. HONORE
            </span>
          </Link>

          <div className="w-px h-4 bg-border mx-4" />

          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em]">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn('transition-colors whitespace-nowrap',
                    isActive ? 'text-primary' : 'text-foreground/40 hover:text-foreground'
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="w-px h-4 bg-border mx-4" />

          <div className="flex items-center gap-3">
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

        {/* ── Mobile bar ── */}
        <div className="flex md:hidden w-full items-center justify-between px-4 py-2.5 pointer-events-auto glass rounded-2xl shadow-2xl backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background font-display font-bold text-sm">
              T
            </div>
            <span className="font-display font-bold text-sm tracking-tighter text-foreground uppercase">
              TCHOHLO K. HONORE
            </span>
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-xl hover:bg-foreground/5 transition-colors text-foreground"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[72px] left-4 right-4 z-50 md:hidden glass rounded-2xl shadow-2xl backdrop-blur-xl border border-border overflow-hidden"
            >
              {/* Nav links */}
              <nav className="flex flex-col py-2">
                {items.map((item, i) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors border-b border-border/40 last:border-0',
                        isActive
                          ? 'text-primary bg-primary/5'
                          : 'text-foreground/60 hover:text-foreground hover:bg-foreground/4'
                      )
                    }
                  >
                    <span className="text-primary/40 text-[10px] font-mono">0{i + 1}</span>
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-border/40 bg-foreground/[0.02]">
                <div className="flex items-center gap-3">
                  <LanguageToggle />
                  <ThemeToggle className="w-8 h-8 bg-transparent border-none ring-0 shadow-none active:scale-95" />
                </div>
                <a
                  href="https://github.com/LonewolfGan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] font-mono text-foreground/50 hover:text-foreground transition-colors"
                >
                  <Github size={15} />
                  GitHub
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
