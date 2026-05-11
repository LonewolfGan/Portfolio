import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  language: string;
}

export const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ containerRef, language }) => {
  // Store triggers for cleanup
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useGSAP(() => {
    // Clear previous triggers
    triggersRef.current.forEach(st => st.kill());
    triggersRef.current = [];

    // Only animate elements that are in viewport - Service Cards
    const serviceCards = gsap.utils.toArray('.service-card');
    if (serviceCards.length > 0) {
      const st = ScrollTrigger.create({
        trigger: '.services-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from(serviceCards, {
            opacity: 0,
            y: 20,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      });
      triggersRef.current.push(st);
    }

    // Project Cards
    const projectCards = gsap.utils.toArray('.project-card');
    if (projectCards.length > 0) {
      const st = ScrollTrigger.create({
        trigger: '.projects-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from(projectCards, {
            opacity: 0,
            y: 25,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      });
      triggersRef.current.push(st);
    }

    // Learning Items
    const learningItems = gsap.utils.toArray('.learning-item');
    if (learningItems.length > 0) {
      const st = ScrollTrigger.create({
        trigger: '.learning-section',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from(learningItems, {
            opacity: 0,
            x: -10,
            stagger: 0.06,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      });
      triggersRef.current.push(st);
    }

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
