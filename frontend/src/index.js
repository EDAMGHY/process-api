import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { AuthProvider } from './actions/auth';
import { ProcessProvider } from './actions/process';
import { ProcessStepProvider } from './actions/processStep';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ProcessProvider>
      <ProcessStepProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProcessStepProvider>
    </ProcessProvider>
  </AuthProvider>
);
