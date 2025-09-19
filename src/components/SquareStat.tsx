import React, { type JSX } from 'react';
import type { BannerItem } from '../types/banner';

/**
 * Props for the SquareStat component
 * @interface SquareStatProps
 * @property {BannerItem & { type: 'stat' }} item - The stat item to display, must include type 'stat'
 * @property {() => void} [onClick] - Optional click handler for the stat item
 * @property {boolean} [isMobile=false] - Flag to indicate if the component is being rendered on mobile
 */
interface SquareStatProps {
  item: BannerItem & { type: 'stat' };
  onClick?: () => void;
  isMobile?: boolean;
}

/**
 * SquareStat Component
 * 
 * A reusable component for displaying statistical information in a card-like format.
 * Supports both square aspect ratio on desktop and auto-height layout on mobile.
 * 
 * @component
 * @example
 * const statItem = {
 *   type: 'stat',
 *   icon: 'users',
 *   number: '1.2K',
 *   label: 'Happy Customers',
 *   subtext: 'and counting',
 *   backgroundColor: '#f8fafc',
 *   textColor: '#1e293b'
 * };
 * 
 * <SquareStat 
 *   item={statItem}
 *   onClick={() => console.log('Stat clicked')}
 *   isMobile={false}
 * />
 * 
 * @param {SquareStatProps} props - The component props
 * @returns {React.ReactElement} The rendered SquareStat component
 */
export const SquareStat: React.FC<SquareStatProps> = ({ 
  item, 
  onClick,
  isMobile = false 
}) => {
  /**
   * Handles the click event on the stat item
   * @private
   */
  const handleClick = () => {
    if (item.link && onClick) {
      onClick();
    }
  };

  /**
   * Returns the corresponding icon component based on the icon name
   * @private
   * @param {string} iconName - The name of the icon to retrieve
   * @returns {JSX.Element} The SVG icon component
   */
  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      users: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      star: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      trophy: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      heart: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      )
    };

    return icons[iconName] || icons.users;
  };

  return (
    <div
      className={`
        rounded-lg flex flex-col justify-center items-center text-center
        ${item.link ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
        ${isMobile ? 'aspect-auto py-8 px-6' : 'aspect-square p-6'}
      `}
      style={{
        backgroundColor: item.backgroundColor || '#f1f5f9',
        color: item.textColor || '#334155'
      }}
      onClick={handleClick}
    >
      {/* Icon */}
      {item.icon && (
        <div className="mb-4 opacity-80">
          {getIcon(item.icon)}
        </div>
      )}

      {/* Number */}
      <div className={`font-bold mb-2 ${isMobile ? 'text-4xl' : 'text-3xl'}`}>
        {item.number}
      </div>

      {/* Label */}
      <div className={`font-medium mb-1 ${isMobile ? 'text-lg' : 'text-base'}`}>
        {item.label}
      </div>

      {/* Subtext */}
      {item.subtext && (
        <div className={`opacity-70 ${isMobile ? 'text-base' : 'text-sm'}`}>
          {item.subtext}
        </div>
      )}
    </div>
  );
};