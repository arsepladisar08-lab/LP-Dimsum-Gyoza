import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'spicy' | 'frozen';
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-extrabold transition-colors select-none shadow-[2px_2px_0_var(--brown)]';

  const variants = {
    default:
      'border-[var(--brown)] bg-[var(--yellow)] text-[var(--ink)]',
    secondary:
      'border-[var(--brown)] bg-[var(--cream-warm)] text-[var(--ink)]',
    outline:
      'border-[var(--brown)] text-[var(--ink)] bg-transparent',
    spicy:
      'border-[var(--brown)] bg-[var(--red)] text-[var(--paper)]',
    frozen:
      'border-[var(--brown)] bg-[#dbeafe] text-[#1e3a8a]'
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
}
