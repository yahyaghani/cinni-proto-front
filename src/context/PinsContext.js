// context/PinsContext.js
import React, { createContext, useContext,useEffect, useState } from 'react';

const PinsContext = createContext();

export const usePins = () => useContext(PinsContext);

export const PinsProvider = ({ children, initialPins }) => {
  const [pins, setPins] = useState([]);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (initialPins) {
      setPins(initialPins);
    }
  }, [initialPins]);  // React to changes in initialPins

  return (
    <PinsContext.Provider value={{ pins, setPins, isRotating, setIsRotating }}>
      {children}
    </PinsContext.Provider>
  );
};
