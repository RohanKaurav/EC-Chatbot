import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import '../index.css'

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const timestamp = new Date().toLocaleString();
  const chatContainerRef = useRef(null); // Ref for chat container

  // Initialize chat with a greeting message
  useEffect(() => {
    setMessages([
      { text: "Hello! How can I assist you today?", type: "bot", timestamp: new Date().toLocaleString() },
      { text: "What product are you looking for?", type: "bot", timestamp: new Date().toLocaleString() }
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const sendMessage = async () => {
    if (!input) return;

     // Generate timestamp for the message

    // Add user message with timestamp to the chat
    const newMessages = [
      ...messages,
      { text: input, type: "user", timestamp }, // Store timestamp with message
    ];
    setMessages(newMessages);

    // Send query to the backend for product search
    try {
      const response = await axios.post("http://localhost:3000/api/chat", {
        query: input,
      });
      setMessages([
        ...newMessages,
        { text: response.data.reply, type: "bot", timestamp: new Date().toLocaleString() }, // Add timestamp to bot message
      ]);
    } catch (err) {
      console.error("Error:", err);
      setMessages([
        ...newMessages,
        { text: "Oops! Something went wrong. Please try again.", type: "bot", timestamp: new Date().toLocaleString() },
      ]);
    }

    // Clear input field after sending the message
    setInput("");
  };
  const resetChat = () => {
    setMessages([]); // Clears all chat messages
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Sales Chatbot</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.type === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <strong>{msg.type === "user" ? "You: " : "Bot: "}</strong>
            {Array.isArray(msg.text)
              ? (msg.text.map((item, idx) => (
                  <p key={idx}>
                    {item.name} - ${item.price} 
                    <br/>
                    <small>{msg.timestamp}</small>
                  </p>
                  
                )) 
                
                )
                
              : (msg.text)}
             
           {/* Display the timestamp */}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about a product..."
      />
      <button id="reqBtn"onClick={sendMessage}>Send</button>
      <button onClick={resetChat} style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}>
        Reset Conversation
      </button>
    </div>
  );
};

export default Chatbot;
