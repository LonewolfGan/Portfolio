import React from 'react';
import { cn } from '../lib/utils';

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}

/**
 * ButtonGroup Component
 * Enforces symmetrical button widths and responsive stacking.
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ 
  children, 
  className,
  cols = 2 
}) => {
  return (
    <div className={cn(
      "grid w-full gap-4",
      // Mobile: Always stack 1 col
      "grid-cols-1",
      // Desktop: Switch to requested columns
      cols === 2 && "sm:grid-cols-2",
      cols === 3 && "sm:grid-cols-3",
      cols === 4 && "sm:grid-cols-4",
      // Ensure all buttons fill their grid cell
      "[&>*]:w-full",
      className
    )}>
      {children}
    </div>
  );
};
