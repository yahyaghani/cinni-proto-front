import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [sessionID, setSessionID] = useState(null);

    console.log("SessionProvider mounted, sessionID:", sessionID);

    const updateSessionID = (id) => {
        console.log("Updating session ID:", id);
        setSessionID(id);
    };

    return (
        <SessionContext.Provider value={{ sessionID, setSessionID, updateSessionID }}>
            {children}
        </SessionContext.Provider>
    );
};
