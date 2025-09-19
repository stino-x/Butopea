import React from 'react';
import { Home, Square, ChevronRight, Image, MousePointer } from 'lucide-react';

/**
 * Props for the Navigation component
 * @interface NavigationProps
 * @property {string} currentPage - The ID of the currently active page
 * @property {(page: string) => void} onNavigate - Callback function triggered when a navigation item is clicked
 */
interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

/**
 * Navigation Component
 * 
 * A responsive navigation bar with icons and labels that highlights the currently
 * active page and provides click handlers for navigation between different views.
 * 
 * @component
 * @example
 * <Navigation 
 *   currentPage="home"
 *   onNavigate={(page) => console.log(`Navigating to ${page}`)}
 * />
 * 
 * @param {NavigationProps} props - The component props
 * @returns {React.ReactElement} The rendered Navigation component
 * 
 * @features
 * - Responsive design that works on all screen sizes
 * - Visual indication of the current active page
 * - Accessible keyboard navigation
 * - Customizable icons and labels
 */
const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  // Navigation items configuration
  // Each item represents a navigation button with an icon and label
  const pages = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'square-basic', label: 'Square Basic', icon: Square },
    { id: 'square-carousel', label: 'Square Carousel', icon: ChevronRight },
    { id: 'rectangle', label: 'Rectangle', icon: Square },
    { id: 'image-only', label: 'Image Only', icon: Image },
    { id: 'single-cta', label: 'Single CTA', icon: MousePointer }
  ];

  return (
    // Navigation container with styling for positioning and appearance
    <nav className="bg-white border-t border-gray-200 mt-12 pt-6">
      {/* Responsive container for navigation items */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pages.map((page) => {
          // Store the icon component in a variable to use it as a component
          const IconComponent = page.icon;
          
          // Determine if the current page is active for conditional styling
          const isActive = currentPage === page.id;
          
          return (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500 text-white' // Active state styles
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700' // Default and hover state styles
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Navigate to ${page.label}`}
            >
              {/* Render the icon component */}
              <IconComponent size={16} aria-hidden="true" />
              {/* Navigation item label */}
              <span className="text-sm font-medium">{page.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
