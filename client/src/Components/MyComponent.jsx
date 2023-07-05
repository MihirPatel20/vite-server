import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './MyComponent.css'

const getCurrentTime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const microseconds = currentTime.getMilliseconds();

  const formattedTime = `${hours}:${minutes}:${seconds}:${microseconds}`;

  return formattedTime;
};

const MyComponent = () => {
  const [pings, setPings] = useState([]);

  useEffect(() => {
    const socket = io("http://127.0.0.1:8000"); // Replace with your server's URL

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("ping", (data) => {
      const currentTime = getCurrentTime();
      const pingWithTime = {
        serverSentTime: data.serverSentTime,
        clientReceiveTime: currentTime,
        text: data.text,
      };
      setPings((prevPings) => [...prevPings, pingWithTime]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setPings([]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container">
      <h1>Server Ping</h1>
      <table>
        <thead>
          <tr>
            <th>Server Sent Time</th>
            <th>Client Receive Time</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {pings.map((item, index) => (
            <tr key={index}>
              <td>{item.serverSentTime}</td>
              <td>{item.clientReceiveTime}</td>
              <td>{item.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComponent;
