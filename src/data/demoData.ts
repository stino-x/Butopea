import type { BannerItem } from '../types/banner';

/**
 * Demo Data Configuration
 * 
 * Centralized data definitions for all demo examples.
 * Separated from components to demonstrate real-world usage patterns
 * where data would typically come from APIs or CMS systems.
 */

/**
 * Basic Square Mode Demo Data
 * Demonstrates standard 3-item layout with mixed content types
 */
export const squareBasicItems: BannerItem[] = [
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=1',
    link: 'https://example.com/product1'
  },
  {
    type: 'cta',
    title: 'Discover Amazing Products',
    button: 'Shop Now',
    
    link: 'https://example.com/shop'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=2',
    link: 'https://example.com/product2'
  }
];

/**
 * Carousel Mode Demo Data
 * Demonstrates carousel functionality with multiple images and single CTA
 * CTA placement first to show flexible ordering capability
 */
export const carouselItems: BannerItem[] = [
  {
    type: 'cta',
    title: 'Limited Time Offer',
    button: 'Get Deal',
    link: 'https://example.com/deals'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=3',
    link: 'https://example.com/gallery1'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=4',
    link: 'https://example.com/gallery2'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=5',
    link: 'https://example.com/gallery3'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=6',
    link: 'https://example.com/gallery4'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=7',
    link: 'https://example.com/gallery5'
  }
];

/**
 * Rectangle Mode Demo Data
 * Includes both desktop rectangle and mobile square images
 * Demonstrates the dual-image approach for responsive design
 */
export const rectangleItems: BannerItem[] = [
  {
    type: 'image',
    aspectRatio: 'rectangle',
    src: 'https://picsum.photos/1200/400?random=8',
    link: 'https://example.com/featured-collection'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=9',
    link: 'https://example.com/featured-collection'
  },
  {
    type: 'cta',
    title: 'Exclusive Collection',
    button: 'Explore Now',
    link: 'https://example.com/collection'
  }
];

/**
 * Alternative demo configurations for testing different scenarios
 */

// Single CTA configuration
export const singleCtaItems: BannerItem[] = [
  {
    type: 'cta',
    title: 'Welcome to Our Store',
    button: 'Start Shopping',
    link: 'https://example.com/start'
  },
  {
    type: 'testimonial',
    quote: '"Best shopping experience ever! Fast shipping and amazing quality."',
    author: 'Sarah M.',
    rating: 5,
    backgroundColor: '#f8fafc',
    textColor: '#334155'
  },
  {
    type: 'stat',
    number: '50K+',
    label: 'Happy Customers',
    icon: 'users',
    subtext: 'and growing',
    backgroundColor: '#1e293b',
    textColor: '#f1f5f9'
  }
];

// Image-only configuration
export const imageOnlyItems: BannerItem[] = [
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=10',
    link: 'https://example.com/image1'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=11',
    link: 'https://example.com/image2'
  },
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'https://picsum.photos/400?random=12',
    link: 'https://example.com/image3'
  }
];