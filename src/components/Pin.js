// Pin.js
import React from 'react';

function Pin({ product, onClick, glow, disabled }) { // Added 'disabled' prop here
    return (
      <div className="pin-wrapper" onClick={() => !disabled && onClick(product.image)}>
        <div className={glow ? "pin-container glow" : "pin-container"}>
          <img src={product.image} alt={product.name} />
        </div>
      </div>
    );
}

export default Pin;
