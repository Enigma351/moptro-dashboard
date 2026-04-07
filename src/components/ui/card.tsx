import React from 'react';
import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'outline';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'glass', ...props }, ref) => {
    const variants = {
      glass: 'bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl',
      solid: 'bg-[#050B2E] border-white/5 shadow-xl',
      outline: 'bg-transparent border-white/10',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-[32px] border p-6 transition-all duration-300',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('mb-6', className)}>{children}</div>
);

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn('text-xs font-black text-white/30 uppercase tracking-[3px]', className)}>
    {children}
  </h3>
);

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('', className)}>{children}</div>
);
