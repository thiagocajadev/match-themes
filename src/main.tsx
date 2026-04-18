import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { LocaleProvider } from './i18n/LocaleContext';
import { App } from './App';
import { TheoryPage } from './pages/TheoryPage';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root missing from index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <LocaleProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/teoria" element={<TheoryPage />} />
        </Routes>
      </HashRouter>
    </LocaleProvider>
  </StrictMode>,
);
