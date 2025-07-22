import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';

const engine = new Styletron();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyletronProvider value={engine}>
      <App />
    </StyletronProvider>
  </StrictMode>,
)
