export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div
      className={`${sizes[size]} border-[#0066FF] border-t-transparent rounded-full animate-spin`}
      style={{ animation: 'spin 0.8s linear infinite' }}
    />
  );
}
