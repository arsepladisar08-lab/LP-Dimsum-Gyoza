import React from 'react';

interface FoodIllustrationProps {
  art: 'gyoza' | 'dimsum' | 'keju' | 'mentai' | 'platter' | 'frozen' | 'chili';
  className?: string;
}

export const FoodIllustration: React.FC<FoodIllustrationProps> = ({ art, className = '' }) => {
  switch (art) {
    case 'gyoza':
      return (
        <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
          <path
            d="M16 62C20 34 42 22 60 22C78 22 100 34 104 62C86 76 34 76 16 62Z"
            fill="#FCE5CD"
            stroke="#5C3317"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <path d="M32 60C46 42 74 42 88 60C72 70 48 70 32 60Z" fill="#F3C69F" />
          <path
            d="M38 28C36 38 38 46 42 52M60 22C58 34 59 44 61 50M82 28C83 38 81 46 78 52"
            stroke="#5C3317"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'dimsum':
      return (
        <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
          <rect x="24" y="28" width="72" height="46" rx="14" fill="#FAD6A5" stroke="#5C3317" strokeWidth="4.5" />
          <path d="M24 38C34 30 46 38 60 32C74 38 86 30 96 38" stroke="#5C3317" strokeWidth="4" strokeLinecap="round" />
          <circle cx="48" cy="28" r="6" fill="#E0402B" />
          <circle cx="62" cy="26" r="6" fill="#FF9F1C" />
          <circle cx="74" cy="29" r="5" fill="#2EC4B6" />
        </svg>
      );
    case 'keju':
      return (
        <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
          <rect x="22" y="24" width="76" height="48" rx="12" fill="#F4A236" stroke="#5C3317" strokeWidth="4.5" />
          <path d="M38 46C48 36 72 36 82 46C74 62 46 62 38 46Z" fill="#FFF3B0" stroke="#5C3317" strokeWidth="3.5" />
          <circle cx="52" cy="48" r="3" fill="#E09F3E" />
          <circle cx="68" cy="46" r="2.5" fill="#E09F3E" />
        </svg>
      );
    case 'mentai':
      return (
        <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
          <path d="M16 48H104L94 74H26L16 48Z" fill="#D8E2DC" stroke="#5C3317" strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M22 48C28 30 48 28 60 36C72 28 92 30 98 48" fill="#FF9F45" stroke="#5C3317" strokeWidth="4.5" />
          <path d="M38 38L48 42M56 34L66 40M76 37L84 42" stroke="#221813" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'platter':
      return (
        <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
          <rect x="14" y="18" width="92" height="56" rx="10" fill="#FFFDF8" stroke="#5C3317" strokeWidth="4.5" />
          <line x1="60" y1="18" x2="60" y2="74" stroke="#5C3317" strokeWidth="4" />
          <line x1="60" y1="46" x2="106" y2="46" stroke="#5C3317" strokeWidth="4" />
          <circle cx="37" cy="36" r="9" fill="#FF9F45" stroke="#5C3317" strokeWidth="3" />
          <circle cx="37" cy="56" r="9" fill="#FF9F45" stroke="#5C3317" strokeWidth="3" />
          <rect x="70" y="25" width="24" height="14" rx="5" fill="#FCE5CD" stroke="#5C3317" strokeWidth="3" />
          <rect x="70" y="53" width="24" height="14" rx="4" fill="#F4A236" stroke="#5C3317" strokeWidth="3" />
        </svg>
      );
    case 'frozen':
      return (
        <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
          <rect x="26" y="14" width="68" height="64" rx="10" fill="#E0F2FE" stroke="#5C3317" strokeWidth="4.5" />
          <rect x="36" y="26" width="48" height="38" rx="6" fill="#7C1315" stroke="#5C3317" strokeWidth="3.5" />
          <circle cx="60" cy="48" r="11" fill="#FAD6A5" />
          <path d="M46 34H74" stroke="#FFC34B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'chili':
      return (
        <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
          <rect x="38" y="14" width="44" height="12" rx="4" fill="#B91C1C" stroke="#5C3317" strokeWidth="4" />
          <rect x="34" y="26" width="52" height="50" rx="8" fill="#991B1B" stroke="#5C3317" strokeWidth="4.5" />
          <rect x="38" y="38" width="44" height="26" rx="4" fill="#FFF7E9" stroke="#5C3317" strokeWidth="3" />
          <path d="M48 49H72M52 56H68" stroke="#7C1315" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};
