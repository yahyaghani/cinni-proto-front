import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { useSession } from '../context/SessionContext';
import '../styles.css';
import '../style/Chatstyles.css';
import { usePins } from '../context/PinsContext'; // Import usePins hook
import productsData from '../api/products.json';

const ChatUI = () => {
    const initialMessage = {
        id: 0,
        nickName: 'System',
        message: "Hey what's the special occasion we are looking to dress for...",
        type: 'system'
    };

    const initialPlaceholders = [
        'I am planning for my sister\'s wedding party.',
        'My niece has a birthday party.',
        'Show me something for my office party.'
    ];

    const [messages, setMessages] = useState([initialMessage]);
    const { sessionID, updateSessionID } = useSession();
    const socketRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [placeholders, setPlaceholders] = useState(initialPlaceholders);
    const { setPins, setIsRotating } = usePins(); // Use setIsRotating from context

    const sendMessage = (text) => {
        if (text.trim() && sessionID) {
            socketRef.current.emit('chat-query', { session_id: sessionID, message: text });
            setMessages(prev => [...prev, { id: prev.length + 1, nickName: 'Me', message: text, type: 'me' }]);
        }
    };

    const handlePlaceholderClick = placeholder => {
        setInputValue(placeholder);
    };

    const getAnimationName = () => {
        const animations = ['float1', 'float2', 'float3'];
        return animations[Math.floor(Math.random() * animations.length)];
    };

    useEffect(() => {
        // socketRef.current = socketIOClient('http://localhost:5000', { transports: ['websocket'] });
        // cloud version // 
        socketRef.current = socketIOClient('https://cinni.yahyaghani.com', { path: '/socket.io/' });

        socketRef.current.on('connect', () => {
            console.log('WebSocket connected');
        });

        socketRef.current.on('session_id', (data) => {
            updateSessionID(data.session_id);
        });

        socketRef.current.on('chat-response', (data) => {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                nickName: 'System',
                message: data.message,
                type: 'system'
            }]);
            if (data.placeholders) {
                setPlaceholders(data.placeholders);
            }
        });
        socketRef.current.on('new-pins', (data) => {
            console.log("Received new pins:", data.pins);
            setPins(prevPins => {
                const detailedPins = data.pins.map(pinId => {
                    const product = productsData[pinId];
                    if (product) {
                        return {
                            ...product,
                            id: pinId,
                            glow: true // Mark new pins with glow
                        };
                    }
                    return null;
                }).filter(product => product && !prevPins.some(p => p.id === product.id));
        
                // Randomize the array of pins
                const shuffledPins = [...detailedPins, ...prevPins].sort(() => 0.5 - Math.random());
        
                // Slice to keep only the latest 17 pins
                const updatedPins = shuffledPins.slice(0, 17);
                return updatedPins.map(pin => ({
                    ...pin,
                    glow: detailedPins.some(p => p.id === pin.id) // Apply glow only to new pins
                }));
            });
            setIsRotating(false); // Stop rotation
        });
                                        
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [setPins]);


    return (
        <div id="chat" className="--dark-theme">
            <div className="chat__conversation-board">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat__conversation-board__message-container ${msg.type === 'me' ? 'me' : 'other'}`}>
                        <div className={`chat__conversation-board__message__person ${msg.type}`}>
                            {msg.type === 'system' && (
                                <img src="cinni.svg" style={{ width: '35px', height: '35px', borderRadius: '50%' }} alt="System" />
                            )}
                        </div>
                        <div className="chat__conversation-board__message__context">
                            <p className={`chat__conversation-board__message__bubble ${msg.type === 'me' ? 'me' : 'system'}`}>{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            {placeholders.length > 0 && (
                <div className="chat__placeholders">
                    {placeholders.map((placeholder, index) => (
                        <span key={index} className="chat__placeholder-bubble" onClick={() => handlePlaceholderClick(placeholder)}>
                            {placeholder}
                        </span>
                    ))}
                </div>
            )}
            <div className="chat__conversation-panel">
                <input
                    className="chat__conversation-panel__input"
                    placeholder="Ask Cinni AI what to wear tonight..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage(inputValue)}
                />
                <button className="chat__conversation-panel__button" onClick={() => sendMessage(inputValue)}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    );
    
};

export default ChatUI;