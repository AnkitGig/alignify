
import React from 'react';

interface ChevronDownProps {
  className?: string;
  open?: boolean;
}

export function ChevronDown({ className, open }: ChevronDownProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''} ${className || ""}`}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}
