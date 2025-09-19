import React from 'react';
import type { SquareCtaProps } from '../types/banner';

/**
 * SquareCta Component
 * 
 * Renders call-to-action boxes for square mode layouts.
 * Adapts its aspect ratio based on device (square on desktop, auto height on mobile).
 * 
 * Design Decisions:
 * - Uses gradient backgrounds for visual appeal (blue to purple)
 * - Consistent mobile layout: auto height with py-8 padding to match other components
 * - Semi-transparent button with hover state that inverts colors
 * - Flexbox centering for perfect content alignment
 * - Responsive text sizing based on context
 */
const SquareCta: React.FC<SquareCtaProps> = ({ item, isMobile = false, onClick }) => {
  return (
    <div 
      className={`
        rounded-lg flex flex-col justify-center items-center text-center
        ${item.link ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
        ${isMobile ? 'aspect-auto py-8 px-6' : 'aspect-square p-6'}
        bg-gradient-to-br from-blue-500 to-purple-600 text-white
        transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold mb-3 text-center leading-tight`}>
        {item.title}
      </h3>
      <button className="bg-white/90 text-gray-900 hover:bg-white hover:text-blue-700 border-2 border-white px-4 py-2 rounded-full font-medium transition-all duration-200">
        {item.button}
      </button>
    </div>
  );
};

export default SquareCta;