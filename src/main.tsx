import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;
const path = window.location.pathname.replace(/\/$/, '');
const page = path === '/recruiting-film' ? 'film' : path === '/privacy' ? 'privacy' : 'profile';
const application = (
  <React.StrictMode>
    <App page={page} />
  </React.StrictMode>
);
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, application);
else ReactDOM.createRoot(root).render(application);
