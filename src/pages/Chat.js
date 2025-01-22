import React, { useState, useEffect } from "react";
import "../styles/Chat.css";

const Chat = ({ token, onLogout }) => {
  const [ws, setWs] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load stored messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem("messages"));
    if (storedMessages) {
      setMessages(storedMessages);
    }

    // Create a WebSocket connection
    const socket = new WebSocket("ws://localhost:1337");

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "auth", token }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "connection") {
        setSocketId(data.socketId);
      } 
      else if (data.type === "chat") {
        const userId = localStorage.getItem("userId");

        // Update messages with both user and server message
        setMessages((prevMessages) => {
          const newMessages = [
            ...prevMessages, 
            { 
              userId: userId, 
              message: data.message, 
              server: `Echo: ${data.message}` 
            }
          ];
          // Save updated messages to localStorage
          localStorage.setItem("messages", JSON.stringify(newMessages));
          return newMessages;
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(socket);

    return () => socket.close();
  }, [token]); // Only re-run on token change

  const handleSend = () => {
    if (ws && message.trim()) {
      ws.send(JSON.stringify({ type: "chat", message, token }));
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h2>Chat</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="socket-info">
        <strong>Socket ID:</strong> {socketId || "Connecting..."}
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <>
            <div className="user-message">
              <div className="message-content user">
                <span className="message-text">{msg[localStorage.getItem("userId")]}</span>
              </div>
            </div>
            <div className="server-message">
              <div className="message-content server">
                <span className="message-text">{msg.server}</span>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button className="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
