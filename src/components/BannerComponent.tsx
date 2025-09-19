import React from 'react';
import type { 
  BannerComponentProps, 
  ImageItem, 
  CtaItem
} from '../types/banner';
import { handleExternalNavigation } from '../utils/navigation';
import SquareImage from './SquareImage';

import RectangleCta from './RectangleCta';
import MobileCarousel from './MobileCarousel';
import { SquareStat } from './SquareStat';
import { SquareTestimonial } from './SquareTestimonial';
import SquareCta from './SquareCta';

/**
 * BannerComponent
 * 
 * The primary component that orchestrates different banner layouts and modes.
 * Acts as a smart container that delegates rendering to specialized sub-components.
 * 
 * @component
 * @example
 * const items = [
 *   {
 *     type: 'image',
 *     imageUrl: 'path/to/image.jpg',
 *     altText: 'Banner image',
 *     link: 'https://example.com'
 *   },
 *   // More items...
 * ];
 * 
 * <BannerComponent 
 *   items={items}
 *   mode="square"
 *   isMobile={false}
 * />
 * 
 * @param {BannerComponentProps} props - The component props
 * @returns {React.ReactElement} The rendered BannerComponent
 */
const BannerComponent: React.FC<BannerComponentProps> = ({ 
  mode, 
  carouselOnMobile = false, 
  items 
}) => {
  /**
   * Handles navigation for banner items
   * 
   * Centralized navigation handler that ensures consistent behavior
   * for all outbound links in the banner component.
   * 
   * @param {string} [url] - The URL to navigate to
   * @returns {void}
   */
  const handleNavigate = (url?: string): void => {
    handleExternalNavigation(url);
  };

  /**
   * Square Mode Implementation
   * 
   * Renders banner items in a responsive grid layout that adapts to different screen sizes.
   * 
   * Features:
   * - 3-column grid on desktop, single column on mobile
   * - Optional carousel mode for mobile devices
   * - Flexible item ordering based on items array
   * 
   * @returns {React.ReactElement} The rendered square mode component
   */
  if (mode === 'square') {
    // Type-safe filtering of items
    const images = items.filter((item): item is ImageItem => item.type === 'image');
    const cta = items.find((item): item is CtaItem => item.type === 'cta');
  
    return (
      <div className="w-full">
        {/* Desktop Layout: 3-column grid */}
        <div className={`grid grid-cols-3 gap-4 ${carouselOnMobile ? 'hidden md:grid' : ''}`}>
          {items.map((item, index) => {
            if (item.type === 'image') {
              return (
                <SquareImage 
                  key={`${item.type}-${index}`}
                  item={item}
                  onClick={() => handleNavigate(item.link)}
                />
              );
            } else if (item.type === 'cta') {
              return (
                <SquareCta 
                  key={`${item.type}-${index}`}
                  item={item}
                  onClick={() => handleNavigate(item.link)}
                />
              );
            } else if (item.type === 'testimonial') {
              return (
                <SquareTestimonial 
                  key={`${item.type}-${index}`}
                  item={item}
                  onClick={() => handleNavigate(item.link)}
                />
              );
            } else if (item.type === 'stat') {
              return (
                <SquareStat 
                  key={`${item.type}-${index}`}
                  item={item}
                  onClick={() => handleNavigate(item.link)}
                />
              );
            }
            return null;
          })}
        </div>
  
        {/* Mobile Layout: Single column (when carousel is disabled) */}
        <div className={`${carouselOnMobile ? 'hidden' : 'grid grid-cols-1 md:hidden'} gap-4`}>
          {items.map((item, index) => {
            if (item.type === 'image') {
              return (
                <SquareImage 
                  key={`mobile-${item.type}-${index}`}
                  item={item}
                  onClick={() => handleNavigate(item.link)}
                />
              );
            } else if (item.type === 'cta') {
              return (
                <SquareCta 
                  key={`mobile-${item.type}-${index}`}
                  item={item}
                  isMobile={true}
                  onClick={() => handleNavigate(item.link)}
                />
              );
            } else if (item.type === 'testimonial') {
              return (
                <SquareTestimonial 
                  key={`mobile-${item.type}-${index}`}
                  item={item}
                  isMobile={true}
                  onClick={() => handleNavigate(item.link)}
                />
              );
            } else if (item.type === 'stat') {
              return (
                <SquareStat 
                  key={`mobile-${item.type}-${index}`}
                  item={item}
                  isMobile={true}
                  onClick={() => handleNavigate(item.link)}
                />
              );
            }
            return null;
          })}
        </div>
  
        {/* Mobile Carousel Mode */}
        {carouselOnMobile && (
          <MobileCarousel 
            images={images}
            cta={cta}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    );
  }

  /**
   * RECTANGLE MODE IMPLEMENTATION
   * Features:
   * - Desktop: Full-width image with floating CTA overlay
   * - Mobile: Stacked layout (image on top, CTA below)
   * - Uses first image and first CTA from items array
   */
  if (mode === 'rectangle') {
    const imageItem = items.find((item): item is ImageItem => item.type === 'image');
    const ctaItem = items.find((item): item is CtaItem => item.type === 'cta');
  
    return (
      <div className="w-full">
        {/* Desktop Layout: 70/30 split */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[70%_30%] h-96 rounded-xl overflow-hidden">
            {/* Left side - Image (70%) */}
            {imageItem && (
              <div 
                className="cursor-pointer group"
                onClick={() => handleNavigate(imageItem.link)}
              >
                <img 
                  src={imageItem.src} 
                  alt="Rectangle banner" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            
            {/* Right side - CTA (30%) */}
            {ctaItem && (
              <RectangleCta 
                item={ctaItem} 
                onClick={() => handleNavigate(ctaItem.link)} 
              />
            )}
          </div>
        </div>
  
        {/* Mobile Layout: Stacked design */}
        <div className="md:hidden">
          <div className="rounded-xl overflow-hidden">
            {imageItem && (
              <div 
                className="aspect-square cursor-pointer"
                onClick={() => handleNavigate(imageItem.link)}
              >
                <img 
                  src={imageItem.src} 
                  alt="Rectangle banner mobile" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            {ctaItem && (
              <RectangleCta 
                item={ctaItem} 
                isMobile={true}
                onClick={() => handleNavigate(ctaItem.link)} 
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  // Fallback for unsupported modes
  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg text-center text-gray-500">
      Unsupported banner mode: {mode}
    </div>
  );
};

export default BannerComponent;