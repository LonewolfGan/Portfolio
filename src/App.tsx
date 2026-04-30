/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

import { Navbar } from './components/Navbar';
import { BackgroundScene } from './components/BackgroundScene';
import { Home } from './pages/Home';
import { Works } from './pages/Works';
import { Skills } from './pages/Skills';
import { About } from './pages/About';

gsap.registerPlugin(ScrollTrigger);

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Re-initialize GSAP animations when routes change
  }, { scope: containerRef });

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div ref={containerRef} className="relative min-h-screen">
            {/* Ambient Background Layers */}
            <div className="fixed inset-0 grid-bg pointer-events-none opacity-40 text-foreground" />
            <div className="fixed -top-[20%] -left-[10%] w-[600px] h-[600px] glow-sphere opacity-40 pointer-events-none" />
            <div className="fixed bottom-[10%] -right-[5%] w-[400px] h-[400px] glow-sphere opacity-20 pointer-events-none" />

            <BackgroundScene />
            <Navbar />

            <main className="relative z-10 pt-20">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/works" element={<PageWrapper><Works /></PageWrapper>} />
                  <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-6 border-t border-border">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center text-[10px] text-background font-bold">A</div>
                  <span className="text-sm font-display font-medium tracking-tight uppercase text-foreground">ATLAS LONEWOLF © 2026</span>
                </div>
                <div className="flex gap-8 text-xs font-mono text-foreground/50 uppercase tracking-widest">
                  <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                  <a href="#" className="hover:text-primary transition-colors">Read.cv</a>
                  <a href="#" className="hover:text-primary transition-colors">Layers</a>
                </div>
                <div className="text-xs text-foreground/30">
                  Crafted with Precision.
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
