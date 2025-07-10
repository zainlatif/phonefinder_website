import React, { useState, useRef } from "react";
import axios from "axios";
import "./FloatingChatbot.css";

// Replace with your actual backend URL
const BOT_API_URL = "http://localhost:8000/predict";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me for phone recommendations or specs." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(BOT_API_URL, { query: input });
      const data = res.data;

      let botReply = "";

      if (data.error) {
        botReply = `❌ Error: ${data.error}`;
      } else if (!data.recommendations || data.recommendations.length === 0) {
        botReply = `⚠️ No matching phones found.`;
      } else {
        botReply = `🔍 Category: ${data.category}\n\n📱 Recommended Phones:\n\n`;

        data.recommendations.forEach((phone, idx) => {
          botReply += `${idx + 1}. ${phone.name}\n📸 Camera: ${phone.camera_quality} | 🔋 Battery: ${phone.battery_life} | ⚡ Performance: ${phone.performance} | 💰 Rs. ${phone.price}\n\n`;
        });
      }

      setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Error contacting the model API." }
      ]);
    }

    setLoading(false);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="floating-chatbot-root">
      {open ? (
        <div className="floating-chatbot-window">
          <div className="floating-chatbot-header">
            Phone Finder AI
            <button
              className="floating-chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>
          <div className="floating-chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`floating-chatbot-message ${msg.from}`}
              >
                <span className="floating-chatbot-bubble">
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="floating-chatbot-input-row">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask about phones..."
              className="floating-chatbot-input"
              disabled={loading}
            />
            <button
              className="floating-chatbot-send-btn"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          className="floating-chatbot-btn"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default FloatingChatbot;
