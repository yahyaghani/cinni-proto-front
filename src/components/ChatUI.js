import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { useSession } from '../context/SessionContext'; // Path might vary
import '../styles.css';
import '../style/Chatstyles.css'
const ChatUI = () => {
    const [messages, setMessages] = useState([]);
    const { sessionID, updateSessionID } = useSession(); // Use the context
    const socketRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        socketRef.current = socketIOClient('http://localhost:5000', { transports: ['websocket'] });
    
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
        });
    
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
        // This should be an empty dependency array unless you have specific reasons to reconnect
    }, []);
    
    const sendMessage = (text) => {
        if (text.trim() && sessionID) {
            socketRef.current.emit('chat-query', { session_id: sessionID, message: text });
            setMessages(prev => [...prev, { id: prev.length + 1, nickName: 'Me', message: text, type: 'me' }]);
        }
    };


    return (
        <div id="chat" className="--dark-theme">
            <div className="chat__conversation-board">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat__conversation-board__message-container ${msg.type === 'me' ? 'me' : 'other'}`}
                        style={msg.type === 'me' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }}>
                        <div className={`chat__conversation-board__message__person ${msg.type}`}>
                            {msg.type === 'system' && (
                                <img src="cinni.svg" style={{ width: '35px', height: '35px', borderRadius: '50%' }} alt="System" />
                            )}
                        </div>
                        <div className="chat__conversation-board__message__context">
                            <span className={`chat__conversation-board__message__bubble ${msg.type === 'me' ? 'me' : 'system'}`}>{msg.message}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat__conversation-panel">
                <input
                    className="chat__conversation-panel__input"
                    placeholder="Ask Cinni AI what to wear tonight..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage(inputValue, 'Y')}
                />
                <button className="chat__conversation-panel__button" onClick={() => sendMessage(inputValue, 'Y')}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatUI;
