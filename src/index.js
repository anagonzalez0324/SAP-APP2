import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.
root.render(<App tab="home" />);  // Initial render
