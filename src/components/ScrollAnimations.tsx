import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMobile } from '../hooks/useMobile';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  language: string;
}

export const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ containerRef, language }) => {
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const isMobile = useMobile();

  // Skip animations on mobile to reduce forced reflow
  if (isMobile) return null;

  useGSAP(() => {
    // Clear previous triggers
    triggersRef.current.forEach(st => st.kill());
    triggersRef.current = [];

    // Helper to check if element is in viewport
    const isInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // Helper to animate elements with fallback for already-visible elements
    const setupScrollAnimation = (
      selector: string,
      triggerSelector: string,
      fromVars: gsap.TweenVars,
      stagger: number = 0.08
    ) => {
      const elements = gsap.utils.toArray(selector);
      const trigger = document.querySelector(triggerSelector);
      
      if (elements.length === 0 || !trigger) return;

      // If already in viewport, animate immediately
      if (isInViewport(trigger)) {
        gsap.from(elements, {
          ...fromVars,
          stagger,
          duration: 0.6,
          ease: 'power2.out',
        });
        return;
      }

      // Otherwise, use ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: triggerSelector,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from(elements, {
            ...fromVars,
            stagger,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      });
      triggersRef.current.push(st);
    };

    // Service Cards
    setupScrollAnimation('.service-card', '.services-grid', { opacity: 0, y: 20 }, 0.08);

    // Project Cards  
    setupScrollAnimation('.project-card', '.projects-grid', { opacity: 0, y: 25 }, 0.1);

    // Learning Items
    setupScrollAnimation('.learning-item', '.learning-section', { opacity: 0, x: -10 }, 0.06);

    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
    };
  }, { scope: containerRef });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
    };
  }, []);

  return null;
};

export default ScrollAnimations;
