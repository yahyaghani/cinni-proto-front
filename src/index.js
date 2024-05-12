import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SessionProvider } from './context/SessionContext';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider> {/* Ensure SessionProvider is around App */}
      <App />
    </SessionProvider>
  </React.StrictMode>
);
