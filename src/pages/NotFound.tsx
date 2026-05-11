import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <main className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 overflow-hidden">
      <title>404 — Page Not Found | TCHOHLO K. Honore</title>

      {/* Large background 404 */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-display font-bold text-foreground/[0.04] leading-none"
        style={{ fontSize: 'clamp(18rem, 40vw, 36rem)' }}
      >
        404
      </span>

      <div className="relative z-10 text-center max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6"
        >
          {language === 'en' ? 'Error 404 — Not Found' : 'Erreur 404 — Introuvable'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-foreground leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          {language === 'en' ? 'Lost?' : 'Perdu ?'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-foreground/65 text-base leading-relaxed mb-10"
        >
          {language === 'en'
            ? "This page doesn't exist. Heading back home in"
            : "Cette page n'existe pas. Retour à l'accueil dans"}
          {' '}
          <span className="font-mono text-primary font-semibold tabular-nums">{count}s</span>
          {'…'}
        </motion.p>

        {/* Countdown ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-foreground/10"
              />
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - count / 5)}`}
                className="text-primary transition-all duration-1000 ease-linear"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xl text-foreground tabular-nums">
              {count}
            </span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-mono text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
        >
          {language === 'en' ? '← Back to Home' : "← Retour à l'accueil"}
        </motion.button>
      </div>
    </main>
  );
};

export default NotFound;
