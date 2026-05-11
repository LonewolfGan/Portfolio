import React from 'react';

const TECHS = [
  { name: 'React',      logo: '/icons/react.svg',          dark: false },
  { name: 'TypeScript', logo: '/icons/typescript.svg', dark: false },
  { name: 'Node.js',    logo: '/icons/nodejs.svg',         dark: false },
  { name: 'Python',     logo: '/icons/python.svg',         dark: false },
  { name: 'MySQL',      logo: '/icons/mysql.svg',           dark: false },
  { name: 'Tailwind',   logo: '/icons/tailwindcss.svg', dark: false },
  { name: 'Git',        logo: '/icons/git.svg',               dark: false },
  { name: 'Express',    logo: '/icons/express.svg',       dark: true  },
  { name: 'PHP',        logo: '/icons/php.svg',               dark: false },
  { name: 'PostgreSQL', logo: '/icons/postgresql.svg', dark: false },
  { name: 'Docker',     logo: '/icons/docker.svg',         dark: false },
  { name: 'Next.js',    logo: '/icons/nextjs.svg',         dark: true  },
  { name: 'HTML5',      logo: '/icons/html5.svg',           dark: false },
  { name: 'CSS3',       logo: '/icons/css3.svg',             dark: false },
  { name: 'WordPress',  logo: '/icons/wordpress.svg',   dark: true  },
  { name: 'VS Code',    logo: '/icons/vscode.svg',         dark: false },
];

interface Tech { name: string; logo: string; dark: boolean }

const Item: React.FC<Tech> = ({ name, logo, dark }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-border bg-background/60 backdrop-blur-sm hover:border-primary/30 transition-all select-none shrink-0 group">
    <img
      src={logo}
      alt={name}
      width={28}
      height={28}
      loading="lazy"
      decoding="async"
      className={`object-contain grayscale transition-all duration-300${dark ? ' dark:invert' : ''}`}
    />
    <span className="text-sm font-mono text-foreground/60 group-hover:text-foreground transition-colors whitespace-nowrap">{name}</span>
  </div>
);

export const TechMarquee: React.FC<{ language: string }> = ({ language }) => (
  <section aria-label="Technologies" className="py-16 border-y border-border overflow-hidden">
    <p className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/60 mb-10 px-6">
      {language === 'en' ? 'Technologies I work with' : 'Technologies avec lesquelles je travaille'}
    </p>

    {/* Track 1 — left to right */}
    <div className="relative flex mb-4" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
      <div className="flex gap-4 animate-marquee">
        {TECHS.map(t => <Item key={t.name}       {...t} />)}
        {TECHS.map(t => <Item key={t.name + '2'}  {...t} />)}
      </div>
    </div>

    {/* Track 2 — right to left (offset) */}
    <div className="relative flex" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
      <div className="flex gap-4 animate-marquee-reverse">
        {[...TECHS].reverse().map(t => <Item key={t.name + 'r'}  {...t} />)}
        {[...TECHS].reverse().map(t => <Item key={t.name + 'r2'} {...t} />)}
      </div>
    </div>
  </section>
);
