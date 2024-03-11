import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MainCtxProvider } from './store/ctx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainCtxProvider>
      <App />
    </MainCtxProvider>
  </React.StrictMode>
);
