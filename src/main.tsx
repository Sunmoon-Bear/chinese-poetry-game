import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 添加错误边界
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', { message, source, lineno, colno, error });
}

window.onunhandledrejection = function(event) {
  console.error('Unhandled promise rejection:', event.reason);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);