# Butopea - Banner Component System

A comprehensive React TypeScript component library for creating responsive banner layouts with multiple display modes and interactive elements.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation & Usage](#installation--usage)
- [File Structure](#file-structure)
- [Components](#components)
- [Architecture & Design](#architecture--design)
- [Technical Implementation](#technical-implementation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

This project implements a comprehensive banner component system for **Butopea** landing pages, built with React, TypeScript, and Tailwind CSS. The system provides flexible, responsive banner layouts with multiple display modes and interactive elements.

## ✨ Features

### Core Display Modes
- **Square Layout**: 1:1 aspect ratio components
- **Rectangle Layout**: Flexible aspect ratios with floating CTAs
- **Responsive Design**: Adapts to all screen sizes
- **Mobile Carousel**: Touch-friendly carousel for mobile devices

### Component Types
- **Image Banners**: Display images with optional links
- **CTA Banners**: Call-to-action buttons with customizable text
- **Stat Banners**: Showcase statistics with icons and labels
- **Testimonial Banners**: Display customer feedback with ratings

### Interactive Features
- Clickable elements with smooth hover effects
- Touch support for mobile devices
- Keyboard navigation
- Screen reader friendly

## 🛠 Installation & Usage

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
```bash

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

### Basic Usage
```tsx
import { BannerComponent } from './components/BannerComponent';
import { demoData } from './data/demoData';

function App() {
  return (
    <div className="container mx-auto p-4">
      <BannerComponent 
        mode="square"
        items={demoData.squareItems}
        carouselOnMobile={true}
      />
    </div>
  );
}
```

## 📁 File Structure

```
src/
├── components/               # Reusable UI components
│   ├── BannerComponent.tsx   # Main banner container
│   ├── MobileCarousel.tsx    # Mobile carousel implementation
│   ├── Navigation.tsx        # Main navigation component
│   ├── RectangleCta.tsx      # Rectangle CTA component
│   ├── SquareImage.tsx       # Square image component
│   ├── Squarecta.tsx         # Square CTA component
│   ├── SquareStat.tsx        # Stat display component
│   └── SquareTestimonial.tsx # Testimonial component
├── data/
│   └── demoData.ts           # Sample data for demos
├── types/
│   └── banner.ts             # TypeScript type definitions
├── utils/
│   └── navigation.ts         # Navigation utilities
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## 🧩 Components

### BannerComponent
Main container component that orchestrates the banner display based on props.

**Props:**
- `mode`: 'square' | 'rectangle' - Layout mode
- `items`: BannerItem[] - Array of banner items to display
- `carouselOnMobile`: boolean - Enable carousel on mobile devices

### MobileCarousel
Touch-enabled carousel for mobile devices.

### Navigation
Responsive navigation component with active state tracking.

### RectangleCta
Call-to-action component for rectangle layouts.

### SquareImage
Image display component for square layouts.

### SquareCta
Call-to-action component for square layouts.

### SquareStat
Component for displaying statistics with icons.

### SquareTestimonial
Component for displaying customer testimonials with ratings.

## 🧠 Architecture & Design

### Component Architecture
- **Modular Design**: Each component has a single responsibility
- **Composition**: Complex UIs built from simple, reusable components
- **Type Safety**: Full TypeScript support with strict typing

### State Management
- Local component state for UI interactions
- Props-based data flow
- Context API for global state (if needed)

### Styling
- Tailwind CSS for utility-first styling
- Responsive design with mobile-first approach
- Custom animations and transitions

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Run type checker
npm run type-check
```

### Testing

```bash
# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- **DRY Principle**: Avoid repeating navigation logic across components
- **Security**: Consistent handling of external links with `noopener,noreferrer`
- **Flexibility**: Easy to modify navigation behavior system-wide
- **Testing**: Isolated navigation logic is easier to unit test

**Key Methods:**

### `handleExternalNavigation(url?: string, fallback: string = '#')`
**Reasoning:**
- **Safety First**: Validates URLs before navigation
- **User Experience**: Opens in new tab to preserve current session
- **Security**: Uses `noopener,noreferrer` to prevent potential security issues
- **Graceful Handling**: Fallback parameter prevents broken functionality

### `isValidUrl(url?: string)`
**Purpose:**
- **Validation**: Prevents navigation to malformed URLs
- **Error Prevention**: Catches URL constructor errors gracefully
- **Type Safety**: Boolean return type integrates well with conditionals

### `createNavigationHandler(url?: string)`
**Design Pattern:**
- **Higher-Order Function**: Returns a function configured for specific URL
- **Event Handler Optimization**: Pre-configured handlers reduce inline function creation
- **Consistency**: Ensures all navigation follows the same pattern

---

## `components/SquareImage.tsx`
**Purpose**: Renders square aspect ratio images with interaction states

**Design Philosophy:**
- **Visual Consistency**: Perfect 1:1 aspect ratio using Tailwind's `aspect-square`
- **Performance**: Lazy loading for better page load times
- **Accessibility**: Keyboard navigation support and proper ARIA attributes
- **User Feedback**: Hover effects provide immediate visual feedback

**Key Implementation Details:**

### Aspect Ratio Preservation
```tsx
className="aspect-square rounded-lg overflow-hidden"
```
**Why this works:**
- `aspect-square`: Forces 1:1 ratio regardless of content
- `overflow-hidden`: Prevents image distortion by cropping instead of stretching
- `object-cover`: Maintains image quality while fitting the container

### Accessibility Features
```tsx
role="button"
tabIndex={0}
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick?.();
  }
}}
```
**Reasoning:**
- **Keyboard Navigation**: Users can navigate without a mouse
- **Screen Reader Support**: `role="button"` announces interactive intent
- **Standard Behavior**: Enter and Space key activation follows web standards

---

## `components/SquareCta.tsx`
**Purpose**: Call-to-action boxes for square mode layouts

**Responsive Strategy:**
- **Desktop**: Square aspect ratio (1:1) for visual consistency
- **Mobile**: Rectangular aspect ratio (3:1) to save vertical space
- **Conditional Styling**: Uses `isMobile` prop to determine layout

### Visual Design Reasoning:

#### Gradient Background
```tsx
className="bg-gradient-to-br from-blue-500 to-purple-600"
```
**Why gradients:**
- **Modern Aesthetic**: Gradients are contemporary and visually appealing
- **Brand Consistency**: Blue-purple gradient can be easily customized for brand colors
- **Depth Perception**: Creates visual hierarchy and draws attention

#### Button Design
```tsx
className="bg-white/20 hover:bg-white hover:text-blue-600"
```
**Design Decision Process:**
- **Subtle Default State**: Semi-transparent white doesn't compete with text
- **Clear Hover State**: Full white background with colored text provides clear feedback
- **Accessibility**: High contrast ratios in both states ensure readability

---

## `components/RectangleCta.tsx`
**Purpose**: Specialized CTA component for rectangle mode banners

**Layout Challenges Solved:**

### Desktop Overlay Positioning
```tsx
className="absolute top-1/2 right-10 -translate-y-1/2"
```
**Why this positioning:**
- **Visual Hierarchy**: Right-aligned placement follows western reading patterns
- **Content Safety**: Positioned away from typical image focal points
- **Responsive**: Percentage-based positioning scales with container size

### Glassmorphism Effect
```tsx
className="bg-white/95 backdrop-blur-sm"
```
**Modern Design Reasoning:**
- **Readability**: Semi-transparent background ensures text is readable over any image
- **Visual Appeal**: Blur effect creates depth and modern aesthetic
- **Context Preservation**: Users can still see the underlying image content

### Event Propagation Handling
```tsx
const handleClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  onClick?.();
};
```
**Critical for UX:**
- **Prevents Double Navigation**: Stops CTA click from triggering parent image click
- **Clear User Intent**: Each clickable area has distinct, predictable behavior
- **Debugging**: Easier to trace click events in development

---

## `components/MobileCarousel.tsx`
**Purpose**: Touch-friendly carousel for mobile devices

**Complex State Management:**

### Slide Navigation Logic
```typescript
const nextSlide = (): void => {
  setCurrentSlide((prev) => (prev + 1) % images.length);
};

const prevSlide = (): void => {
  setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
};
```

**Mathematical Reasoning:**
- **Circular Navigation**: Modulo operator ensures infinite scrolling
- **Bounds Prevention**: `+ images.length` handles negative numbers correctly
- **Immutable Updates**: State setter functions prevent direct state mutation

### Thumbnail Strip Design
```tsx
className="flex gap-2 overflow-x-auto pb-2"
```
**UX Considerations:**
- **Horizontal Scrolling**: Natural mobile interaction pattern
- **Visual Feedback**: Active thumbnail clearly indicated
- **Touch Targets**: 60px minimum size follows mobile usability guidelines

### Progressive Disclosure
```tsx
{images.length > 1 && (
  // Navigation arrows only shown when needed
)}
```
**Why conditional rendering:**
- **Clean Interface**: No unnecessary UI elements
- **Performance**: Avoids rendering unused DOM nodes
- **User Confusion**: Single images don't need navigation controls

---

## `components/BannerComponent.tsx`
**Purpose**: Main orchestrator component that manages different banner modes

**Architecture Pattern: Smart/Dumb Components**

### Smart Component Responsibilities:
- **Data Processing**: Filters and categorizes items by type
- **Layout Decisions**: Chooses appropriate sub-components based on mode
- **State Coordination**: Manages interaction between sub-components
- **Navigation Orchestration**: Centralizes link handling logic

### Type-Safe Item Processing
```typescript
const images = items.filter((item): item is ImageItem => item.type === 'image');
const cta = items.find((item): item is CtaItem => item.type === 'cta');
```

**TypeScript Type Guards:**
- **Runtime Type Safety**: Filters maintain type information
- **Intellisense Support**: IDE knows exact types after filtering
- **Error Prevention**: Impossible to access wrong properties on filtered items

### Responsive Layout Strategy

#### Desktop Layout (Square Mode)
```tsx
<div className="grid grid-cols-3 gap-4">
```
**Design Reasoning:**
- **Visual Balance**: Three columns create pleasing proportions
- **Content Density**: Efficient use of desktop screen real estate
- **Flexibility**: CSS Grid automatically handles different item types

#### Mobile Layout Switching
```tsx
className={`${carouselOnMobile ? 'hidden md:grid' : ''}`}
```
**Conditional Class Strategy:**
- **Clean Separation**: Different layouts for different devices
- **Performance**: Hidden elements don't affect layout calculations
- **Maintenance**: Easy to modify one layout without affecting others

---

## `data/demoData.ts`
**Purpose**: Centralized demo data configurations

**Data Organization Philosophy:**
- **Separation of Concerns**: Data separate from presentation logic
- **Real-World Simulation**: Mimics how data would come from APIs/CMS
- **Testing Scenarios**: Different configurations test various edge cases
- **Documentation**: Data serves as usage examples

### Data Structure Rationale:

#### Mixed Content Types
```typescript
export const squareBasicItems: BannerItem[] = [
  { type: 'image', ... },
  { type: 'cta', ... },
  { type: 'image', ... }
];
```
**Why this order:**
- **Visual Flow**: Image-CTA-Image creates balanced composition
- **Attention Direction**: CTA in center position draws focus
- **Flexibility Demonstration**: Shows components handle any order

#### Carousel Optimization
```typescript
export const carouselItems: BannerItem[] = [
  { type: 'cta', ... },        // First for desktop grid
  ...multipleImages            // Multiple images for carousel demo
];
```
**Strategic Arrangement:**
- **Desktop Experience**: CTA appears first in grid layout
- **Mobile Experience**: CTA appears below carousel
- **Content Hierarchy**: Most important action (CTA) always visible

---

## `App.tsx`
**Purpose**: Application entry point and demo showcase

**Demo Architecture:**
- **Progressive Disclosure**: Features introduced in logical order
- **Visual Hierarchy**: Clear section separation and typography
- **Educational Value**: Each section explains its purpose
- **Responsive Testing**: Layout adapts across all screen sizes

### Section Organization Strategy:

#### 1. Basic Square Mode
**Educational Goal**: Introduce core concepts
- Simple 3-item layout
- Mixed content types
- Basic responsive behavior

#### 2. Carousel Mode  
**Advanced Features**: Show enhanced functionality
- Multiple images
- Touch interactions
- Thumbnail navigation

#### 3. Rectangle Mode
**Alternative Use Case**: Different layout paradigm
- Hero banner style
- Overlay positioning
- Mobile adaptation

## 🎨 Design Patterns Used

### 1. **Composition Pattern**
- Components are built by combining smaller, focused components
- Enables reuse and independent testing of each piece

### 2. **Strategy Pattern**  
- Different rendering strategies based on `mode` prop
- Easy to add new modes without modifying existing code

### 3. **Observer Pattern**
- State changes in carousel trigger UI updates
- Thumbnail selection observes and updates main display

### 4. **Factory Pattern**
- Navigation handler creation based on URL parameters
- Consistent interface with different implementations

### 5. **Conditional Rendering Pattern**
- Different layouts for desktop/mobile
- Progressive disclosure of UI elements

## 🚀 Technical Implementation Highlights

### 1. **Performance Optimizations**
- **Lazy Loading**: Images load only when needed
- **Conditional Rendering**: UI elements only render when necessary
- **Event Handler Optimization**: Pre-configured handlers reduce re-renders

### 2. **Accessibility Features**
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **ARIA Labels**: Screen reader support for complex interactions
- **Focus Management**: Proper focus indicators and trapping

### 3. **Error Handling**
- **URL Validation**: Safe navigation with malformed URLs
- **Graceful Degradation**: Components work even with missing data
- **Type Safety**: Compile-time error prevention

### 4. **Responsive Design**
- **Mobile-First**: Progressive enhancement from mobile base
- **Breakpoint Strategy**: Logical breakpoints based on content, not devices
- **Touch Optimization**: Mobile interactions feel native

## 📦 Installation & Usage

### Prerequisites
```bash
npm install react react-dom typescript tailwindcss lucide-react
```

### Basic Usage
```tsx
import BannerComponent from './components/BannerComponent';

const items = [
  {
    type: 'image',
    aspectRatio: 'square',
    src: 'your-image-url.jpg',
    link: 'https://your-link.com'
  },
  {
    type: 'cta',
    title: 'Your Title',
    button: 'Click Here',
    link: 'https://your-cta-link.com'
  }
];

<BannerComponent 
  mode="square" 
  carouselOnMobile={true}
  items={items} 
/>
```

### Advanced Configuration
```tsx
// Rectangle mode
<BannerComponent 
  mode="rectangle"
  items={[
    { 
      type: 'image', 
      aspectRatio: 'rectangle',
      src: 'hero-image.jpg',
      link: 'https://hero-link.com'
    },
    {
      type: 'cta',
      title: 'Special Offer',
      button: 'Learn More',
      link: 'https://offer-link.com'
    }
  ]} 
/>
```

## 🎯 Best Practices Implemented

### 1. **Component Design**
- Single responsibility for each component
- Props interface clearly defines expectations
- Graceful handling of missing or invalid data

### 2. **State Management**  
- Minimal state scope (carousel state only in carousel component)
- Immutable update patterns
- Predictable state transitions

### 3. **Styling Architecture**
- Utility-first CSS with Tailwind
- Consistent spacing and sizing scales
- Responsive design tokens

### 4. **Code Organization**
- Clear folder structure by concern
- Centralized type definitions
- Reusable utility functions

This implementation represents a production-ready banner component system that balances functionality, performance, accessibility, and maintainability. Each architectural decision was made with scalability and developer experience in mind, resulting in a flexible system that can adapt to various use cases while maintaining consistency and quality.