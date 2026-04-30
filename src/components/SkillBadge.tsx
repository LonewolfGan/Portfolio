import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  level?: 'Expert' | 'Proficient' | 'Advanced';
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ name, icon, level }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="inline-flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-default group"
    >
      {icon && <div className="text-text-muted group-hover:text-primary transition-colors">{icon}</div>}
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight leading-none mb-1">{name}</span>
        {level && <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{level}</span>}
      </div>
    </motion.div>
  );
};
