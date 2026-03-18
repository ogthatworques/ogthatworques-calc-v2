export function Button({ className = '', variant = 'default', ...props }) {
  const base =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default: 'bg-white text-black hover:bg-zinc-200',
    outline: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${className}`}
      {...props}
    />
  );
}