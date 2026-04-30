import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-12 h-12 flex items-center justify-center rounded-full glass border-border hover:bg-foreground/5 transition-all duration-300 outline-none",
        className
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -45, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: -20, opacity: 0, rotate: 45, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="flex items-center justify-center"
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-foreground" />
          ) : (
            <Sun size={20} className="text-primary" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
