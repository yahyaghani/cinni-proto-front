// MainBoard.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Pin from './Pin';
import './MainBoard.css';
import { usePins } from '../context/PinsContext'; // Import the usePins hook
import '../styles.css';

function MainBoard({ onPinClick }) {
  const { pins } = usePins(); // Use pins from context
  const [rotatingPins, setRotatingPins] = useState([]);

  useEffect(() => {
      setRotatingPins(pins);  // Initialize with pins from context
  }, [pins]);  // Update whenever the pins from context change

  useEffect(() => {
    const intervalId = setInterval(() => {
        if (rotatingPins.length > 0) {
            setRotatingPins(prevPins => {
                const [first, ...rest] = prevPins;
                return [...rest, first]; // Move the first pin to the end
            });
        }
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval
  }, [rotatingPins]);

  return (
    <div className="mainboard-wrapper">
      <div className="mainboard-container">
        {rotatingPins.map((pin) => (
          <Pin key={pin.id} product={pin} onClick={onPinClick} glow={pin.glow} />
        ))}
      </div>
    </div>
  );
}
export default MainBoard;
