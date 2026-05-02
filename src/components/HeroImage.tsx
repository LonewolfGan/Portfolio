import React, { useRef, useEffect } from 'react';
import { Code2, Database, Server } from 'lucide-react';
import gsap from 'gsap';

// Swap for your own transparent PNG at /public/atlas.png for the cleanest pop-out
const PORTRAIT = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=90&w=600&auto=format&fit=crop";

const BADGE_STYLE: React.CSSProperties = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 14px',
  borderRadius: 12,
  background: 'var(--color-background)',
  border: '1px solid var(--color-border)',
  boxShadow: '0 2px 16px oklch(0% 0 0 / 8%)',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
};

interface Props { language: string }

export const HeroImage: React.FC<Props> = ({ language }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shapeRef   = useRef<HTMLDivElement>(null);
  const personRef  = useRef<HTMLDivElement>(null);
  const badgesRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !shapeRef.current || !personRef.current || !badgesRef.current) return;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const dx = ((e.clientX - left) / width  - 0.5) * 2; // −1 → +1
      const dy = ((e.clientY - top)  / height - 0.5) * 2;

      // Shape slowest (background depth), person mid, badges fastest (foreground depth)
      gsap.to(shapeRef.current,  { x: dx * 5,  y: dy * 5,  duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(personRef.current, { x: dx * 12, y: dy * 12, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(badgesRef.current, { x: dx * 18, y: dy * 18, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    };

    const onLeave = () => {
      gsap.to(
        [shapeRef.current, personRef.current, badgesRef.current],
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
    <div
      ref={wrapperRef}
      className="relative hidden lg:flex justify-center items-center h-full"
      style={{ overflow: 'visible' }}
    >
      {/*
        Fixed canvas — 320 × min(460, 68vh).
        overflow: visible so badges can bleed outside.
      */}
      <div
        className="relative"
        style={{ width: 320, height: 'min(460px, 68vh)', overflow: 'visible' }}
      >

        {/* ─────────────────────────────────────────────
            LAYER 1 — Solid shape (the "box")
            A tall oval that starts ~22% from the top.
            The portrait's head overflows above this edge.
            Color is set by --color-hero-shape, which is
            mint in light mode and deep teal in dark mode.
        ───────────────────────────────────────────── */}
        <div
          ref={shapeRef}
          style={{
            position: 'absolute',
            left: '14%',
            right: '14%',
            top: '22%',
            bottom: '4%',
            borderRadius: '50%',
            background: 'var(--color-hero-shape)',
            zIndex: 0,
          }}
        />

        {/* ─────────────────────────────────────────────
            LAYER 2 — Portrait
            Covers full wrapper height; no overflow:hidden
            so the head sits freely above the oval.
            Narrower than the wrapper (inset x 10px) so
            the oval's colour is visible on both sides.
            Bottom edge dissolves with a gradient overlay.
        ───────────────────────────────────────────── */}
        <div
          ref={personRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 10,
            right: 10,
            bottom: '4%',
            zIndex: 10,
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
              borderRadius: '18px 18px 50% 50%',
              display: 'block',
            }}
            referrerPolicy="no-referrer"
          />
          {/* Soft bottom fade — blends feet into background */}
          <div
            style={{
              position: 'absolute',
              left: 0, right: 0, bottom: 0,
              height: '28%',
              background: 'linear-gradient(to top, var(--color-background) 20%, transparent)',
              borderRadius: '0 0 50% 50%',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ─────────────────────────────────────────────
            LAYER 3 — Static tech badges
            Fixed positions, no entrance animations.
            All share one ref → translate together at ±18px.
        ───────────────────────────────────────────── */}
        <div
          ref={badgesRef}
          style={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none' }}
        >
          {/* React — right, upper */}
          <div style={{ ...BADGE_STYLE, top: '28%', right: '-26%' }}>
            <Code2 size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-foreground)', lineHeight: 1, margin: 0 }}>React 19</p>
              <p style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'oklch(from var(--color-foreground) l c h / 40%)', marginTop: 3, marginBottom: 0 }}>Frontend</p>
            </div>
          </div>

          {/* Node.js — right, lower */}
          <div style={{ ...BADGE_STYLE, top: '52%', right: '-28%' }}>
            <Server size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-foreground)', lineHeight: 1, margin: 0 }}>Node.js</p>
              <p style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'oklch(from var(--color-foreground) l c h / 40%)', marginTop: 3, marginBottom: 0 }}>Backend</p>
            </div>
          </div>

          {/* SQL — left, mid */}
          <div style={{ ...BADGE_STYLE, top: '42%', left: '-26%' }}>
            <Database size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-foreground)', lineHeight: 1, margin: 0 }}>SQL</p>
              <p style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'oklch(from var(--color-foreground) l c h / 40%)', marginTop: 3, marginBottom: 0 }}>MariaDB</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
