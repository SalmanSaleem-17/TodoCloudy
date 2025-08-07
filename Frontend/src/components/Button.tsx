import { ReactNode } from 'react';
import { classNames } from '@/utils/helpers';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
    danger: 'bg-danger-600 text-white hover:bg-danger-700',
    outline:
      'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  return (
    <button
      type={type}
      className={classNames(
        'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className,
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}