import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', onClick, hover = false }: CardProps) {
  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 ${hover ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
