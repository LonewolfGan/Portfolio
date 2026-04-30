import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col glass rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-foreground/5">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-colors duration-500 flex items-center justify-center">
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="opacity-0 group-hover:opacity-100 transition-all bg-foreground/10 backdrop-blur-xl border border-border text-foreground p-4 rounded-full shadow-2xl"
          >
            <ArrowUpRight size={24} />
          </motion.a>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[9px] font-mono font-medium tracking-tight bg-foreground/5 text-foreground/40 rounded uppercase border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl font-bold mb-2 tracking-tight text-foreground">{title}</h3>
        <p className="text-sm text-foreground/50 leading-relaxed font-light line-clamp-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
