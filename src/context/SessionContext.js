import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [sessionID, setSessionID] = useState(null);

    const updateSessionID = (id) => {
        setSessionID(id);
    };

    return (
        <SessionContext.Provider value={{ sessionID, setSessionID, updateSessionID }}>
            {children}
        </SessionContext.Provider>
    );
};
