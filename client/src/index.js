import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from 'App';
import 'styles/reset.css';
import 'styles/variables.css';
import 'styles/font.css';
import 'styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
