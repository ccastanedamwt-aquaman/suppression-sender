import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SuppressionSender from './SuppressionSender';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SuppressionSender />
  </StrictMode>
);
