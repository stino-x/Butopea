import React from 'react';
import type { BannerItem } from '../types/banner';

/**
 * Props for the SquareTestimonial component
 * @interface SquareTestimonialProps
 * @property {BannerItem & { type: 'testimonial' }} item - The testimonial item to display, must include type 'testimonial'
 * @property {() => void} [onClick] - Optional click handler for the testimonial card
 * @property {boolean} [isMobile=false] - Flag to indicate if the component is being rendered on mobile
 */
interface SquareTestimonialProps {
  item: BannerItem & { type: 'testimonial' };
  onClick?: () => void;
  isMobile?: boolean;
}

/**
 * SquareTestimonial Component
 * 
 * A reusable component for displaying customer testimonials in a card format.
 * Supports both square aspect ratio on desktop and auto-height layout on mobile.
 * Includes features like star ratings, quotes, and author information.
 * 
 * @component
 * @example
 * const testimonialItem = {
 *   type: 'testimonial',
 *   quote: 'This product changed my life!',
 *   rating: 5,
 *   author: 'John Doe',
 *   role: 'Satisfied Customer',
 *   imageUrl: 'path/to/avatar.jpg',
 *   link: '/testimonials/1'
 * };
 * 
 * <SquareTestimonial 
 *   item={testimonialItem}
 *   onClick={() => console.log('Testimonial clicked')}
 *   isMobile={false}
 * />
 * 
 * @param {SquareTestimonialProps} props - The component props
 * @returns {React.ReactElement} The rendered SquareTestimonial component
 */
export const SquareTestimonial: React.FC<SquareTestimonialProps> = ({ 
  item, 
  onClick,
  isMobile = false 
}) => {
  /**
   * Handles the click event on the testimonial card
   * @private
   */
  const handleClick = () => {
    if (item.link && onClick) {
      onClick();
    }
  };

  /**
   * Renders star rating UI based on the given rating
   * @private
   * @param {number} rating - The rating value (1-5)
   * @returns {JSX.Element[]} Array of star elements
   */
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div
      className={`
        rounded-lg flex flex-col justify-center items-center text-center
        ${item.link ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
        ${isMobile ? 'aspect-auto py-8 px-6' : 'aspect-square p-6'}
      `}
      style={{
        backgroundColor: item.backgroundColor || '#ffffff',
        color: item.textColor || '#374151'
      }}
      onClick={handleClick}
    >
      {/* Quote */}
      <div className="mb-4">
        <svg 
          className="w-8 h-8 mx-auto mb-3 opacity-30" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <blockquote className={`italic ${isMobile ? 'text-lg' : 'text-base'}`}>
          {item.quote}
        </blockquote>
      </div>

      {/* Rating */}
      {item.rating && (
        <div className="flex justify-center mb-3">
          {renderStars(item.rating)}
        </div>
      )}

      {/* Author */}
      <div className="mt-auto">
        {item.authorImage && (
          <img 
            src={item.authorImage} 
            alt={item.author}
            className="w-10 h-10 rounded-full mx-auto mb-2"
          />
        )}
        <cite className={`not-italic font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>
          {item.author}
        </cite>
      </div>
    </div>
  );
};