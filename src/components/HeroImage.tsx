import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PORTRAIT = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=90&w=600&auto=format&fit=crop";

interface Props { language: string }

export const HeroImage: React.FC<Props> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blobRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const dx = ((e.clientX - left) / width  - 0.5) * 2;
      const dy = ((e.clientY - top)  / height - 0.5) * 2;

      gsap.to(blobRef.current,  { x: dx * 14, y: dy * 14, duration: 1.1, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(cardRef.current,  { x: dx * 22, y: dy * 22, rotateX: dy * -4, rotateY: dx * 4, duration: 0.75, ease: 'power2.out', overwrite: 'auto' });
    };

    const onLeave = () => {
      gsap.to([blobRef.current, cardRef.current], {
        x: 0, y: 0, rotateX: 0, rotateY: 0,
        duration: 1.0, ease: 'power3.out',
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative hidden lg:flex justify-center items-center h-full"
      style={{ perspective: 800, overflow: 'visible' }}
    >
      {/* Blob glow — moves slowest */}
      <div
        ref={blobRef}
        style={{
          position: 'absolute',
          width: 340,
          height: 420,
          borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
          background: 'var(--color-hero-shape)',
          filter: 'blur(2px)',
          zIndex: 0,
          willChange: 'transform',
        }}
      />

      {/* Portrait card — moves fastest, slight 3-D tilt */}
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          width: 300,
          height: 'min(440px, 66vh)',
          borderRadius: '48% 48% 46% 46% / 46% 46% 50% 50%',
          overflow: 'hidden',
          boxShadow: '0 32px 80px oklch(0% 0 0 / 22%), 0 8px 24px oklch(0% 0 0 / 12%)',
          zIndex: 10,
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={PORTRAIT}
          alt="Atlas — Junior Full-Stack Developer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
          referrerPolicy="no-referrer"
        />
        {/* Subtle bottom fade to blend into page */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--color-background) 0%, transparent 40%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
