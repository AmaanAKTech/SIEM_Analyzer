import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
    </AppProvider>
  </React.StrictMode>
);
