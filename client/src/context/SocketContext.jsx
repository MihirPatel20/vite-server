import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

// Create a Socket.IO client instance
const socket = io("http://localhost:8000", {
  path: "/myownpath/",
});

// Create a context for Socket.IO connection
const SocketContext = createContext(socket);

// Socket.IO connection component
export const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Clean up the connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketContext;
