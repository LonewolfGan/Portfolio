import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

type Page = 'home' | 'works' | 'skills' | 'about' | 'cv';

const BASE_URL = 'https://hdev.is-a.dev';
const OG_IMAGE = typeof window !== 'undefined'
  ? `${window.location.origin}/og-image.png`
  : `${BASE_URL}/og-image.png`;

const META: Record<Page, { en: { title: string; description: string; url: string }; fr: { title: string; description: string; url: string } }> = {
  home: {
    en: {
      title: 'TCHOHLO K. Honore | Junior Full-Stack Developer',
      description: 'Junior Full-Stack Developer building clean React interfaces and solid SQL backends. Based in France.',
      url: BASE_URL + '/',
    },
    fr: {
      title: 'TCHOHLO K. Honore | Développeur Full-Stack Junior',
      description: 'Développeur Full-Stack Junior construisant des interfaces React épurées et des backends SQL robustes. Basé en France.',
      url: BASE_URL + '/',
    },
  },
  works: {
    en: {
      title: 'Works | TCHOHLO K. Honore',
      description: 'Browse TCHOHLO K. Honore\'s portfolio — full-stack projects built with React, Node.js, Python and SQL.',
      url: BASE_URL + '/works',
    },
    fr: {
      title: 'Projets | TCHOHLO K. Honore',
      description: 'Découvrez les projets full-stack d\'TCHOHLO K. Honore — apps React, APIs Node.js et systèmes pilotés par base de données.',
      url: BASE_URL + '/works',
    },
  },
  skills: {
    en: {
      title: 'Skills | TCHOHLO K. Honore',
      description: 'Technical skills of TCHOHLO K. Honore — React, TypeScript, Node.js, Python, SQL, Docker and more.',
      url: BASE_URL + '/skills',
    },
    fr: {
      title: 'Compétences | TCHOHLO K. Honore',
      description: 'Compétences techniques d\'TCHOHLO K. Honore — React, TypeScript, Node.js, Python, SQL, Docker et plus encore.',
      url: BASE_URL + '/skills',
    },
  },
  about: {
    en: {
      title: 'About | TCHOHLO K. Honore',
      description: 'Meet TCHOHLO K. Honore — a junior full-stack developer passionate about clean interfaces, solid data engineering and minimalist design.',
      url: BASE_URL + '/about',
    },
    fr: {
      title: 'À Propos | TCHOHLO K. Honore',
      description: 'Découvrez TCHOHLO K. Honore — développeur full-stack junior passionné par les interfaces épurées et l\'ingénierie des données.',
      url: BASE_URL + '/about',
    },
  },
  cv: {
    en: {
      title: 'CV | TCHOHLO K. Honore',
      description: 'TCHOHLO K. Honore\'s curriculum vitae — education, projects and technical skills as a junior full-stack developer.',
      url: BASE_URL + '/cv',
    },
    fr: {
      title: 'CV | TCHOHLO K. Honore',
      description: 'Curriculum vitae d\'TCHOHLO K. Honore — formation, projets et compétences techniques en tant que développeur full-stack junior.',
      url: BASE_URL + '/cv',
    },
  },
};

interface SEOProps {
  page: Page;
}

export const SEO: React.FC<SEOProps> = ({ page }) => {
  const { language } = useLanguage();
  const meta = META[page][language];

  return (
    <Helmet>
      <html lang={language} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};
