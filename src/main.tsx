import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { register } from 'register-service-worker';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import App from './App.js';
import './index.css';

const engine = new Styletron();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyletronProvider value={engine}>
      <App />
    </StyletronProvider>
  </StrictMode>,
);

register(`/task-manager/service-worker.js`);
