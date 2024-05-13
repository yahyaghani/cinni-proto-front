import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';
import Header from './components/Header';
import MainBoard from './components/MainBoard';
import ChatUI from './components/ChatUI';
import productsData from './api/products.json'; // Assuming static import of JSON
import ImageUploader from './components/ImageUploader';
import { SessionProvider, useSession } from './context/SessionContext';
import { PinsProvider, usePins } from './context/PinsContext';

function App() {
    const [loading, setLoading] = useState(false);
    const { sessionID } = useSession(); // Use sessionID from context
    const { pins, setPins, setIsRotating } = usePins(); // Use setIsRotating from context

    useEffect(() => {
        console.log("Session ID updated in App.js:", sessionID);
    }, [sessionID]);

    useEffect(() => {
        console.log("Fetching initial pins...");
        const loadedPins = Object.values(productsData).slice(2, 17).map(product => ({
            id: product.skuId,
            image: product.image,
            name: product.name,
            url: product.url
        }));
        console.log("Loaded pins:", loadedPins);
        setPins(loadedPins);
        setIsRotating(true); // Enable rotation initially or when pins are first loaded
    }, []);

    const onPinClick = useCallback((imageUrl) => {
      setLoading(true);
      fetch('/api/fetch-pins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageUrl, session_id: sessionID })
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data && data.productIds && data.productIds.length > 0) {
          const newPins = data.productIds.map(id => {
            const product = productsData[id];
            return {
              ...product,
              id: id,
              glow: true  // Mark new pins with glow
            };
          });
    
          updatePinsWithNewData(newPins.filter(newPin => !pins.some(pin => pin.id === newPin.id)));  // Remove duplicates before adding
          setIsRotating(false);  // Stop rotation when new pins are added
        } else {
          console.log('No new pins or invalid data received');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching new pins:', error);
      });
    }, [sessionID, pins, setIsRotating]);
    
    const updatePinsWithNewData = (newPins) => {
      setPins(prevPins => {
        // Combine new pins with existing ones and filter out duplicates based on ID
        const combinedPins = [...newPins, ...prevPins];
        const uniquePins = combinedPins.reduce((acc, current) => {
          const x = acc.find(item => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        const shuffledPins = uniquePins.sort(() => 0.5 - Math.random());

        // Slice to keep only the latest 15 pins
        const finalPins = shuffledPins.slice(0, 15);
        return finalPins.map(pin => ({
          ...pin,
          glow: newPins.some(p => p.id === pin.id)  // Apply glow only to new pins
        }));
      });
      setIsRotating(false);  // Stop rotation when new pins are added
    };
    
    return (
        <PinsProvider initialPins={pins}>
            <div className="app">
                <Header />
                <div className="app-layout">
                    <div className="chat-container">
                        <ChatUI />
                    </div>
                    <div className="board-container">
                        <MainBoard onPinClick={onPinClick} isLoading={loading}/>
                    </div>
                </div>
            </div>
        </PinsProvider>
    );
}

export default App;
