import React from 'react';
import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'large' | 'lead' | 'muted';
}

export const Typography = ({ children, className, variant = 'p' }: TypographyProps) => {
  const baseClasses = {
    h1: 'text-4xl sm:text-6xl font-black tracking-tighter leading-[1.1]',
    h2: 'text-3xl sm:text-4xl font-black tracking-tighter leading-tight',
    h3: 'text-2xl sm:text-3xl font-black tracking-tighter leading-tight',
    h4: 'text-xl sm:text-2xl font-black tracking-tight leading-snug',
    p: 'text-base font-medium leading-relaxed text-white/80 tracking-[-0.01em]',
    large: 'text-lg font-black tracking-tight leading-tight',
    small: 'text-[9px] sm:text-xs font-bold uppercase tracking-[0.2em] leading-normal text-[#A0AEC0]',
    lead: 'text-xl text-muted-foreground leading-relaxed',
    muted: 'text-sm text-white/50 font-medium leading-relaxed tracking-[-0.01em]',
  };

  const Component = ['h1', 'h2', 'h3', 'h4'].includes(variant) ? (variant as HeadingLevel) : 'p';

  return (
    <Component className={cn(baseClasses[variant], className)}>
      {children}
    </Component>
  );
};
