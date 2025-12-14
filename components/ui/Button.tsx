import { Link } from 'react-router';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'white' | 'text';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wider transition-all duration-300 focus:outline-none uppercase font-mono';

  const variants = {
    primary:
      'bg-primary text-black hover:bg-white hover:text-black border border-transparent',
    white:
      'bg-white text-black hover:bg-primary hover:text-black border border-transparent',
    outline:
      'bg-transparent text-current border border-current hover:bg-white hover:text-black',
    text: 'bg-transparent text-current underline hover:text-primary p-0',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link to={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}
