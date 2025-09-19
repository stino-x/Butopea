import React, { useState } from 'react';
import { Home, Square, ChevronRight, Image, MousePointer } from 'react-feather';
import BannerComponent from './components/BannerComponent';
import { 
  squareBasicItems, 
  carouselItems, 
  rectangleItems,
  imageOnlyItems,
  singleCtaItems
} from './data/demoData';
import Navigation from './components/Navigation';

/**
 * App Component
 * 
 * The main application component that serves as a demo showcase for all banner component variations.
 * Handles routing between different demo pages and renders the appropriate banner configuration.
 * 
 * @component
 * @example
 * // Basic usage in main.tsx:
 * import React from 'react';
 * import ReactDOM from 'react-dom/client';
 * import App from './App';
 * 
 * ReactDOM.createRoot(document.getElementById('root')!).render(
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>
 * );
 * 
 * @returns {React.ReactElement} The root application component
 * 
 * @features
 * - Centralized state management for the current page
 * - Responsive layout with navigation
 * - Demo of different banner configurations
 * - Easy to extend with new demo pages
 */
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  /**
   * Renders the appropriate page content based on the current page state
   * 
   * This function acts as a simple router that returns the appropriate
   * component tree based on the current page state.
   * 
   * @returns {React.ReactNode} The rendered page content
   */
  const renderPage = (): React.ReactNode => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="text-center py-12">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Home size={32} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Banner Component Demo
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our responsive, modular banner components designed for modern web applications. 
                Each component offers unique layouts and functionality for different use cases.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                   onClick={() => setCurrentPage('square-basic')}>
                <Square className="text-blue-600 mb-4 mx-auto" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Square Basic</h3>
                <p className="text-sm text-gray-600">3-column grid layout with perfect 1:1 aspect ratios</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                   onClick={() => setCurrentPage('square-carousel')}>
                <ChevronRight className="text-green-600 mb-4 mx-auto" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Square Carousel</h3>
                <p className="text-sm text-gray-600">Desktop grid with mobile carousel navigation</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                   onClick={() => setCurrentPage('rectangle')}>
                <Square className="text-purple-600 mb-4 mx-auto" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Rectangle Mode</h3>
                <p className="text-sm text-gray-600">Hero banner with floating CTA overlay</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                   onClick={() => setCurrentPage('image-only')}>
                <Image className="text-orange-600 mb-4 mx-auto" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Image Only</h3>
                <p className="text-sm text-gray-600">Gallery-style layout without CTA boxes</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                   onClick={() => setCurrentPage('single-cta')}>
                <MousePointer className="text-red-600 mb-4 mx-auto" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Single CTA</h3>
                <p className="text-sm text-gray-600">Minimal layout with call-to-action focus</p>
              </div>
            </div>
          </div>
        );
      case 'square-basic':
        return (
          <div>
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Square Mode - Basic Layout</h2>
              <p className="text-gray-600">
                3-column grid on desktop, single column on mobile. Perfect 1:1 aspect ratios maintained across all devices.
              </p>
            </header>
            <BannerComponent mode="square" carouselOnMobile={false} items={squareBasicItems} />
          </div>
        );
      case 'square-carousel':
        return (
          <div>
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Square Mode - With Mobile Carousel</h2>
              <p className="text-gray-600">
                Desktop grid layout with swipeable carousel on mobile. Includes thumbnail navigation for easy browsing.
              </p>
            </header>
            <BannerComponent mode="square" carouselOnMobile={true} items={carouselItems} />
          </div>
        );
      case 'rectangle':
        return (
          <div>
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Rectangle Mode</h2>
              <p className="text-gray-600">
                Hero banner with floating CTA overlay on desktop, stacked layout on mobile for optimal readability.
              </p>
            </header>
            <BannerComponent mode="rectangle" items={rectangleItems} />
          </div>
        );
      case 'image-only':
        return (
          <div>
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Image Only Configuration</h2>
              <p className="text-gray-600">
                Gallery-style layout focusing purely on visual content without call-to-action boxes.
              </p>
            </header>
            <BannerComponent mode="square" carouselOnMobile={false} items={imageOnlyItems} />
          </div>
        );
      case 'single-cta':
        return (
          <div>
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Single CTA Configuration</h2>
              <p className="text-gray-600">
                Minimal layout design focusing entirely on a single call-to-action for maximum conversion impact.
              </p>
            </header>
            <BannerComponent mode="square" carouselOnMobile={false} items={singleCtaItems} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {renderPage()}
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <div className="flex space-x-4 text-sm">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Responsive</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Accessible</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Production Ready</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
