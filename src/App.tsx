import React, { useRef, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';

// Lazy load heavy components and pages
const BackgroundScene = lazy(() => import('./components/BackgroundScene'));
const Home = lazy(() => import('./pages/Home'));
const Works = lazy(() => import('./pages/Works'));
const Skills = lazy(() => import('./pages/Skills'));
const About = lazy(() => import('./pages/About'));
const CV = lazy(() => import('./pages/CV'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Only load BackgroundScene on desktop (not mobile)
const BackgroundSceneWrapper = () => {
  const [isDesktop, setIsDesktop] = React.useState(false);
  
  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
  
  if (!isDesktop) return null;
  return <BackgroundScene />;
};

// Lightweight loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Reduced duration for faster transitions
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div ref={containerRef} className="relative min-h-screen">
            <div aria-hidden="true" className="fixed inset-0 grid-bg pointer-events-none opacity-30 text-foreground" />
            <div aria-hidden="true" className="fixed -top-[20%] -left-[10%] w-[500px] h-[500px] glow-sphere opacity-30 dark:opacity-25 pointer-events-none" />
            <div aria-hidden="true" className="fixed bottom-[10%] -right-[5%] w-[350px] h-[350px] glow-sphere opacity-20 dark:opacity-15 pointer-events-none" />

            <ErrorBoundary fallback={null}>
              <Suspense fallback={null}>
                <BackgroundSceneWrapper />
              </Suspense>
            </ErrorBoundary>

            <Navbar />

            <main id="main-content" className="relative z-10 pt-20">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<PageWrapper><Suspense fallback={<PageLoader />}><Home /></Suspense></PageWrapper>} />
                  <Route path="/works" element={<PageWrapper><Suspense fallback={<PageLoader />}><Works /></Suspense></PageWrapper>} />
                  <Route path="/skills" element={<PageWrapper><Suspense fallback={<PageLoader />}><Skills /></Suspense></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><Suspense fallback={<PageLoader />}><About /></Suspense></PageWrapper>} />
                  <Route path="/cv" element={<PageWrapper><Suspense fallback={<PageLoader />}><CV /></Suspense></PageWrapper>} />
                  <Route path="*" element={<PageWrapper><Suspense fallback={<PageLoader />}><NotFound /></Suspense></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </main>

            <footer className="relative z-10 py-12 px-6 border-t border-border" role="contentinfo">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div aria-hidden="true" className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-[10px] text-background font-bold">T</div>
                  <span className="text-sm font-display font-medium tracking-tight uppercase text-foreground">TCHOHLO K. HONORE © 2026</span>
                </div>
                <nav aria-label="Social links" className="flex items-center gap-3 text-xs font-mono text-foreground/65 uppercase tracking-widest">
                  <a href="https://github.com/LonewolfGan" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="hover:text-primary transition-colors">GitHub</a>
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-foreground/20" />
                  <a href="mailto:atlaslonewolf00@gmail.com" aria-label="Send email" className="hover:text-primary transition-colors">Email</a>
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-foreground/20" />
                  <a href="https://www.linkedin.com/in/h-dev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="hover:text-primary transition-colors">LinkedIn</a>
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-foreground/20" />
                  <a href="https://wa.me/212706135005" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp contact" className="hover:text-primary transition-colors">WhatsApp</a>
                </nav>
              </div>
            </footer>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
