import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { OptimizedImage } from '../components/OptimizedImage';

const getProjects = (language: string) => [
  {
    title: "Quoter",
    tech_details: "React Ecosystem • Redux Toolkit • Tailwind CSS",
    description: language === 'en' 
      ? "My first real dive into the React ecosystem. The Challenge: managing complex state transitions between distinct quotes without page reloads. The Solution: implementing Redux Toolkit to maintain a predictable state, ensuring a seamless, flicker-free user experience."
      : "Ma première véritable immersion dans l'écosystème React. Le Défi : gérer des transitions d'état complexes entre différentes citations sans rechargement de page. La Solution : implémenter Redux Toolkit pour maintenir un état prévisible, garantissant une expérience utilisateur fluide et sans scintillement.",
    image: "https://res.cloudinary.com/dbkjpn2db/image/upload/v1778522425/quoter_owfiro.webp",
    liveLink: "https://quoter-ebon.vercel.app/",
    githubLink: "https://github.com/LonewolfGan/Quoter",
    tags: ["React", "API", "Frontend"]
  },
  {
    title: "Face Recognition",
    tech_details: "Python • OpenCV • Flask • JavaScript",
    description: language === 'en'
      ? "A passion project merging Python logic with web accessibility. The Challenge: Bridging the gap between a high-performance Python vision engine and a lightweight browser interface. The Solution: I built a Flask-based API that processes images on the server through OpenCV, then streams the results back to a custom JavaScript frontend."
      : "Un projet passion mêlant la logique Python à l'accessibilité web. Le Défi : Combler le fossé entre un moteur de vision Python haute performance et une interface de navigateur légère. La Solution : J'ai construit une API basée sur Flask qui traite les images sur le serveur via OpenCV, puis renvoie les résultats vers un frontend JavaScript personnalisé.",
    image: "https://res.cloudinary.com/dbkjpn2db/image/upload/v1778522426/face_cdelhk.webp",
    liveLink: "https://github.com/LonewolfGan/Face_Recognition",
    githubLink: "https://github.com/LonewolfGan/Face_Recognition",
    tags: ["AI", "Python", "Full Stack"]
  },
  {
    title: "Cinemate",
    tech_details: "TMDB API Integration • Framer Motion • React",
    description: language === 'en'
      ? "A cinematic discovery platform where I prioritized pixel-perfect UI and performance. The Challenge: Handling massive amounts of movie data from TMDB without sacrificing load times. The Solution: I implemented lazy loading for images and used local storage to cache search results, creating a snappy, 'app-like' experience."
      : "Une plateforme de découverte cinématographique où j'ai privilégié une UI au pixel près et la performance. Le Défi : Gérer de grandes quantités de données de films depuis TMDB sans sacrifier les temps de chargement. La Solution : J'ai implémenté le lazy loading pour les images et utilisé le stockage local pour mettre en cache les résultats de recherche, créant une expérience vive de type 'app'.",
    image: "https://res.cloudinary.com/dbkjpn2db/image/upload/v1778522425/cinemate_bd7zxl.webp",
    liveLink: "https://cinematelone.netlify.app/",
    githubLink: "https://github.com/LonewolfGan/cinemate",
    tags: ["Entertainment", "React", "Mobile First"]
  },
  {
    title: "E-Commerce Architecture",
    tech_details: "SQL Modeling • Node.js • Multi-Page Logic",
    description: language === 'en'
      ? "A deep dive into backend integrity and relational modeling. The Challenge: Building a robust cart system where data consistency is critical across multiple tables. The Solution: I designed a comprehensive database schema in SQL, ensuring that every product, order, and user relationship remains industrial-strength and scalable."
      : "Une immersion profonde dans l'intégrité du backend et la modélisation relationnelle. Le Défi : Construire un système de panier robuste où la cohérence des données est critique entre plusieurs tables. La Solution : J'ai conçu un schéma de base de données complet en SQL, garantissant que chaque relation produit, commande et utilisateur reste industrielle et évolutive.",
    image: "https://res.cloudinary.com/dbkjpn2db/image/upload/v1778522425/codebook_vssmyu.webp",
    liveLink: "https://ecomat.netlify.app/products",
    githubLink: "https://github.com/LonewolfGan/E-commerce_sample",
    tags: ["E-commerce", "SQL", "Database"]
  },
  {
    title: "X-Files",
    tech_details: "System Management • Security • PHP",
    description: language === 'en'
      ? "An experimental archive system focusing on secure file handling. The Challenge: Implementing a secure search logic that handles sensitive metadata without compromising system speed. The Solution: I utilized PHP's core file systems combined with custom encryption layers, wrapped in a moody, minimalist design to enhance the user's emotional experience."
      : "Un système d'archives expérimental axé sur la gestion sécurisée des fichiers. Le Défi : Implémenter une logique de recherche sécurisée qui gère des métadonnées sensibles sans compromettre la vitesse du système. La Solution : J'ai utilisé les systèmes de fichiers natifs de PHP combinés à des couches de cryptage personnalisées, le tout dans un design sombre et minimaliste pour renforcer l'expérience émotionnelle de l'utilisateur.",
    image: "https://res.cloudinary.com/dbkjpn2db/image/upload/v1778522428/xfiles_gadwrk.webp",
    liveLink: "https://hdev.great-site.net",
    githubLink: "https://github.com/LonewolfGan",
    tags: ["Security", "PHP", "Archive"]
  }
];

export const Works: React.FC = () => {
  const { t, language } = useLanguage();
  const projects = getProjects(language);

  return (
    <main>
      <SEO page="works" />

      <section aria-label="Projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display font-clash text-4xl md:text-7xl font-bold mb-8 text-foreground"
              >
                {t('works.title')}
              </motion.h1>
              <p className="text-foreground/65 text-xl leading-relaxed font-light">
                {t('works.subtitle')}
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-32">
            {projects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}
              >
                <div className="flex-1 w-full group overflow-hidden rounded-[40px] glass border border-border relative">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} — ${project.tech_details}`}
                    className="w-full aspect-[4/3] object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                      <Code2 size={16} />
                    </div>
                    <span className="text-xs font-mono tracking-[.3em] uppercase text-primary font-bold">{project.tech_details}</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-display font-clash font-bold text-foreground">{project.title}</h2>
                  <p className="text-foreground/65 text-lg leading-relaxed max-w-xl font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full border border-border bg-foreground/5 text-[10px] uppercase tracking-widest text-foreground/60">{tag}</span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button
                      asChild
                      size="md"
                      className="rounded-full group justify-center min-w-[180px] h-12 whitespace-nowrap"
                      rightIcon={<ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      aria-label={`${language === 'en' ? 'View live demo of' : 'Voir la démo de'} ${project.title} — ${project.liveLink}`}
                    >
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        {language === 'en' ? 'View Project' : 'Voir le projet'}
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="md"
                      className="rounded-full w-12 h-12 min-w-0 p-0 text-foreground/60 hover:text-foreground shrink-0"
                      aria-label={`${language === 'en' ? 'View source code for' : 'Voir le code source de'} ${project.title} on GitHub`}
                    >
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github size={20} />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Works;
