import React from 'react';
import type { RectangleCtaProps } from '../types/banner';

/**
 * RectangleCta Component
 * 
 * Specialized CTA component for rectangle mode banners that handles both
 * desktop floating overlay and mobile stacked layouts.
 * 
 * @component
 * @example
 * const ctaItem = {
 *   type: 'cta',
 *   title: 'Special Offer',
 *   description: 'Limited time only',
 *   buttonText: 'Shop Now',
 *   backgroundColor: '#ffffff',
 *   textColor: '#000000'
 * };
 * 
 * <RectangleCta 
 *   item={ctaItem}
 *   isMobile={false}
 *   onClick={() => console.log('CTA clicked')}
 * />
 * 
 * @param {RectangleCtaProps} props - The component props
 * @returns {React.ReactElement} The rendered RectangleCta component
 */
const RectangleCta: React.FC<RectangleCtaProps> = ({ item, isMobile = false, onClick }) => {
  /**
   * Handles click events on the CTA
   * 
   * Prevents event bubbling to avoid triggering parent click handlers
   * and invokes the provided onClick handler if it exists.
   * 
   * @param {React.MouseEvent} e - The click event
   * @returns {void}
   */
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  /**
   * Handles keyboard events for accessibility
   * 
   * Allows activation of the CTA using the Enter or Space keys
   * while preventing default behavior and event bubbling.
   * 
   * @param {React.KeyboardEvent} e - The keyboard event
   * @returns {void}
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onClick?.();
    }
  };

  if (isMobile) {
    return (
      <div 
        className="static bg-gray-100 rounded-b-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <h3 className="text-gray-800 text-lg font-semibold mb-4 leading-tight">
          {item.title}
        </h3>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-gray-900 px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          {item.button}
        </button>
      </div>
    );
  }

  // Desktop 30% column version with matching border radius and better contrast
  return (
    <div 
      className="h-full flex flex-col justify-center items-center p-6 cursor-pointer transition-all duration-200 hover:shadow-lg bg-gray-100 border border-gray-200 rounded-r-xl"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      style={{
        // Alternative: if you want a darker theme
        // backgroundColor: '#1f2937',
        // color: 'white',
        // borderColor: '#374151'
      }}
    >
      <h3 className="text-gray-800 text-lg font-semibold mb-4 leading-tight text-center">
        {item.title}
      </h3>
      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-gray-900 px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {item.button}
      </button>
    </div>
  );
};

export default RectangleCta;
