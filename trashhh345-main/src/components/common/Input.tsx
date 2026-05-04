import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-sm">{label}</label>}
      <input
        className={`w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] transition-all ${error ? 'border-destructive' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
