import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MobileCarouselProps } from '../types/banner';
import SquareCta from './SquareCta';


/**
 * MobileCarousel Component
 * 
 * A touch-friendly carousel component designed specifically for mobile devices,
 * featuring main image display with thumbnail navigation and an optional CTA.
 * 
 * @component
 * @example
 * const images = [
 *   { src: 'image1.jpg', alt: 'First slide' },
 *   { src: 'image2.jpg', alt: 'Second slide' }
 * ];
 * 
 * <MobileCarousel 
 *   images={images}
 *   cta={{
 *     title: 'Learn More',
 *     buttonText: 'View Details',
 *     link: '/products/1'
 *   }}
 *   onNavigate={(url) => console.log('Navigating to:', url)}
 * />
 * 
 * @param {MobileCarouselProps} props - The component props
 * @returns {React.ReactElement} The rendered MobileCarousel component
 */
const MobileCarousel: React.FC<MobileCarouselProps> = ({ images, cta, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Navigates to the next slide in the carousel
   * 
   * Handles the transition to the next slide with circular navigation
   * (loops back to the first slide after the last one)
   * 
   * @returns {void}
   */
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  /**
   * Navigates to the previous slide in the carousel
   * 
   * Handles the transition to the previous slide with circular navigation
   * (loops to the last slide when going back from the first one)
   * 
   * @returns {void}
   */
  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  /**
   * Jumps directly to a specific slide by index
   * 
   * @param {number} index - The zero-based index of the slide to navigate to
   * @returns {void}
   */
  const goToSlide = (index: number): void => {
    if (index >= 0 && index < images.length) {
      setCurrentSlide(index);
    }
  };

  /**
   * Handles click events on the main carousel image
   * 
   * Navigates to the link associated with the current slide's image
   * 
   * @returns {void}
   */
  const handleMainImageClick = (): void => {
    onNavigate(images[currentSlide]?.link);
  };

  // Early return if no images provided
  if (images.length === 0) return null;

  const currentImage = images[currentSlide];

  return (
    <div className="block md:hidden">
      {/* Main carousel display */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        <img 
          src={currentImage.src} 
          alt={`Carousel slide ${currentSlide + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleMainImageClick}
          loading="lazy"
        />
        
        {/* Navigation arrows - only show for multiple images */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail navigation strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {images.map((image, index) => (
            <div
              key={index}
              className={`min-w-[60px] h-15 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                index === currentSlide 
                  ? 'opacity-100 ring-2 ring-blue-500 scale-105' 
                  : 'opacity-60 hover:opacity-80'
              }`}
              onClick={() => goToSlide(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToSlide(index);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <img 
                src={image.src} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* CTA section - rendered below carousel */}
      {cta && (
        <SquareCta 
          item={cta} 
          isMobile={true} 
          onClick={() => onNavigate(cta.link)} 
        />
      )}
    </div>
  );
};

export default MobileCarousel;