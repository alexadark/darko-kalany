import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'text' | 'white';
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  to, 
  onClick, 
  className = '',
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wider transition-all duration-300 focus:outline-none uppercase font-mono";
  
  const variants = {
    primary: "bg-primary text-black hover:bg-white hover:text-black border border-transparent",
    white: "bg-white text-black hover:bg-primary hover:text-black border border-transparent",
    outline: "bg-transparent text-current border border-current hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black",
    text: "bg-transparent text-current underline hover:text-primary p-0"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;