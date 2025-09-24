import React from 'react';

export const Button = ({ 
  children, 
  className = '', 
  size = 'default',
  variant = 'default',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    default: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    default: 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500',
    outline: 'border border-emerald-500 text-emerald-500 hover:bg-emerald-50 focus:ring-emerald-500',
    ghost: 'text-emerald-500 hover:bg-emerald-50 focus:ring-emerald-500'
  };
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
