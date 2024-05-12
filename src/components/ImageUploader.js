import React, { useState, useContext } from 'react';
import { useSession } from '../context/SessionContext';
import { usePins } from '../context/PinsContext';
import '../styles.css';

function ImageUploader() {
  const [image, setImage] = useState(null);
  // const { sessionID } = useContext(SessionContext);  // Access the session ID from context
  const { pins, setPins } = usePins();
  const { sessionID } = useSession();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = () => {
    if (image && sessionID) {  // Check if there's an image and a session ID
      const formData = new FormData();
      formData.append('image', image);
      formData.append('session_id', sessionID);
  
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Upload successful:', data);
        if (data.image_urls && data.image_urls.length > 0) {
          updatePinsWithNewData(data.image_urls);
        }
      })
      .catch(error => console.error('Error uploading image:', error));
    }
  };

  const updatePinsWithNewData = (newImageUrls) => {
    setPins(prevPins => {
      // Create new pin objects from new URLs
      const newPins = newImageUrls.map(url => ({
        id: url,
        image: url,
        name: 'New Pin',
        url: url
      }));
      // Replace the highest pins with new ones
      return [...newPins, ...prevPins.slice(newImageUrls.length)];
    });
  };
  
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default ImageUploader;
