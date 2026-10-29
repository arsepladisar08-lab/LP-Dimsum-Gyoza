import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'red' | 'outline' | 'secondary' | 'ghost' | 'paper';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-extrabold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants = {
      default:
        'bg-[var(--yellow)] text-[var(--ink)] border-2 border-[var(--brown)] rounded-[var(--radius-md)] shadow-[3px_3px_0_var(--brown)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--brown)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-[#ffd16d]',
      red:
        'bg-[var(--red)] text-[var(--paper)] border-2 border-[var(--brown)] rounded-[var(--radius-md)] shadow-[3px_3px_0_var(--brown)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--brown)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-[#a42026]',
      paper:
        'bg-[var(--paper)] text-[var(--ink)] border-2 border-[var(--brown)] rounded-[var(--radius-md)] shadow-[3px_3px_0_var(--brown)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--brown)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-[var(--yellow-pale)]',
      outline:
        'border-2 border-[var(--brown)] bg-transparent text-[var(--ink)] hover:bg-[var(--cream-warm)] active:bg-[var(--cream)]',
      secondary:
        'bg-[var(--cream-warm)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--paper)]',
      ghost:
        'text-[var(--ink)] hover:bg-[var(--cream-warm)] hover:text-[var(--red)]'
    };

    const sizes = {
      default: 'h-11 px-5 py-2.5',
      sm: 'h-9 px-3 text-xs rounded-lg shadow-[2px_2px_0_var(--brown)]',
      lg: 'h-13 px-7 text-base rounded-xl',
      icon: 'h-10 w-10 p-0 rounded-xl'
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
