/**
 * Application Entry Point
 * 
 * This is the entry point of the React application. It renders the root component
 * into the DOM and sets up any global configurations.
 * 
 * @module main
 * @file This file initializes the React application and renders the root component.
 * 
 * @example
 * // This is automatically called when the application starts
 * // No need to call this manually
 * 
 * @requires react
 * @requires react-dom/client
 * @requires ./App
 * @requires ./index.css
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Create a root element for the React application
const rootElement = document.getElementById('root');

// Verify that the root element exists before rendering
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Create a root and render the application
const root = createRoot(rootElement);

/**
 * Renders the application inside React's StrictMode
 * 
 * StrictMode helps identify potential problems in the application by:
 * - Identifying components with unsafe lifecycles
 * - Warning about legacy string ref API usage
 * - Detecting unexpected side effects
 * - Detecting legacy context API
 * 
 * @see https://reactjs.org/docs/strict-mode.html
 */
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
