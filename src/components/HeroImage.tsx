import React from 'react';

const PORTRAIT = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=90&w=600&auto=format&fit=crop";

interface Props { language: string }

export const HeroImage: React.FC<Props> = () => (
  <div className="relative hidden lg:flex justify-center items-center h-full" style={{ overflow: 'visible' }}>

    {/* Blob — static, behind the portrait */}
    <div
      style={{
        position: 'absolute',
        width: 340,
        height: 420,
        borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
        background: 'var(--color-hero-shape)',
        filter: 'blur(2px)',
        zIndex: 0,
      }}
    />

    {/* Portrait card */}
    <div
      style={{
        position: 'relative',
        width: 300,
        height: 'min(440px, 66vh)',
        borderRadius: '48% 48% 46% 46% / 46% 46% 50% 50%',
        overflow: 'hidden',
        boxShadow: '0 32px 80px oklch(0% 0 0 / 22%), 0 8px 24px oklch(0% 0 0 / 12%)',
        zIndex: 10,
      }}
    >
      <img
        src={PORTRAIT}
        alt="Atlas — Junior Full-Stack Developer"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        referrerPolicy="no-referrer"
      />
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, var(--color-background) 0%, transparent 40%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  </div>
);
