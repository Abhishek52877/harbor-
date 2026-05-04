import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-muted text-foreground',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
