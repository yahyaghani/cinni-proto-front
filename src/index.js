import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SessionProvider } from './context/SessionContext';
import { PinsProvider } from './context/PinsContext'; // Make sure this import is correct

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
    <PinsProvider> {/* Wrap App in PinsProvider as well */}

      <App />
      </PinsProvider>

    </SessionProvider>
  </React.StrictMode>
);
