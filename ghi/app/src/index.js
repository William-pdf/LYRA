import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function loadLyraViews() {

  root.render(
    <React.StrictMode>
      <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
      <App/>
    </React.StrictMode>
  );
}
loadLyraViews();
reportWebVitals();
