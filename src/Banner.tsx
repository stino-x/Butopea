import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// TypeScript interfaces
interface ImageItem {
  type: 'image';
  aspectRatio: 'square' | 'rectangle';
  src: string;
  link?: string;
}

interface CtaItem {
  type: 'cta';
  title: string;
  button: string;
  link?: string;
}

type BannerItem = ImageItem | CtaItem;

interface BannerComponentProps {
  mode: 'square' | 'rectangle';
  carouselOnMobile?: boolean;
  items: BannerItem[];
}

// Individual components
const SquareImage: React.FC<{ item: ImageItem; onClick?: () => void }> = ({ item, onClick }) => (
  <div 
    className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
    onClick={onClick}
  >
    <img 
      src={item.src} 
      alt="Banner image" 
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
);

const SquareCta: React.FC<{ item: CtaItem; isMobile?: boolean; onClick?: () => void }> = ({ item, isMobile, onClick }) => (
  <div 
    className={`${isMobile ? 'aspect-[3/1]' : 'aspect-square'} bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white flex flex-col justify-center items-center p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl`}
    onClick={onClick}
  >
    <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold mb-3 text-center`}>
      {item.title}
    </h3>
    <button className="bg-white/20 hover:bg-white hover:text-blue-600 border-2 border-white px-4 py-2 rounded-full font-medium transition-all duration-200">
      {item.button}
    </button>
  </div>
);

const RectangleCta: React.FC<{ item: CtaItem; isMobile?: boolean; onClick?: () => void }> = ({ item, isMobile, onClick }) => (
  <div 
    className={`${isMobile ? 'static bg-white rounded-b-xl' : 'absolute top-1/2 right-10 -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl max-w-xs'} p-6 cursor-pointer`}
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
  >
    <h3 className="text-gray-800 text-lg font-semibold mb-4">{item.title}</h3>
    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200">
      {item.button}
    </button>
  </div>
);

const MobileCarousel: React.FC<{ 
  images: ImageItem[];
  cta?: CtaItem;
  onNavigate: (url?: string) => void;
}> = ({ images, cta, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (images.length === 0) return null;

  return (
    <div className="block md:hidden">
      {/* Main carousel image */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        <img 
          src={images[currentSlide].src} 
          alt={`Carousel slide ${currentSlide + 1}`}
          className="w-full h-full object-cover"
          onClick={() => onNavigate(images[currentSlide].link)}
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`min-w-[60px] h-15 rounded-lg overflow-hidden cursor-pointer transition-opacity ${
                index === currentSlide ? 'opacity-100 ring-2 ring-blue-500' : 'opacity-60'
              }`}
              onClick={() => goToSlide(index)}
            >
              <img 
                src={image.src} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
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

// Main Banner Component
const BannerComponent: React.FC<BannerComponentProps> = ({ 
  mode, 
  carouselOnMobile = false, 
  items 
}) => {
  const handleNavigate = (url?: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (mode === 'square') {
    const images = items.filter((item): item is ImageItem => item.type === 'image');
    const cta = items.find((item): item is CtaItem => item.type === 'cta');

    return (
      <div className="w-full">
        {/* Desktop/Regular layout */}
        <div className={`grid grid-cols-3 gap-4 ${carouselOnMobile ? 'hidden md:grid' : ''}`}>
          {items.map((item, index) => {
            if (item.type === 'image') {
              return (
                <SquareImage 
                  key={index} 
                  item={item} 
                  onClick={() => handleNavigate(item.link)} 
                />
              );
            } else {
              return (
                <SquareCta 
                  key={index} 
                  item={item} 
                  onClick={() => handleNavigate(item.link)} 
                />
              );
            }
          })}
        </div>

        {/* Mobile layout */}
        <div className={`${carouselOnMobile ? 'hidden' : 'grid md:hidden'} grid-cols-1 gap-4`}>
          {items.map((item, index) => {
            if (item.type === 'image') {
              return (
                <SquareImage 
                  key={index} 
                  item={item} 
                  onClick={() => handleNavigate(item.link)} 
                />
              );
            } else {
              return (
                <SquareCta 
                  key={index} 
                  item={item} 
                  isMobile={true}
                  onClick={() => handleNavigate(item.link)} 
                />
              );
            }
          })}
        </div>

        {/* Mobile carousel */}
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

  if (mode === 'rectangle') {
    const imageItem = items.find((item): item is ImageItem => item.type === 'image');
    const ctaItem = items.find((item): item is CtaItem => item.type === 'cta');

    return (
      <div className="w-full">
        {/* Desktop layout */}
        <div className="hidden md:block">
          <div 
            className="relative h-96 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => handleNavigate(imageItem?.link)}
          >
            {imageItem && (
              <img 
                src={imageItem.src} 
                alt="Rectangle banner" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
            {ctaItem && (
              <RectangleCta 
                item={ctaItem} 
                onClick={() => handleNavigate(ctaItem.link)} 
              />
            )}
          </div>
        </div>

        {/* Mobile layout */}
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

  return null;
};

// Demo App
const App: React.FC = () => {
  const squareItems: BannerItem[] = [
    {
      type: 'image',
      aspectRatio: 'square',
      src: 'https://picsum.photos/400?random=1',
      link: 'https://example.com/link1'
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
      link: 'https://example.com/link2'
    }
  ];

  const carouselItems: BannerItem[] = [
    {
      type: 'cta',
      title: 'Limited Time Offer',
      button: 'Get Deal',
      link: 'https://example.com/deal'
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
    }
  ];

  const rectangleItems: BannerItem[] = [
    {
      type: 'image',
      aspectRatio: 'rectangle',
      src: 'https://picsum.photos/1200/400?random=7',
      link: 'https://example.com/featured'
    },
    {
      type: 'image',
      aspectRatio: 'square',
      src: 'https://picsum.photos/400?random=8',
      link: 'https://example.com/featured'
    },
    {
      type: 'cta',
      title: 'Exclusive Collection',
      button: 'Explore',
      link: 'https://example.com/collection'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Banner Component Demo
        </h1>
        
        <div className="space-y-16">
          {/* Square Mode - Basic */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b-2 border-gray-200 pb-3">
              Square Mode - Basic Layout
            </h2>
            <BannerComponent 
              mode="square" 
              carouselOnMobile={false} 
              items={squareItems} 
            />
          </section>

          {/* Square Mode - Carousel */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b-2 border-gray-200 pb-3">
              Square Mode - With Mobile Carousel
            </h2>
            <BannerComponent 
              mode="square" 
              carouselOnMobile={true} 
              items={carouselItems} 
            />
          </section>

          {/* Rectangle Mode */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b-2 border-gray-200 pb-3">
              Rectangle Mode
            </h2>
            <BannerComponent 
              mode="rectangle" 
              items={rectangleItems} 
            />
          </section>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Usage Examples:</h3>
          <div className="space-y-4 text-sm">
            <div className="bg-white p-4 rounded-lg border">
              <code className="text-blue-600">
                {`<BannerComponent 
  mode="square" 
  carouselOnMobile={false} 
  items={[...items]} 
/>`}
              </code>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <code className="text-blue-600">
                {`<BannerComponent 
  mode="rectangle" 
  items={[...items]} 
/>`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;