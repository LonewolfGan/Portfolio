import React from 'react';

const TECHS = [
  { name: 'React',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Node.js',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Python',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'MySQL',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'Tailwind',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Git',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'Express',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',    filterVar: 'var(--filter-on-light-bg)' },
  { name: 'PHP',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Next.js',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',      filterVar: 'var(--filter-on-light-bg)' },
  { name: 'HTML5',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'VS Code',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
];

interface Tech { name: string; logo: string; filterVar?: string }

const Item: React.FC<Tech> = ({ name, logo, filterVar }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-border bg-background/60 backdrop-blur-sm hover:border-primary/30 transition-colors select-none shrink-0">
    <img
      src={logo}
      alt={name}
      width={28}
      height={28}
      loading="lazy"
      decoding="async"
      className="object-contain"
      style={filterVar ? { filter: filterVar } : undefined}
    />
    <span className="text-sm font-mono text-foreground/60 whitespace-nowrap">{name}</span>
  </div>
);

export const TechMarquee: React.FC<{ language: string }> = ({ language }) => (
  <section aria-label="Technologies" className="py-16 border-y border-border overflow-hidden">
    <p className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/30 mb-10 px-6">
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
