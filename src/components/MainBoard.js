// MainBoard.js
import React, { useEffect, useState } from 'react';
import Pin from './Pin';
import './MainBoard.css';
import { usePins } from '../context/PinsContext'; // Import the usePins hook

function MainBoard({ onPinClick, isLoading }) {
    const { pins, isRotating } = usePins(); // Destructure isRotating from context
    const [rotatingPins, setRotatingPins] = useState([]);

    useEffect(() => {
        setRotatingPins(pins.filter(pin => pin));  // Filter out any falsy values
    }, [pins]);

    useEffect(() => {
      let intervalId;
      if (isRotating) {
          intervalId = setInterval(() => {
              setRotatingPins(prevPins => {
                  const [first, ...rest] = prevPins;
                  return [...rest, first]; // Rotate pins
              });
          }, 3000); // Changed to rotate every 3 seconds as per your setup
      }
      return () => clearInterval(intervalId); // Always clear the interval
  }, [isRotating, rotatingPins]); // Depend on isRotating and rotatingPins
  
    return (
        <div className="mainboard-wrapper">
            <div className="mainboard-container">
                {rotatingPins.map((pin, index) => (
                    // Render only if pin is not null or undefined
                    pin ? <Pin key={index} product={pin} onClick={onPinClick} disabled={isLoading} glow={pin.glow} /> : null
                ))}
            </div>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
    );
}

export default MainBoard;
