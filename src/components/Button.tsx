import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

/**
 * Universal Button Component
 * Engineered for zero text wrapping and high-end geometric consistency.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  children,
  asChild,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary text-background border-primary shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:bg-emerald-400',
    secondary: 'bg-brand-surface text-foreground border-border hover:bg-foreground/5 shadow-xl',
    ghost: 'bg-transparent text-foreground/50 hover:text-foreground hover:bg-foreground/5 border-transparent',
    outline: 'bg-transparent text-foreground border-border hover:border-foreground/20 hover:bg-foreground/5 shadow-sm',
  };

  const sizes = {
    sm: 'h-10 px-6 text-xs min-w-[140px]',
    md: 'h-12 px-8 text-sm min-w-[180px]',
    lg: 'h-14 px-10 text-base min-w-[220px]',
  };

  const baseClasses = cn(
    // 1. No-Wrap Structure
    'inline-flex items-center justify-center flex-nowrap whitespace-nowrap',
    // 2. Standardization & Gap Control
    'gap-3 rounded-button transition-all duration-300 border font-semibold outline-none focus:ring-2 focus:ring-primary/20',
    variants[variant],
    sizes[size],
    className
  );

  // If asChild is used (usually for Link), we clone and merge
  // This is a simplified version of Radix Slot functionality
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...props,
      className: cn(baseClasses, child.props.className),
      children: (
        <>
          {leftIcon && <span className="shrink-0 inline-flex items-center">{leftIcon}</span>}
          <span className="shrink-0">{child.props.children || children}</span>
          {rightIcon && <span className="shrink-0 inline-flex items-center">{rightIcon}</span>}
        </>
      ),
    });
  }

  return (
    <motion.button
      layout // 5. Smooth size transitions
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98, y: 0 }}
      className={baseClasses}
      {...props}
    >
      {/* 2. Icon Protection with shrink-0 */}
      {leftIcon && <span className="shrink-0 inline-flex items-center justify-center">{leftIcon}</span>}
      <span className="shrink-0">{children}</span>
      {rightIcon && <span className="shrink-0 inline-flex items-center justify-center">{rightIcon}</span>}
    </motion.button>
  );
};
