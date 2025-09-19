// Core type definitions for the banner component system

export interface BaseBannerItem {
  link?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface ImageItem extends BaseBannerItem {
  type: 'image';
  aspectRatio: 'square' | 'rectangle';
  src: string;
  desktopSrc?: string;
  mobileSrc?: string;
  alt?: string;
}

export interface CtaItem extends BaseBannerItem {
  type: 'cta';
  title: string;
  button: string;
  buttonText?: string;
  description?: string;
}

export interface TestimonialItem extends BaseBannerItem {
  type: 'testimonial';
  quote: string;
  author: string;
  rating?: number;
  authorImage?: string;
  title?: string;
}

export interface StatItem extends BaseBannerItem {
  type: 'stat';
  number: string;
  label: string;
  icon?: string;
  subtext?: string;
  title?: string;
}

// Union type for all possible banner items
export type BannerItem = ImageItem | CtaItem | TestimonialItem | StatItem;

// Props interface for the main banner component
export interface BannerComponentProps {
  mode: 'square' | 'rectangle';
  carouselOnMobile?: boolean;
  items: BannerItem[];
}

// Props for individual sub-components
export interface SquareImageProps {
  item: ImageItem;
  onClick?: () => void;
}

export interface SquareCtaProps {
  item: CtaItem;
  isMobile?: boolean;
  onClick?: () => void;
}

export interface RectangleCtaProps {
  item: CtaItem;
  isMobile?: boolean;
  onClick?: () => void;
}

export interface MobileCarouselProps {
  images: ImageItem[];
  cta?: CtaItem;
  onNavigate: (url?: string) => void;
}