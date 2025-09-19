import React from 'react';
import type { SquareImageProps } from '../types/banner';

/**
 * SquareImage Component
 * 
 * Renders a square aspect ratio image with hover effects and click handling.
 * Used in both square mode layouts and as part of carousels.
 * 
 * @component
 * @example
 * const imageItem = {
 *   type: 'image',
 *   imageUrl: 'path/to/image.jpg',
 *   altText: 'Product image',
 *   link: '/products/1'
 * };
 * 
 * <SquareImage 
 *   item={imageItem}
 *   onClick={() => console.log('Image clicked')}
 * />
 * 
 * @param {SquareImageProps} props - The component props
 * @returns {React.ReactElement} The rendered SquareImage component
 * 
 * @features
 * - Maintains perfect 1:1 aspect ratio using Tailwind's aspect-square
 * - Hover effects with subtle elevation and shadow
 * - Lazy loading for performance optimization
 * - Object-fit cover to prevent image distortion
 * - Accessible cursor pointer indication
 */
const SquareImage: React.FC<SquareImageProps> = ({ item, onClick }) => {
  return (
    <div 
      className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
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
      <img 
        src={item.src} 
        alt="Banner image" 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default SquareImage;