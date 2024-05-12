// context/PinsContext.js
import React, { createContext, useContext, useState } from 'react';

const PinsContext = createContext();

export const usePins = () => useContext(PinsContext);

export const PinsProvider = ({ children, initialPins }) => {
  const [pins, setPins] = useState(initialPins || []);

  return (
      <PinsContext.Provider value={{ pins, setPins }}>
          {children}
      </PinsContext.Provider>
  );
};
