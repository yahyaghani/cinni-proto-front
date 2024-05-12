import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from './components/Header';
import MainBoard from './components/MainBoard';
import ChatUI from './components/ChatUI';
import productsData from './api/products.json';  // Assuming static import of JSON
import ImageUploader from './components/ImageUploader';
import { SessionProvider, useSession } from './context/SessionContext';
import { PinsProvider } from './context/PinsContext';


function App() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionID, setSessionID] = useState(null);

  useEffect(() => {
    const loadedPins = Object.values(productsData).slice(2, 17).map(product => ({
      id: product.skuId,
      image: product.image,
      name: product.name,
      url: product.url
    }));
    console.log("Loaded pins:", loadedPins);  // Check if pins are loaded correctly
    setPins(loadedPins);
  }, []);


const onPinClick = (imageUrl) => {
  fetch('/api/fetch-pins', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: imageUrl, session_id: sessionID })  // Include sessionID in the request
  })
  .then(response => response.json())
  .then(newPinsData => {
      if (newPinsData && newPinsData.urls && newPinsData.urls.length > 0) {
          const newPins = newPinsData.urls.map(url => ({
              id: url,  // Assuming the URLs are unique and can serve as IDs
              image: url,
              name: 'Updated Pin',
              url: url
          }));
          updatePinsWithNewData(newPins);
      } else {
          console.log('No new pins or invalid data received');
      }
  })
  .catch(error => {
      console.error('Error fetching new pins:', error);
  });
};

const updatePinsWithNewData = (newPins) => {
  setPins(prevPins => {
      // Assuming you want to replace the last N entries with new pins
      let updatedPins = [...prevPins];
      updatedPins.splice(-newPins.length, newPins.length, ...newPins);
      return updatedPins;
  });
};

  const getImages = (term) => {
    return fetch(`/get-images?query=${encodeURIComponent(term)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.results) {
        return data.results;  // Only return results if it exists
      } else {
        return [];  // Return an empty array to handle cases where no results are returned
      }
    })
    .catch(error => console.error('Error fetching images:', error));
  }
      
const onSearchSubmit = (term) => {
  getImages(term)
  .then(data => { // Adjusted to directly use returned data assuming it's already in the correct format
    let newPins = [
      ...data, // Assuming data is the array of new pins
      ...pins
    ]

    newPins.sort(function(a, b) {
      return 0.5 - Math.random();
    })

    setPins(newPins);
  })
}

const getNewPins = () => {
  let promises = [];
  let pinData = [];

  let pins = ['ocean', 'Tokyo', 'dogs', 'cats', 'Bali'];

  pins.forEach((pinTerm) => {
    promises.push(
      getImages(pinTerm).then(results => {
        pinData = pinData.concat(results);
        pinData.sort(function(a, b) {
          return 0.5 - Math.random();
        })
      })
    )
  })
  Promise.all(promises).then(() => {
    setPins(pinData);
  })
}

return (
  <SessionProvider>
    <PinsProvider initialPins={pins}>
      <div className="app">
        <Header />
        <div className="app-layout">
          <div className="chat-container">
            <ChatUI />
          </div>
          <div className="board-container">
            <MainBoard onPinClick={onPinClick}/>
          </div>
        </div>
      </div>
    </PinsProvider>
  </SessionProvider>
);
}

export default App;
