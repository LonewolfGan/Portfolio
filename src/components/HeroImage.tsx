import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2, GitBranch, Database, GraduationCap } from 'lucide-react';
import gsap from 'gsap';

// Swap this for your own portrait — 800×900px works best (face in upper-half)
const PORTRAIT = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=90&w=600&auto=format&fit=crop";

const CHIP_BASE: React.CSSProperties = {
  position: 'absolute',
  background: 'color-mix(in oklch, var(--color-background) 82%, transparent)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid color-mix(in oklch, var(--color-border) 90%, transparent)',
  boxShadow: '0 4px 24px color-mix(in oklch, black 12%, transparent)',
};

interface Props { language: string }

export const HeroImage: React.FC<Props> = ({ language }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef   = useRef<HTMLDivElement>(null);
  const personRef  = useRef<HTMLDivElement>(null);
  const badgesRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !frameRef.current || !personRef.current || !badgesRef.current) return;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      // Normalise to –1 → +1 from center
      const dx = ((e.clientX - left) / width  - 0.5) * 2;
      const dy = ((e.clientY - top)  / height - 0.5) * 2;

      // Frame  ±5px, Person ±12px, Badges ±18px
      gsap.to(frameRef.current,  { x: dx * 5,  y: dy * 5,  duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(personRef.current, { x: dx * 12, y: dy * 12, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(badgesRef.current, { x: dx * 18, y: dy * 18, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    };

    const onLeave = () => {
      gsap.to(
        [frameRef.current, personRef.current, badgesRef.current],
        { x: 0, y: 0, duration: 0.9, ease: 'power3.out' }
      );
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      /*
        overflow:visible is mandatory — the head must escape the frame boundary.
        The parent grid cell must also have overflow:visible (default).
      */
      className="relative hidden lg:flex justify-center items-center h-full"
      style={{ overflow: 'visible' }}
    >
      {/* Fixed canvas — badges deliberately overflow this box via negative offsets */}
      <div
        className="relative"
        style={{ width: 300, height: 'min(460px, 68vh)', overflow: 'visible' }}
      >

        {/* ──────────────────────────────────────────────
            LAYER 0 — Ambient depth glow (static, no ref)
            Radiates behind the frame, gives scene depth.
        ────────────────────────────────────────────── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '30% 5% -4% 5%',
            borderRadius: 40,
            background: 'radial-gradient(ellipse at 50% 55%, color-mix(in oklch, var(--color-primary) 28%, transparent) 0%, transparent 70%)',
            filter: 'blur(36px)',
            pointerEvents: 'none',
          }}
        />

        {/* ──────────────────────────────────────────────
            LAYER 1 — The Box (glass card)
            Starts 26 % from the top. The subject's head
            and shoulders live *above* this boundary.
            Moves ±5 px on mouse (slowest = most "distant").
        ────────────────────────────────────────────── */}
        <div
          ref={frameRef}
          aria-hidden
          style={{
            position: 'absolute',
            top: '26%',
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 32,
            background: 'color-mix(in oklch, var(--color-glass) 100%, transparent)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid color-mix(in oklch, var(--color-primary) 18%, transparent)',
            boxShadow:
              '0 8px 48px color-mix(in oklch, var(--color-primary) 6%, transparent),' +
              'inset 0 1px 0 color-mix(in oklch, white 10%, transparent)',
          }}
        />

        {/* ──────────────────────────────────────────────
            LAYER 2 — Portrait (the subject)
            Spans full wrapper height — no overflow:hidden
            so the head is FREE above Layer 1's top edge.
            Moves ±12 px on mouse (mid speed = "in front").
        ────────────────────────────────────────────── */}
        <div
          ref={personRef}
          style={{ position: 'absolute', inset: '0 14px 6% 14px', zIndex: 20 }}
        >
          <img
            src={PORTRAIT}
            alt="Atlas — Junior Full-Stack Developer"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: '20px 20px 26px 26px',
              display: 'block',
            }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* ──────────────────────────────────────────────
            LAYER 3a — Border ring
            Same geometry as Layer 1, no background.
            z-index above the portrait — the border LINE
            appears in front of the person, completing the
            "stepping through the frame" visual.
        ────────────────────────────────────────────── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '26%',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 30,
            borderRadius: 32,
            border: '1.5px solid color-mix(in oklch, var(--color-primary) 40%, transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* ──────────────────────────────────────────────
            LAYER 3b — Bottom fade
            Grounds the subject — the photo's lower edge
            dissolves into the page background instead of
            showing a hard cut.
        ────────────────────────────────────────────── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '16%',
            zIndex: 40,
            borderRadius: '0 0 32px 32px',
            background: 'linear-gradient(to top, var(--color-background) 35%, transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* ──────────────────────────────────────────────
            LAYER 4 — Badges
            All badges share one ref so they translate
            together (±18 px — fastest = "closest to viewer").
            Positions are fixed percentages; no orbiting.
        ────────────────────────────────────────────── */}
        <div
          ref={badgesRef}
          style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}
        >

          {/* "Open to work" pill — top-left, above the frame */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              ...CHIP_BASE,
              top: '3%',
              left: '-6%',
              borderColor: 'color-mix(in oklch, var(--color-primary) 35%, transparent)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 14px',
              borderRadius: 999,
              pointerEvents: 'auto',
            }}
          >
            <span
              style={{
                width: 8, height: 8,
                borderRadius: '50%',
                background: 'var(--color-primary)',
                boxShadow: '0 0 8px var(--color-primary)',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'color-mix(in oklch, var(--color-foreground) 80%, transparent)', textTransform: 'uppercase', letterSpacing: '0.14em', whiteSpace: 'nowrap' }}>
              {language === 'en' ? 'Open to work' : 'Disponible'}
            </span>
          </motion.div>

          {/* React chip — right side, near frame top */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              ...CHIP_BASE,
              top: '28%',
              right: '-22%',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 14,
              pointerEvents: 'auto',
            }}
          >
            <Code2 size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-foreground)', lineHeight: 1 }}>React 19</p>
              <p style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'color-mix(in oklch, var(--color-foreground) 40%, transparent)', marginTop: 3 }}>Frontend</p>
            </div>
          </motion.div>

          {/* GitHub chip — right side, mid */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              ...CHIP_BASE,
              top: '50%',
              right: '-24%',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 14,
              pointerEvents: 'auto',
            }}
          >
            <GitBranch size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-foreground)', lineHeight: 1 }}>12+ Repos</p>
              <p style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'color-mix(in oklch, var(--color-foreground) 40%, transparent)', marginTop: 3 }}>GitHub</p>
            </div>
          </motion.div>

          {/* SQL / Node chip — bottom-left */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              ...CHIP_BASE,
              bottom: '22%',
              left: '-16%',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 14,
              pointerEvents: 'auto',
            }}
          >
            <Database size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-foreground)', lineHeight: 1 }}>SQL / Node</p>
              <p style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'color-mix(in oklch, var(--color-foreground) 40%, transparent)', marginTop: 3 }}>Backend</p>
            </div>
          </motion.div>

          {/* Years chip — top-right corner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              ...CHIP_BASE,
              top: '8%',
              right: '-12%',
              padding: '8px 12px',
              borderRadius: 14,
              pointerEvents: 'auto',
            }}
          >
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-foreground)', lineHeight: 1 }}>2+</p>
            <p style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'color-mix(in oklch, var(--color-foreground) 40%, transparent)', marginTop: 3, whiteSpace: 'nowrap' }}>
              {language === 'en' ? 'Yrs learning' : "D'appr."}
            </p>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};
