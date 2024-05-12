import React from 'react';
import styled from 'styled-components';

function Pin({ product, onClick, glow }) {
    // Add a condition to apply a CSS class for glowing
    const pinClass = glow ? "pin-container glow" : "pin-container";
    const handleClick = () => {
      // Call the onClick function if it's provided
      if (onClick) {
        onClick(product.image); // Passing the image URL to the onClick handler
      }
    };
  
    return (
      <div className="pin-wrapper" onClick={() => onClick(product.image)}>
        <div className={pinClass}>
          <img src={product.image} alt={product.name} />

        </div>
      </div>
    );
}

export default Pin;
