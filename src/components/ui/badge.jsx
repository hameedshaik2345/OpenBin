import React from 'react';

export const Badge = ({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  
  const variantClasses = {
    default: 'bg-emerald-100 text-emerald-800',
    outline: 'border border-emerald-200 text-emerald-700',
    secondary: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
