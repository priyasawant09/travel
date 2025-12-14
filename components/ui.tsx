import React from 'react';
import { LucideIcon } from 'lucide-react';

// --- Card Component ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-xl shadow-sm border border-brand-100 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}
  >
    {children}
  </div>
);

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = "", 
  icon: Icon,
  isLoading,
  ...props 
}) => {
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700",
    secondary: "bg-accent-500 text-white hover:bg-accent-600",
    outline: "border-2 border-brand-500 text-brand-500 hover:bg-brand-50",
    ghost: "text-brand-600 hover:bg-brand-50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg font-semibold"
  };

  return (
    <button 
      className={`flex items-center justify-center gap-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className="animate-spin">⌛</span> : Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

// --- Badge Component ---
export const Badge: React.FC<{ children: React.ReactNode, color?: string }> = ({ children, color = "bg-brand-100 text-brand-800" }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${color}`}>
    {children}
  </span>
);

// --- Section Header ---
export const SectionHeader: React.FC<{ title: string, subtitle?: string, action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <div className="flex justify-between items-end mb-4 px-4 md:px-0">
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);
