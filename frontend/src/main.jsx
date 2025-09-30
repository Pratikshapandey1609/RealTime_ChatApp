import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'stream-chat-react/dist/css/v2/index.css';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js';


// ✅ Apply theme globally before React renders
document.documentElement.setAttribute(
  "data-theme",
  localStorage.getItem("speakEasy-theme") || "coffee"
);

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);


